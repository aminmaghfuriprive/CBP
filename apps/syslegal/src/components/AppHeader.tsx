
"use client";

import React, { useState } from 'react';
import { useAuth, useNotifications } from '@cbp/core';
import { ThemeToggle } from '@cbp/ui';
import { Bell, Search, Shield } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { user } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center gap-4 w-1/2">
        {/* Brand Logo added here */}
        <div className="hidden md:flex items-center gap-1.5">
           <Shield className="h-5 w-5 text-cbp-navy dark:text-cbp-gold" />
           <div>
              <span className="font-serif font-bold text-base leading-none text-cbp-navy dark:text-white block">CBP Corp</span>
              <span className="text-[8px] font-bold text-cbp-gold uppercase tracking-widest block">Internal System</span>
           </div>
        </div>
        
        <div className="relative w-full max-w-xs hidden md:block">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Pencarian..." 
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-transparent dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-navy/10 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy/20 dark:focus:border-cbp-gold/30 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <div className="relative">
          <button 
            onClick={() => { setShowNotifs(!showNotifs); if(!showNotifs) markAllAsRead(); }}
            className={`relative p-1.5 transition-colors rounded-full outline-none ${
              showNotifs 
                ? 'bg-cbp-navy/10 text-cbp-navy dark:bg-slate-800 dark:text-white' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full ring-1.5 ring-white dark:ring-slate-900 animate-pulse"></span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-lg shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Notifikasi</h4>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-600">{notifications.length} Baru</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-2.5 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group ${!n.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                      <div className="flex justify-between items-start mb-0.5">
                        <p className={`text-xs font-semibold group-hover:text-cbp-navy dark:group-hover:text-cbp-gold transition-colors ${n.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {n.title}
                        </p>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 whitespace-nowrap ml-1.5">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="h-6 w-6 text-slate-300 dark:text-slate-600 mx-auto mb-1.5" />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tidak ada notifikasi baru.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
