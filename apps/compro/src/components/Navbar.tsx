"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, CalendarClock, User, LogIn } from 'lucide-react';
import { Button, ThemeToggle } from '@cbp/ui';
import { useAuth } from '@cbp/core';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Gunakan Environment Variable untuk URL Dashboard di Production
  // Default ke localhost jika env var tidak ada (untuk local dev)
  const APP_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001"; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Wawasan', path: '/insights' },
    { name: 'Kontak', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cbp-navy/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-white/5 dark:border-slate-800' 
        : 'bg-cbp-navy dark:bg-slate-950 border-b border-white/5 dark:border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className="h-8 w-8 text-cbp-gold group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wide text-white">CBP Corp</span>
            </div>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path) 
                      ? 'text-cbp-gold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-slate-700 mx-2"></div>
              
              <ThemeToggle className="!bg-white/10 !text-slate-300 hover:!bg-white/20 hover:!text-white" />

              <Link href="/book">
                <Button variant="secondary" size="sm" className="gap-2 shadow-lg shadow-cbp-gold/20">
                  <CalendarClock className="h-4 w-4" /> Buat Janji
                </Button>
              </Link>
              
              {isAuthenticated ? (
                 <a href={`${APP_URL}/app`}>
                   <Button variant="outline" size="sm" className="text-white border-slate-600 hover:bg-slate-800/50 hover:border-slate-400">
                     <User className="h-4 w-4 mr-2" />
                     Dashboard
                   </Button>
                 </a>
              ) : (
                <a href={`${APP_URL}/login`}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-slate-600 text-slate-300 hover:border-cbp-gold hover:text-cbp-gold hover:bg-transparent transition-all duration-300 group"
                  >
                    <LogIn className="h-4 w-4 mr-2 group-hover:text-cbp-gold" />
                    Client Portal
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden items-center gap-4">
             <ThemeToggle className="!bg-white/10 !text-slate-300" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-cbp-navy dark:bg-slate-950 border-t border-slate-800 animate-in slide-in-from-top-5">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-medium ${
                   isActive(link.path) ? 'bg-white/10 text-cbp-gold' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
              <Link href="/book" onClick={() => setIsOpen(false)} className="block">
                <Button variant="secondary" className="w-full justify-center">Buat Janji Temu</Button>
              </Link>
              <a href={isAuthenticated ? `${APP_URL}/app` : `${APP_URL}/login`} className="block">
                <Button variant="outline" className="w-full justify-center border-slate-600 text-slate-300 hover:text-white hover:border-white">
                  {isAuthenticated ? 'Masuk Dashboard' : 'Login Klien'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};