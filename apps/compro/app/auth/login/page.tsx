"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button, Card } from '@cbp/ui';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ClientLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, 'CLIENT');
    setIsSubmitting(false);
    router.push('/portal/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
      <Link href="/" className="mb-8 flex items-center gap-2 group">
        <Shield className="h-10 w-10 text-cbp-navy dark:text-cbp-gold" />
        <div>
           <span className="block font-serif font-bold text-2xl leading-none text-cbp-navy dark:text-white">CBP Corp</span>
        </div>
      </Link>
      
      <Card className="w-full max-w-md p-8 md:p-10 border-t-4 border-t-cbp-gold">
        <h2 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2 text-center">Login Klien</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Akses portal layanan hukum Anda.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="email" required 
                  value={email} onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all" 
                  placeholder="nama@email.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="password" required 
                  value={password} onChange={(e) => setPassword(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full justify-center mt-4" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Masuk Portal'}
            </Button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-6">
          <p className="text-sm text-slate-500">Belum punya akun?</p>
          <Link href="/auth/register" className="text-cbp-navy dark:text-cbp-gold font-bold hover:underline">
            Daftar Sebagai Klien Baru
          </Link>
        </div>
      </Card>
    </div>
  );
}