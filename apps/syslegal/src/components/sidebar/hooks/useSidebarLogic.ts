
"use client";

import { useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { MENU_ITEMS } from '../data/menu.config';

export const useSidebarLogic = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  // 1. Filter Menu berdasarkan Role & Hitung Active State
  const navigationItems = useMemo(() => {
    if (!user) return [];

    return MENU_ITEMS
      .filter(item => item.roles.includes(user.role))
      .map(item => {
        let isActive = false;
        
        // Strict check untuk Dashboard root
        if (item.path === '/app') {
           isActive = pathname === '/app';
        } else {
           // Loose check untuk sub-routes
           isActive = pathname.startsWith(item.path) || 
                      (item.matchPaths?.some(p => pathname.startsWith(p)) ?? false);
        }

        return { ...item, isActive };
      });
  }, [user, pathname]);

  // 2. Handle Logout
  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  return {
    user,
    navigationItems,
    handleLogout
  };
};
