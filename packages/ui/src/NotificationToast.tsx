
"use client";

import React, { useEffect, useState } from 'react';
import { useNotifications } from '@cbp/core';
import { Bell, CheckCircle, AlertCircle, X, Info, ShieldAlert } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { lastNotification, clearToast } = useNotifications();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  // Sync visibility with context
  useEffect(() => {
    if (lastNotification) {
      setVisible(true);
      setProgress(100);

      // Start progress timer
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 2; // Reduce 2% every 100ms = 5000ms total
        });
      }, 100);

      // Auto dismiss
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(clearToast, 300); // Wait for exit animation
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [lastNotification, clearToast]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(clearToast, 300);
  };

  if (!lastNotification && !visible) return null;

  // Fallback safe access if lastNotification is null during exit animation
  const data = lastNotification || { type: 'info', title: '', message: '' };

  const styles = {
    success: { 
      icon: CheckCircle, 
      iconColor: 'text-green-500', 
      border: 'border-l-4 border-l-green-500', 
      bg: 'bg-white dark:bg-slate-900' 
    },
    warning: { 
      icon: AlertCircle, 
      iconColor: 'text-amber-500', 
      border: 'border-l-4 border-l-amber-500', 
      bg: 'bg-white dark:bg-slate-900' 
    },
    danger: { 
      icon: ShieldAlert, 
      iconColor: 'text-red-500', 
      border: 'border-l-4 border-l-red-500', 
      bg: 'bg-white dark:bg-slate-900' 
    },
    info: { 
      icon: Info, 
      iconColor: 'text-cbp-navy dark:text-cbp-gold', 
      border: 'border-l-4 border-l-cbp-navy dark:border-l-cbp-gold', 
      bg: 'bg-white dark:bg-slate-900' 
    }
  };

  // Safe access for type
  const typeKey = (data.type as keyof typeof styles) || 'info';
  const config = styles[typeKey];
  const Icon = config.icon;

  return (
    <div className={`
      fixed bottom-4 right-4 z-[100] w-72 md:w-80 
      transition-all duration-300 ease-in-out transform
      ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
    `}>
      <div className={`
        relative rounded-md shadow-lg overflow-hidden
        ${config.bg} ${config.border} border-t border-r border-b border-slate-200 dark:border-y dark:border-r dark:border-slate-800
      `}>
        <div className="p-3 flex items-start gap-3">
          <div className={`mt-0.5 ${config.iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate pr-2">
                {data.title}
              </h4>
              <button 
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 -mt-0.5 -mr-1"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
              {data.message}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-slate-100 dark:bg-slate-800 w-full">
          <div 
            className={`h-full transition-all duration-100 ease-linear ${
              data.type === 'success' ? 'bg-green-500' :
              data.type === 'warning' ? 'bg-amber-500' :
              data.type === 'danger' ? 'bg-red-500' :
              'bg-cbp-navy dark:bg-cbp-gold'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
