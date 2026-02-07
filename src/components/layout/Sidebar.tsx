import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Wallet, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  User
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebarState } from '@/context/SidebarContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/dashboard' },
  { icon: BookOpen, labelKey: 'nav.accounting', path: '/accounting' },
  { icon: FileText, labelKey: 'nav.invoices', path: '/invoices' },
  { icon: Wallet, labelKey: 'nav.budgets', path: '/budgets' },
  { icon: BarChart3, labelKey: 'nav.reports', path: '/reports' },
  { icon: User, labelKey: 'settings.profile', path: '/profile' },
  { icon: Settings, labelKey: 'nav.settings', path: '/settings' },
];

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const { theme, toggleTheme } = useTheme();
  const { t, isRTL } = useLanguage();
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "fixed top-0 h-screen bg-sidebar z-50 flex flex-col border-sidebar-border",
        isRTL ? "right-0 border-l" : "left-0 border-r"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <motion.div
          initial={false}
          animate={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? 0 : 'auto' }}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img src="/finance-horizon-logo.png" alt="FH" className="w-full h-full object-cover" />
          </div>
          <div className="whitespace-nowrap">
            <h1 className="font-bold text-sidebar-foreground">Finance</h1>
            <p className="text-xs text-sidebar-foreground/60">ERP Module</p>
          </div>
        </motion.div>
        
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 flex items-center justify-center text-sidebar-foreground transition-colors"
        >
          {isCollapsed ? (isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />) : (isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />)}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={22} />
                  </motion.div>
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isCollapsed ? 0 : 1,
                      width: isCollapsed ? 0 : 'auto'
                    }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    {t(item.labelKey)}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={cn(
                        "absolute w-2 h-2 rounded-full bg-sidebar-primary-foreground",
                        isRTL ? "left-2" : "right-2"
                      )}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </motion.div>
          <motion.span
            initial={false}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : 'auto'
            }}
            className="font-medium whitespace-nowrap overflow-hidden"
          >
            {theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          </motion.span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={22} />
          </motion.div>
          <motion.span
            initial={false}
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : 'auto'
            }}
            className="font-medium whitespace-nowrap overflow-hidden"
          >
            {t('nav.logout')}
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
