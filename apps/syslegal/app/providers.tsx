
"use client";

import React from 'react';
import { AuthProvider, ThemeProvider, NotificationProvider, DataProvider } from '@cbp/core';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
