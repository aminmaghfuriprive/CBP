
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Phone, Loader2, ArrowLeft, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function ClientLoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent, demoEmail?: string) => {
    if (e) e.preventDefault();
    
    // Gunakan demoEmail jika ada (tombol demo), jika tidak gunakan input phone
    const loginIdentifier = demoEmail || phone;
    
    if (!loginIdentifier) return;

    setIsSubmitting(true);
    // Kita passing ke fungsi login. Walaupun parameternya "email", untuk mock bisa terima string apa saja.
    await login(loginIdentifier, 'CLIENT');
    setIsSubmitting(false);
    router.push('/portal/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-200 dark:border-slate-800">
        
        {/* LEFT COLUMN: Visual & Branding */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-cbp-navy relative p-12 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Shield className="h-10 w-10 text-cbp-gold" />
              <div>
                <span className="block font-serif font-bold text-2xl leading-none">CBP Corp</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-cbp-gold mt-1">Legal Firm</span>
              </div>
            </Link>
          </div>

          <div className="relative z-10 space-y-6">
            <blockquote className="font-serif text-3xl font-bold leading-tight">
              "Kepastian hukum adalah fondasi keberhasilan bisnis Anda."
            </blockquote>
            <p className="text-slate-300 font-light text-lg">
              Akses dokumen, pantau progres kasus, dan konsultasi dengan tim ahli kami melalui satu portal terintegrasi.
            </p>
          </div>

          <div className="relative z-10 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} CBP Corp Legal Firm. All Rights Reserved.
          </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-cbp-gold hover:text-cbp-navy dark:hover:text-white transition-colors mb-8 w-fit">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Selamat Datang</h2>
            <p className="text-slate-500 dark:text-slate-400">Masuk untuk mengakses layanan hukum Anda.</p>
          </div>
          
          <form onSubmit={(e) => handleLogin(e)} className="space-y-5">
             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="tel" 
                    value={phone} onChange={(e) => setPhone(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all placeholder:text-slate-400" 
                    placeholder="0812xxxx" 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <a href="#" className="text-xs font-bold text-cbp-gold hover:underline">Lupa Password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all placeholder:text-slate-400" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full justify-center mt-6 h-12 text-base shadow-lg shadow-cbp-navy/10" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Masuk Portal'}
              </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
            <span className="text-xs text-slate-400 font-bold uppercase">Atau</span>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          </div>

          <button 
             onClick={() => handleLogin(undefined, 'budi@maju.com')}
             className="w-full p-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center gap-3 transition-colors group"
           >
             <UserCheck className="h-5 w-5 text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-cbp-gold transition-colors" />
             <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-cbp-navy dark:group-hover:text-white transition-colors">Masuk sebagai Demo Klien</span>
           </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">Belum memiliki akun?</p>
            <Link href="/auth/register" className="text-cbp-navy dark:text-cbp-gold font-bold hover:underline">
              Daftar Klien Baru
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
