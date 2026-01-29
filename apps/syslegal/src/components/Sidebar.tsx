
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@cbp/core';
import { LayoutDashboard, Users, FileText, MessageSquare, LogOut, Shield, FolderOpen, Calendar, CalendarClock, DollarSign, Settings } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[]; // Siapa saja yang boleh lihat menu ini
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
      roles: ['SUPER_ADMIN', 'FINANCE', 'LEGAL_STAFF', 'IT_ADMIN'] 
    },
    { 
      label: 'Manajemen Kasus', 
      path: '/app/cases', 
      icon: FileText, 
      roles: ['SUPER_ADMIN', 'LEGAL_STAFF'] 
    },
    { 
      label: 'Booking & Jadwal', 
      path: '/app/bookings', 
      icon: CalendarClock, 
      roles: ['SUPER_ADMIN', 'LEGAL_STAFF', 'IT_ADMIN'] 
    },
    { 
      label: 'Database Klien', 
      path: '/app/clients', 
      icon: Users, 
      roles: ['SUPER_ADMIN', 'LEGAL_STAFF', 'FINANCE'] 
    },
    { 
      label: 'Dokumen', 
      path: '/app/documents', 
      icon: FolderOpen, 
      roles: ['SUPER_ADMIN', 'LEGAL_STAFF'] 
    },
    { 
      label: 'Keuangan', 
      path: '/app/finance', 
      icon: DollarSign, 
      roles: ['SUPER_ADMIN', 'FINANCE'] 
    },
    { 
      label: 'Konten Website', 
      path: '/app/cms', // Placeholder for CMS
      icon: Settings, 
      roles: ['SUPER_ADMIN', 'IT_ADMIN'] 
    },
    { 
      label: 'Asisten AI', 
      path: '/app/assistant', 
      icon: MessageSquare, 
      roles: ['SUPER_ADMIN', 'LEGAL_STAFF'] 
    },
  ];

  // Filter menu items based on user role
  const allowedItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen fixed left-0 top-0 z-40 transition-colors duration-300">
      <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Shield className="h-8 w-8 text-cbp-navy dark:text-cbp-gold mr-3" />
        <div>
          <span className="font-serif font-bold text-xl text-cbp-navy dark:text-white tracking-tight block leading-none">CBP Corp</span>
          <span className="text-[10px] text-cbp-gold font-bold uppercase tracking-widest mt-1 block">SysLegal Unit</span>
        </div>
      </div>
      
      <div className="px-6 py-8 border-b border-slate-50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-sm overflow-hidden ring-2 ring-white dark:ring-slate-700 shadow-sm">
             {user?.avatarUrl ? (
               <img src={user.avatarUrl} alt="User" className="h-full w-full object-cover" />
             ) : (
               user?.name.charAt(0) || 'U'
             )}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate">{user?.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-500 truncate font-mono">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Menu Akses</p>
        {allowedItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
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
