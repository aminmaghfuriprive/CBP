
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, User } from 'lucide-react';
import { Button, ThemeToggle } from '@cbp/ui';
import { useAuth } from '@cbp/core';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sembunyikan Navbar jika di Portal Klien atau Halaman Auth
  if (pathname && (pathname.startsWith('/portal') || pathname.startsWith('/auth'))) return null;

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Wawasan', path: '/insights' },
    { name: 'Hubungi', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className={`h-8 w-8 transition-colors ${scrolled ? 'text-cbp-navy dark:text-cbp-gold' : 'text-white group-hover:text-cbp-gold'}`} />
            <div>
              <span className={`block font-serif font-bold text-xl leading-none tracking-tight transition-colors ${scrolled ? 'text-cbp-navy dark:text-white' : 'text-white'}`}>CBP Corp</span>
              <span className={`block text-[10px] font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-cbp-gold' : 'text-slate-300'}`}>Legal Firm</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-cbp-gold ${
                  pathname === link.path 
                    ? 'text-cbp-gold font-bold' 
                    : scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className={`h-6 w-px ${scrolled ? 'bg-slate-200 dark:bg-slate-700' : 'bg-white/20'}`}></div>
            
            {/* Theme Toggle: Logic styling manual untuk mengatasi isu kontras */}
            <ThemeToggle 
              className={
                scrolled 
                  ? 'bg-slate-100 text-slate-700 hover:text-cbp-navy hover:bg-slate-200 dark:bg-slate-800 dark:text-cbp-gold' 
                  : '!bg-white/10 !text-white hover:!bg-white/20 !border-white/10'
              } 
            />
            
            {isAuthenticated && user?.role === 'CLIENT' ? (
              <Link href="/portal/dashboard">
                 <Button 
                   size="sm" 
                   className={
                     scrolled 
                       ? 'bg-cbp-navy text-white hover:bg-slate-800 dark:bg-cbp-gold dark:text-cbp-navy' 
                       : 'bg-white text-cbp-navy hover:bg-slate-100 border-none'
                   }
                 >
                   <User className="h-4 w-4 mr-2" /> Portal Klien
                 </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button 
                  size="sm" 
                  className={
                    scrolled 
                      ? 'bg-cbp-navy text-white hover:bg-slate-800 dark:bg-cbp-gold dark:text-cbp-navy' 
                      : 'bg-white text-cbp-navy hover:bg-slate-100 border-none'
                  }
                >
                  Login Klien
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <ThemeToggle className={scrolled ? '' : '!bg-white/10 !text-white'} />
             <button onClick={() => setIsOpen(!isOpen)} className={`p-2 transition-colors ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium px-4 py-2 rounded-lg ${
                pathname === link.path 
                  ? 'bg-cbp-navy/5 text-cbp-navy dark:bg-cbp-gold/10 dark:text-cbp-gold' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy">Login Portal Klien</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
