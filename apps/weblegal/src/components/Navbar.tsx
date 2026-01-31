
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

  if (pathname && (pathname.startsWith('/portal') || pathname.startsWith('/auth'))) return null;

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/about' },
    { name: 'Layanan', path: '/services' },
    { name: 'Portofolio', path: '/portfolio' }, // Added
    { name: 'Wawasan', path: '/insights' },
    { name: 'Hubungi', path: '/contact' },
  ];

  const navBg = scrolled 
    ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-4 border-b border-white/10' 
    : 'bg-transparent py-6';

  const textColor = 'text-slate-200 hover:text-white';
  const activeColor = 'text-cbp-gold font-bold';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className={`h-8 w-8 transition-colors ${scrolled ? 'text-cbp-gold' : 'text-white group-hover:text-cbp-gold'}`} />
            <div>
              <span className="block font-serif font-bold text-xl leading-none tracking-tight text-white">CBP Corp</span>
              <span className={`block text-[10px] font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-cbp-gold' : 'text-slate-300'}`}>Legal Firm</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} href={link.path}
                className={`text-sm font-medium transition-colors ${pathname === link.path ? activeColor : textColor}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-white/20"></div>
            
            <ThemeToggle className="!bg-white/10 !text-white hover:!bg-white/20 !border-transparent" />
            
            {isAuthenticated && user?.role === 'CLIENT' ? (
              <Link href="/portal/dashboard">
                 <Button size="sm" className="!bg-cbp-gold !text-cbp-navy hover:!bg-white border-none font-bold shadow-none">
                   <User className="h-4 w-4 mr-2" /> Portal
                 </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" className="!bg-white !text-cbp-navy hover:!bg-slate-200 border-none font-bold shadow-none">
                  Login Klien
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <ThemeToggle className="!bg-white/10 !text-white hover:!bg-white/20" />
             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-t border-white/10 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.path} href={link.path} onClick={() => setIsOpen(false)}
              className={`text-lg font-medium px-4 py-2 rounded-lg ${pathname === link.path ? 'bg-cbp-gold/10 text-cbp-gold' : 'text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2"></div>
          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
            <Button className="w-full !bg-cbp-gold !text-cbp-navy font-bold">Login Portal Klien</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
