
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LayoutContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Optional: Persist state to localStorage agar user preference tersimpan
  useEffect(() => {
    const saved = localStorage.getItem('cbp_sidebar_collapsed');
    if (saved) {
      setIsSidebarCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const newState = !prev;
      localStorage.setItem('cbp_sidebar_collapsed', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <LayoutContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayout must be used within LayoutProvider');
  return context;
};
