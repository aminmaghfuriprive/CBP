"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { PortalLayout } from '../../src/components/PortalLayout';
import { Loader2 } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else if (user?.role !== 'CLIENT') {
        // Redirect Admin/Staff back to syslegal or logout
        // For now just allow, assuming role check logic is handled
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-cbp-navy dark:text-cbp-gold" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <PortalLayout>{children}</PortalLayout>;
}