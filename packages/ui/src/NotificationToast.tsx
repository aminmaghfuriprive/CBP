
"use client";

import React from 'react';
import { useNotifications } from '@cbp/core';
import { Bell, CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { lastNotification } = useNotifications();

  if (!lastNotification) return null;

  const config = {
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
    warning: { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' }
  }[lastNotification.type] || { icon: Bell, color: 'text-slate-500', bg: 'bg-white', border: 'border-slate-200' };

  const Icon = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
      <div className={`
        flex items-start gap-4 p-4 rounded-2xl shadow-2xl border-2 w-80 md:w-96
        ${config.bg} ${config.border} dark:bg-slate-900 dark:border-slate-800
      `}>
        <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm ${config.color}`}>
          <Icon className="h-6 w-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 truncate">
            {lastNotification.title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {lastNotification.message}
          </p>
        </div>

        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          Baru
        </div>
      </div>
    </div>
  );
};
