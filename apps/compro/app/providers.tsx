"use client";

import React from 'react';
import { AuthProvider, ThemeProvider } from '@cbp/core';

export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}