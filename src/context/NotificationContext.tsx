import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type NotificationType = 'budget_warning' | 'budget_exceeded' | 'payment_due' | 'payment_received' | 'invoice_overdue' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Initial mock notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'budget_exceeded',
    title: 'Budget Exceeded',
    message: 'Operations budget has exceeded the allocated amount by $15,000',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    read: false,
    priority: 'high',
    link: '/budgets',
  },
  {
    id: '2',
    type: 'budget_warning',
    title: 'Budget Warning',
    message: 'Technology budget is at 95% utilization. Only $8,000 remaining.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
    priority: 'medium',
    link: '/budgets',
  },
  {
    id: '3',
    type: 'invoice_overdue',
    title: 'Invoice Overdue',
    message: 'Invoice INV-2024-005 from Metro Supplies is 29 days overdue',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
    priority: 'high',
    link: '/invoices',
  },
  {
    id: '4',
    type: 'payment_due',
    title: 'Payment Reminder',
    message: 'Invoice INV-2024-003 to Global Enterprises is due in 3 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    priority: 'medium',
    link: '/invoices',
  },
  {
    id: '5',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Received $45,000 from Acme Corporation',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    priority: 'low',
    link: '/invoices',
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Show toast for new notifications
      const toastType = notification.priority === 'high' ? 'error' : 
                        notification.priority === 'medium' ? 'warning' : 'success';
      
      if (toastType === 'error') {
        toast.error(notification.title, { description: notification.message });
      } else if (toastType === 'warning') {
        toast.warning(notification.title, { description: notification.message });
      } else {
        toast.success(notification.title, { description: notification.message });
      }
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      
      // 10% chance of new notification every 30 seconds
      if (random < 0.1) {
        const notificationTypes: Array<Omit<Notification, 'id' | 'timestamp' | 'read'>> = [
          {
            type: 'budget_warning',
            title: 'Budget Alert',
            message: 'Facilities budget is approaching its limit (90% used)',
            priority: 'medium',
            link: '/budgets',
          },
          {
            type: 'payment_received',
            title: 'Payment Received',
            message: 'Received $28,500 from Tech Solutions Ltd',
            priority: 'low',
            link: '/invoices',
          },
          {
            type: 'payment_due',
            title: 'Payment Reminder',
            message: 'Quarterly tax payment due in 5 days',
            priority: 'medium',
            link: '/accounting',
          },
        ];

        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        addNotification(randomNotification);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
