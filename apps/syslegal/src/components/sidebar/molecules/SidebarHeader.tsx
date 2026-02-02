
import React from 'react';
import { User } from '@cbp/core';

interface SidebarHeaderProps {
  user: User | null;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ user }) => {
  return (
    <div className="h-24 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="flex items-center gap-3 w-full">
        <div className="h-10 w-10 rounded-full bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy flex items-center justify-center font-bold text-sm overflow-hidden ring-2 ring-slate-100 dark:ring-slate-700 shadow-sm flex-shrink-0">
           {user?.avatarUrl ? (
             <img src={user.avatarUrl} alt="User" className="h-full w-full object-cover" />
           ) : (
             user?.name.charAt(0) || 'U'
           )}
        </div>
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest truncate">
            {user?.role.replace('_', ' ')}
          </p>
        </div>
      </div>
    </div>
  );
};
