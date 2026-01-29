
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS_DB } from '../data/mock_users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cbp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role?: UserRole): Promise<boolean> => {
    // Mock login logic with RBAC
    return new Promise((resolve) => {
      setTimeout(() => {
        // 1. Cari user di Mock DB berdasarkan email
        let foundUser = MOCK_USERS_DB.find(u => u.email.toLowerCase() === email.toLowerCase());

        // 2. Jika tidak ketemu (untuk testing bebas), buat mock user on the fly sesuai role yg direquest
        if (!foundUser) {
           // Default fallback logic for demo purposes if email not in mock DB
           if (role === 'CLIENT') {
             foundUser = {
               id: `u_${Date.now()}`,
               name: 'Klien Demo',
               email: email,
               role: 'CLIENT',
               division: null
             };
           } else {
             // Default to Production Staff if logging into admin panel with unknown email
             foundUser = {
               id: `u_${Date.now()}`,
               name: 'Staf Demo',
               email: email,
               role: 'PRODUCTION',
               division: 'CHRISTIAN_LAW_FIRM'
             };
           }
        }
        
        setUser(foundUser);
        localStorage.setItem('cbp_user', JSON.stringify(foundUser));
        resolve(true);
      }, 800); 
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cbp_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
