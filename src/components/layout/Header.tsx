import React from 'react';
import { motion } from 'framer-motion';
import { Search, User } from 'lucide-react';
import { useSidebarState } from '@/context/SidebarContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { LanguageSwitcher } from '@/components/language/LanguageSwitcher';
import { VoiceCommands } from '@/components/voice/VoiceCommands';
import { OnlineUsers } from '@/components/collaboration/OnlineUsers';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { isCollapsed } = useSidebarState();
  const { t, isRTL } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <motion.header
      initial={false}
      animate={{ marginLeft: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              placeholder={t('common.search')}
              className={`w-64 h-10 pr-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
            />
          </div>

          {/* Voice Commands */}
          <VoiceCommands />

          {/* Online Users */}
          <OnlineUsers />

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Notifications */}
          <NotificationCenter />

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
