"use client";

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@cbp/core';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cbp-gold ${
        theme === 'dark' 
          ? 'bg-slate-800 text-cbp-gold hover:bg-slate-700' 
          : 'bg-slate-100 text-slate-500 hover:text-cbp-navy hover:bg-slate-200'
      } ${className}`}
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};