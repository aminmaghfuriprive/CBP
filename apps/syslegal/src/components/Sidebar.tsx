
"use client";

import React from 'react';
import { useSidebarLogic } from './sidebar/hooks/useSidebarLogic';
import { SidebarHeader } from './sidebar/molecules/SidebarHeader';
import { SidebarFooter } from './sidebar/molecules/SidebarFooter';
import { SidebarItem } from './sidebar/atoms/SidebarItem';

export const Sidebar: React.FC = () => {
  const { user, navigationItems, handleLogout } = useSidebarLogic();

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-screen fixed right-0 top-0 z-40 transition-colors duration-300">
      
      <SidebarHeader user={user} />
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
          Menu Utama
        </p>
        {navigationItems.map((item) => (
          <SidebarItem 
            key={item.path}
            {...item} 
          />
        ))}
      </div>

      <SidebarFooter onLogout={handleLogout} />
      
    </div>
  );
};
