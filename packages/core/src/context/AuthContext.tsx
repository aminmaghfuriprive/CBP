"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => Promise<boolean>;
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

  const login = async (email: string, role: UserRole): Promise<boolean> => {
    // Mock login logic - in real app, this hits an API
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: role === 'ADMIN' ? 'u_admin' : 'u_client',
          name: role === 'ADMIN' ? 'Chandra B. Prakoso' : 'Budi Santoso',
          email: email,
          role: role,
          avatarUrl: role === 'ADMIN' 
            ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
            : undefined
        };
        
        setUser(mockUser);
        localStorage.setItem('cbp_user', JSON.stringify(mockUser));
        resolve(true);
      }, 800); // Simulate network delay
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