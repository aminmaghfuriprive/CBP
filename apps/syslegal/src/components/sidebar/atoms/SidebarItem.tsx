
import React from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ElementType;
  isActive: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ 
  label, 
  path, 
  icon: Icon, 
  isActive 
}) => {
  return (
    <Link
      href={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
        isActive 
          ? 'bg-cbp-navy text-white dark:bg-cbp-gold/10 dark:text-cbp-gold shadow-md dark:shadow-none' 
          : 'text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
      }`}
    >
      <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-cbp-gold dark:text-cbp-gold' : 'text-slate-400 dark:text-slate-500 group-hover:text-cbp-navy dark:group-hover:text-slate-300'}`} />
      {label}
    </Link>
  );
};
