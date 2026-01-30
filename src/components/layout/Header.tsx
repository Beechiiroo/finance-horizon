import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';
import { useSidebarState } from '@/context/SidebarContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { isCollapsed } = useSidebarState();

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
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
          </motion.button>

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
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Finance Manager</p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
