
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
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center gap-6 w-1/2">
        {/* Brand Logo added here for balance since sidebar is on the right */}
        <div className="hidden md:flex items-center gap-2">
           <Shield className="h-6 w-6 text-cbp-navy dark:text-cbp-gold" />
           <div>
              <span className="font-serif font-bold text-lg leading-none text-cbp-navy dark:text-white block">CBP Corp</span>
              <span className="text-[9px] font-bold text-cbp-gold uppercase tracking-widest block">Internal System</span>
           </div>
        </div>
        
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Pencarian global..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-transparent dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-navy/10 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy/20 dark:focus:border-cbp-gold/30 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <ThemeToggle />

        <div className="relative">
          <button 
            onClick={() => { setShowNotifs(!showNotifs); if(!showNotifs) markAllAsRead(); }}
            className={`relative p-2 transition-colors rounded-full outline-none ${
              showNotifs 
                ? 'bg-cbp-navy/10 text-cbp-navy dark:bg-slate-800 dark:text-white' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi</h4>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600">{notifications.length} Baru</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group ${!n.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-sm font-semibold group-hover:text-cbp-navy dark:group-hover:text-cbp-gold transition-colors ${n.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Bell className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada notifikasi baru.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {user?.role && user.role !== 'CLIENT' ? 'Internal Staff' : 'Client'}
            </p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-white dark:ring-slate-700 shadow-sm">
             {user?.avatarUrl ? (
               <img src={user.avatarUrl} alt="User" className="h-full w-full object-cover" />
             ) : (
               <div className="h-full w-full flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs">
                 {user?.name.charAt(0) || 'U'}
               </div>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};
