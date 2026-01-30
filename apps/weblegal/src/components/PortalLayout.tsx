"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { LayoutDashboard, FileText, PlusCircle, CreditCard, LogOut, Shield, User } from 'lucide-react';

export const PortalLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
    { label: 'Buat Permintaan', path: '/portal/new-request', icon: PlusCircle },
    { label: 'Kasus Saya', path: '/portal/cases', icon: FileText },
    { label: 'Tagihan', path: '/portal/billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar Client */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed h-full z-30">
        <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cbp-navy dark:text-cbp-gold" />
            <div>
              <span className="block font-serif font-bold text-lg leading-none text-cbp-navy dark:text-white">CBP Corp</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Client Portal</span>
            </div>
          </Link>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6">
            <div className="h-10 w-10 rounded-full bg-cbp-gold text-white flex items-center justify-center font-bold">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
               <p className="text-sm font-bold text-cbp-navy dark:text-white truncate">{user?.name}</p>
               <p className="text-xs text-slate-500">Client Account</p>
            </div>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-cbp-navy text-white shadow-lg shadow-cbp-navy/20 dark:bg-cbp-gold dark:text-cbp-navy' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-8">
        {children}
      </div>
    </div>
  );
};