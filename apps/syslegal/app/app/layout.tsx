
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Sidebar } from '../../src/components/Sidebar';
import { AppHeader } from '../../src/components/AppHeader';
import { LayoutProvider, useLayout } from '../../src/context/LayoutContext';
import { Loader2 } from 'lucide-react';

// Inner component untuk mengkonsumsi context useLayout
const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarCollapsed } = useLayout();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex transition-colors duration-300">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:mr-20' : 'md:mr-64'
        }`}
      >
        <AppHeader />
        <div id="main-scroll-container" className="flex-1 p-4 md:p-8 overflow-y-auto scroll-smooth">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-cbp-navy dark:text-cbp-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <LayoutProvider>
      <DashboardContent children={children} />
    </LayoutProvider>
  );
}
