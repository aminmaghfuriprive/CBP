
"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Mail, ArrowRight, Loader2, UserCheck } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from') || '/app';

  const handleLogin = async (e?: React.FormEvent, quickEmail?: string) => {
    if (e) e.preventDefault();
    const targetEmail = quickEmail || email;
    
    if (!targetEmail) return;

    setIsSubmitting(true);
    await login(targetEmail); 
    setIsSubmitting(false);
    router.push(from);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      <div className="w-full max-w-md mx-auto flex items-center justify-center p-8">
        <div className="w-full bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
               <Shield className="h-12 w-12 text-cbp-navy dark:text-cbp-gold" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">SysLegal Internal</h1>
            <p className="text-slate-500 dark:text-slate-400">Portal Manajemen Staff & Partner.</p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Staff</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none" placeholder="staff@cbpcorp.id" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none" placeholder="••••••••" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full flex justify-between group bg-cbp-navy hover:bg-slate-800" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : <><span className="flex-1 font-bold">Masuk Sistem</span><ArrowRight className="h-5 w-5" /></>}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
             <p className="text-xs font-bold text-slate-400 mb-3 text-center uppercase tracking-widest">Akses Demo (Klik Langsung)</p>
             <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handleLogin(undefined, 'admin@cbp.id')} className="p-2 text-xs bg-slate-50 dark:bg-slate-800 hover:bg-cbp-navy hover:text-white dark:hover:bg-cbp-gold dark:hover:text-cbp-navy rounded border border-slate-200 dark:border-slate-700 transition-all text-center flex flex-col items-center gap-1 group">
                  <UserCheck className="h-4 w-4 text-cbp-gold group-hover:text-white dark:group-hover:text-cbp-navy" />
                  <span className="font-bold">Admin</span>
                </button>
                <button onClick={() => handleLogin(undefined, 'finance@cbp.id')} className="p-2 text-xs bg-slate-50 dark:bg-slate-800 hover:bg-cbp-navy hover:text-white dark:hover:bg-cbp-gold dark:hover:text-cbp-navy rounded border border-slate-200 dark:border-slate-700 transition-all text-center flex flex-col items-center gap-1 group">
                  <UserCheck className="h-4 w-4 text-green-500 group-hover:text-white dark:group-hover:text-cbp-navy" />
                  <span className="font-bold">Finance</span>
                </button>
                <button onClick={() => handleLogin(undefined, 'legal@cbp.id')} className="p-2 text-xs bg-slate-50 dark:bg-slate-800 hover:bg-cbp-navy hover:text-white dark:hover:bg-cbp-gold dark:hover:text-cbp-navy rounded border border-slate-200 dark:border-slate-700 transition-all text-center flex flex-col items-center gap-1 group">
                  <UserCheck className="h-4 w-4 text-blue-500 group-hover:text-white dark:group-hover:text-cbp-navy" />
                  <span className="font-bold">Legal</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="h-8 w-8 animate-spin text-cbp-navy dark:text-cbp-gold" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
