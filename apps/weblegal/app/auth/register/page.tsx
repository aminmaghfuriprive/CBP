
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Phone, User, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ClientRegisterPage() {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock registration -> auto login
    setTimeout(async () => {
       await login(phone, 'CLIENT');
       setIsSubmitting(false);
       router.push('/portal/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-200 dark:border-slate-800">
        
        {/* LEFT COLUMN: Visual & Branding */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-slate-900 relative p-12 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-cbp-navy/80 to-transparent"></div>
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Shield className="h-10 w-10 text-cbp-gold" />
              <div>
                <span className="block font-serif font-bold text-2xl leading-none">CBP Corp</span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-cbp-gold mt-1">Legal Firm</span>
              </div>
            </Link>
          </div>

          <div className="relative z-10 space-y-8">
            <h3 className="font-serif text-2xl font-bold">Mengapa Mendaftar?</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-cbp-gold flex-shrink-0" />
                <span className="text-slate-300">Konsultasi awal gratis dengan AI Assistant.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-cbp-gold flex-shrink-0" />
                <span className="text-slate-300">Monitoring status kasus secara real-time.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-cbp-gold flex-shrink-0" />
                <span className="text-slate-300">Akses repositori dokumen hukum Anda 24/7.</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 text-xs text-slate-400">
            Syarat & Ketentuan Berlaku.
          </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-cbp-gold hover:text-cbp-navy dark:hover:text-white transition-colors mb-8 w-fit">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Registrasi Klien</h2>
            <p className="text-slate-500 dark:text-slate-400">Mulai perjalanan hukum Anda bersama kami.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="text" required 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all placeholder:text-slate-400" 
                    placeholder="Sesuai KTP" 
                  />
                </div>
              </div>

             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="tel" required 
                    value={phone} onChange={(e) => setPhone(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all placeholder:text-slate-400" 
                    placeholder="0812xxxx" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Buat Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    type="password" required 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all placeholder:text-slate-400" 
                    placeholder="Minimal 8 karakter" 
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full justify-center mt-6 h-12 text-base shadow-lg shadow-cbp-navy/10" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Daftar Akun'}
              </Button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
            <p className="text-sm text-slate-500">Sudah memiliki akun?</p>
            <Link href="/auth/login" className="text-cbp-navy dark:text-cbp-gold font-bold hover:underline">
              Masuk Disini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
