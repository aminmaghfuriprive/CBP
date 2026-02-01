
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Notification, UserRole } from '../types';
import { db } from '../db';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'danger', recipientRole?: UserRole, recipientId?: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  lastNotification: Notification | null;
  clearToast: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [lastNotification, setLastNotification] = useState<Notification | null>(null);

  // Query notifikasi yang relevan untuk user saat ini
  const notifications = useLiveQuery(() => {
    if (!user) return [];
    
    return db.notifications
      .filter(n => {
        if (n.recipientId && n.recipientId !== user.id) return false;
        if (n.recipientRole && n.recipientRole !== user.role) return false;
        return true;
      })
      .reverse()
      .sortBy('timestamp');
  }, [user]) || [];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Trigger Toast Effect
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      // Jika notifikasi baru (kurang dari 2 detik lalu) dan belum dibaca
      const isNew = (Date.now() - new Date(latest.timestamp).getTime()) < 2000;
      
      // Mencegah toast muncul berulang saat refresh page
      if (isNew && !latest.read) {
        setLastNotification(latest);
        // Note: Kita menghapus logic setTimeout di sini.
        // Timer sekarang ditangani oleh komponen UI (NotificationToast)
        // agar sinkron dengan animasi progress bar.
      }
    }
  }, [notifications]);

  const addNotification = async (
    title: string, 
    message: string, 
    type: 'info' | 'success' | 'warning' | 'danger' = 'info',
    recipientRole?: UserRole,
    recipientId?: string
  ) => {
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
      recipientRole,
      recipientId
    };
    
    try {
      await db.notifications.add(newNotif);
    } catch (e) {
      console.error("Failed to add notification:", e);
    }
  };

  const markAsRead = async (id: string) => {
    await db.notifications.update(id, { read: true });
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
    await Promise.all(unreadIds.map(id => db.notifications.update(id, { read: true })));
  };

  const clearToast = () => {
    setLastNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      addNotification, 
      markAsRead, 
      markAllAsRead,
      lastNotification,
      clearToast
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
