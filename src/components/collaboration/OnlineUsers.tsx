import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Circle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface OnlineUser {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  current_page: string | null;
  is_online: boolean;
}

export function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;

    // Subscribe to realtime presence
    const channel = supabase
      .channel('online_users')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_presence',
        },
        () => {
          fetchOnlineUsers();
        }
      )
      .subscribe();

    // Update own presence
    updatePresence();
    fetchOnlineUsers();

    // Update presence periodically
    const interval = setInterval(updatePresence, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [user, location.pathname]);

  const fetchOnlineUsers = async () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    const { data } = await supabase
      .from('user_presence')
      .select('*')
      .gte('last_seen', fiveMinutesAgo)
      .eq('is_online', true);

    if (data) {
      setOnlineUsers(data.filter(u => u.user_id !== user?.id));
    }
  };

  const updatePresence = async () => {
    if (!user) return;

    const { data: existing } = await supabase
      .from('user_presence')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('user_presence')
        .update({
          current_page: location.pathname,
          last_seen: new Date().toISOString(),
          is_online: true,
        })
        .eq('user_id', user.id);
    } else {
      await supabase.from('user_presence').insert({
        user_id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
        current_page: location.pathname,
        is_online: true,
      });
    }
  };

  const getPageName = (path: string) => {
    const pageNames: Record<string, string> = {
      '/': 'Dashboard',
      '/accounting': 'Accounting',
      '/invoices': 'Invoices',
      '/budgets': 'Budgets',
      '/reports': 'Reports',
      '/settings': 'Settings',
    };
    return pageNames[path] || path;
  };

  if (!user) return null;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
      >
        <Users className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{onlineUsers.length + 1}</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={cn(
                "absolute top-full mt-2 z-50 bg-popover border border-border rounded-xl shadow-xl overflow-hidden min-w-[280px]",
                isRTL ? "left-0" : "right-0"
              )}
            >
              <div className="p-3 border-b border-border bg-muted/50">
                <h4 className="font-semibold text-sm">{t('collab.online')}</h4>
              </div>
              
              <div className="p-2 max-h-[300px] overflow-y-auto">
                {/* Current user */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/10">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {user.email?.[0].toUpperCase()}
                      </span>
                    </div>
                    <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-success fill-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">You</p>
                    <p className="text-xs text-muted-foreground">
                      {t('collab.viewing')} {getPageName(location.pathname)}
                    </p>
                  </div>
                </div>

                {/* Other online users */}
                {onlineUsers.map((onlineUser) => (
                  <motion.div
                    key={onlineUser.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {onlineUser.full_name?.[0]?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-success fill-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{onlineUser.full_name || 'Anonymous'}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('collab.viewing')} {getPageName(onlineUser.current_page || '/')}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {onlineUsers.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No other users online
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
