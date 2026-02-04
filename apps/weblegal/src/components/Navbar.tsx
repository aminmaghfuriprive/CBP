
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar on portal or auth pages
  if (pathname && (pathname.startsWith('/portal') || pathname.startsWith('/auth'))) return null;

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Pustaka', path: '/library' },
    { name: 'Wawasan', path: '/insights' },
    { name: 'Hubungi', path: '/contact' },
  ];

  // --- DYNAMIC STYLING LOGIC ---

  // 1. Container Background
  // At Top: Transparent
  // Scrolled: White (Light Mode) / Black (Dark Mode)
  const navContainerClass = scrolled 
    ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 py-3' 
    : 'bg-transparent py-5';

  // 2. Text Colors
  // At Top: Always White (assuming Dark Hero sections)
  // Scrolled: Navy (Light Mode) / White (Dark Mode)
  const textBaseClass = scrolled
    ? 'text-slate-600 hover:text-cbp-navy dark:text-slate-300 dark:hover:text-white'
    : 'text-slate-200 hover:text-white';
  
  const textActiveClass = scrolled
    ? 'text-cbp-navy dark:text-cbp-gold font-bold'
    : 'text-white font-bold border-b-2 border-cbp-gold';

  const logoColorClass = scrolled
    ? 'text-cbp-navy dark:text-white'
    : 'text-white';

  const logoSubColorClass = scrolled
    ? 'text-cbp-gold'
    : 'text-slate-300';

  // 3. Button/Icon Colors
  const toggleBtnClass = scrolled
    ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
    : 'hover:bg-white/10 text-white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navContainerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className={`h-8 w-8 transition-colors ${scrolled ? 'text-cbp-navy dark:text-cbp-gold' : 'text-white group-hover:text-cbp-gold'}`} />
            <div>
              <span className={`block font-serif font-bold text-xl leading-none tracking-tight transition-colors ${logoColorClass}`}>CBP Corp</span>
              <span className={`block text-[10px] font-bold uppercase tracking-widest transition-colors ${logoSubColorClass}`}>Legal Firm</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} href={link.path}
                className={`text-sm font-medium transition-all duration-200 ${pathname === link.path ? textActiveClass : textBaseClass}`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Divider */}
            <div className={`h-6 w-px ${scrolled ? 'bg-slate-200 dark:bg-slate-700' : 'bg-white/20'}`}></div>
            
            {/* Theme Toggle & CTA */}
            <div className="flex items-center gap-4">
              <ThemeToggle className={`!border-transparent ${toggleBtnClass}`} />
              
              {isAuthenticated && user?.role === 'CLIENT' ? (
                <Link href="/portal/dashboard">
                   <Button size="sm" className="!bg-cbp-gold !text-cbp-navy hover:!bg-white border-none font-bold shadow-none">
                     <User className="h-4 w-4 mr-2" /> Portal
                   </Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button size="sm" className={`font-bold shadow-none border-none ${scrolled ? 'bg-cbp-navy text-white hover:bg-cbp-gold hover:text-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:hover:bg-white' : '!bg-cbp-gold !text-cbp-navy hover:!bg-white'}`}>
                    Login Klien
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLES */}
          <div className="md:hidden flex items-center gap-2">
             <ThemeToggle className={`!border-transparent ${toggleBtnClass}`} />
             <button 
               onClick={() => setIsOpen(!isOpen)} 
               className={`p-2 rounded-lg transition-colors ${toggleBtnClass}`}
             >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-b border-slate-200 dark:border-slate-800 shadow-xl py-6 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.path} href={link.path} onClick={() => setIsOpen(false)}
              className={`
                text-lg font-medium px-4 py-3 rounded-xl transition-colors
                ${pathname === link.path 
                  ? 'bg-cbp-navy/5 text-cbp-navy dark:bg-white/10 dark:text-cbp-gold font-bold' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'}
              `}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full justify-center !bg-cbp-navy !text-white dark:!bg-cbp-gold dark:!text-cbp-navy font-bold py-3">
              Login Portal Klien
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
