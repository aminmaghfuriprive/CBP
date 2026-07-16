
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
      
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-hide">
        <p className="px-2 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
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
