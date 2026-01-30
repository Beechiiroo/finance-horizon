import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSidebarState } from '@/context/SidebarContext';
import { useLanguage } from '@/context/LanguageContext';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const { isCollapsed } = useSidebarState();
  const { isRTL } = useLanguage();

  const marginStyle = isRTL 
    ? { marginRight: isCollapsed ? 80 : 280 }
    : { marginLeft: isCollapsed ? 80 : 280 };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Sidebar />
      <Header title={title} subtitle={subtitle} />
      <motion.main
        initial={false}
        animate={marginStyle}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  );
}
