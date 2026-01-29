
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@cbp/core';
import { LayoutDashboard, Users, FileText, MessageSquare, LogOut, Shield, FolderOpen, CalendarClock, DollarSign, Settings, MapPin } from 'lucide-react';

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
      roles: ['ADMIN', 'FINANCE', 'PRODUCTION', 'IT', 'FIELD_OPS'] 
    },
    { 
      label: 'Manajemen Kasus', 
      path: '/app/cases', 
      icon: FileText, 
      roles: ['ADMIN', 'PRODUCTION'] 
    },
    { 
      label: 'Jadwal & Tugas', 
      path: '/app/schedule', 
      icon: MapPin, 
      roles: ['ADMIN', 'FIELD_OPS', 'PRODUCTION'] 
    },
    { 
      label: 'Booking', 
      path: '/app/bookings', 
      icon: CalendarClock, 
      roles: ['ADMIN', 'PRODUCTION', 'FIELD_OPS'] 
    },
    { 
      label: 'Database Klien', 
      path: '/app/clients', 
      icon: Users, 
      roles: ['ADMIN', 'PRODUCTION', 'FINANCE'] 
    },
    { 
      label: 'Dokumen', 
      path: '/app/documents', 
      icon: FolderOpen, 
      roles: ['ADMIN', 'PRODUCTION'] 
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
  ];

  // Filter menu items based on user role
  const allowedItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-screen fixed right-0 top-0 z-40 transition-colors duration-300">
      <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Shield className="h-8 w-8 text-cbp-navy dark:text-cbp-gold mr-3" />
        <div>
          <span className="font-serif font-bold text-xl text-cbp-navy dark:text-white tracking-tight block leading-none">CBP Corp</span>
          <span className="text-[10px] text-cbp-gold font-bold uppercase tracking-widest mt-1 block">Menu Navigasi</span>
        </div>
      </div>
      
      {/* User Info Removed here as requested */}
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Aplikasi</p>
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
