
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@cbp/core';
import { LayoutDashboard, Users, MessageSquare, LogOut, DollarSign, Settings, Calendar, Sliders, Briefcase } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  matchPaths?: string[]; // Tambahan untuk menghandle highlight sub-pages (cases/documents)
  icon: React.ElementType;
  roles: UserRole[]; 
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems: MenuItem[] = [
    { 
      label: 'Dashboard', 
      path: '/app', 
      icon: LayoutDashboard, 
      roles: ['ADMIN', 'FINANCE', 'PRODUCTION', 'IT', 'FIELD_OPS'] 
    },
    { 
      label: 'Agenda', 
      path: '/app/agenda', 
      icon: Calendar, 
      roles: ['ADMIN', 'PRODUCTION', 'FIELD_OPS'] 
    },
    { 
      label: 'Database Klien', 
      path: '/app/clients',
      matchPaths: ['/app/cases', '/app/documents'], // Highlight menu ini jika user ada di cases atau docs
      icon: Users, 
      roles: ['ADMIN', 'PRODUCTION', 'FINANCE'] 
    },
    { 
      label: 'Layanan', 
      path: '/app/services',
      icon: Briefcase, 
      roles: ['ADMIN', 'FINANCE', 'PRODUCTION'] 
    },
    { 
      label: 'Keuangan', 
      path: '/app/finance', 
      icon: DollarSign, 
      roles: ['ADMIN', 'FINANCE'] 
    },
    { 
      label: 'Konten Website', 
      path: '/app/cms', 
      icon: Settings, 
      roles: ['ADMIN', 'IT'] 
    },
    { 
      label: 'Asisten AI', 
      path: '/app/assistant', 
      icon: MessageSquare, 
      roles: ['ADMIN', 'PRODUCTION', 'IT'] 
    },
    { 
      label: 'Pengaturan', 
      path: '/app/settings', 
      icon: Sliders, 
      roles: ['ADMIN', 'FINANCE', 'PRODUCTION', 'IT', 'FIELD_OPS'] 
    },
  ];

  const allowedItems = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-screen fixed right-0 top-0 z-40 transition-colors duration-300">
      <div className="h-24 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
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
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Aplikasi</p>
        {allowedItems.map((item) => {
          // Logika Active State yang lebih pintar
          const isExactMatch = pathname === item.path;
          const isSubPath = pathname.startsWith(`${item.path}/`);
          const isAlternativeMatch = item.matchPaths?.some(p => pathname.startsWith(p));
          
          const isActive = isExactMatch || isSubPath || isAlternativeMatch;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-cbp-navy text-white dark:bg-cbp-gold/10 dark:text-cbp-gold shadow-md dark:shadow-none' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <item.icon className={`h-4 w-4 transition-colors ${isActive ? 'text-cbp-gold dark:text-cbp-gold' : 'text-slate-400 dark:text-slate-500 group-hover:text-cbp-navy dark:group-hover:text-slate-300'}`} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
};
