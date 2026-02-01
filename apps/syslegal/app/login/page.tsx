
"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Mail, ArrowRight, Loader2, DollarSign, Briefcase, Laptop, UserCog, Map, Megaphone } from 'lucide-react';

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

  // Compact Button Component
  const QuickBtn = ({ mail, label, icon: Icon, color }: any) => (
    <button
      type="button"
      onClick={() => handleLogin(undefined, mail)}
      className="flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/30 hover:border-cbp-navy dark:hover:border-cbp-gold hover:shadow-sm transition-all duration-200 group w-full"
    >
      <div className={`p-1 rounded-md bg-slate-50 dark:bg-slate-800 ${color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} bg-opacity-10 dark:bg-opacity-20`}>
         <Icon className={`h-3.5 w-3.5 ${color}`} />
      </div>
      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-cbp-navy dark:group-hover:text-white uppercase tracking-wider truncate">
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      <div className="w-full max-w-md mx-auto flex items-center justify-center p-6">
        <div className="w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
               <Shield className="h-12 w-12 text-cbp-navy dark:text-cbp-gold" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-1">SysLegal Login</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Portal Manajemen Terintegrasi.</p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none text-sm transition-all" placeholder="user@cbp.id" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none text-sm transition-all" placeholder="••••••••" />
              </div>
            </div>
            <Button type="submit" className="w-full justify-center" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="flex items-center gap-2">Masuk Sistem <ArrowRight className="h-4 w-4" /></span>}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
             <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Akses Cepat (Demo)</p>
             {/* Grid layout adjusted for 2 compact rows on desktop (3 cols x 2 rows) */}
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
               <QuickBtn mail="admin@cbp.id" label="Admin" icon={UserCog} color="text-purple-600" />
               <QuickBtn mail="produksi@cbp.id" label="Produksi" icon={Briefcase} color="text-cbp-gold" />
               <QuickBtn mail="marketing@cbp.id" label="Marketing" icon={Megaphone} color="text-pink-500" />
               <QuickBtn mail="lapangan@cbp.id" label="Lapangan" icon={Map} color="text-orange-500" />
               <QuickBtn mail="finance@cbp.id" label="Finance" icon={DollarSign} color="text-green-600" />
               <QuickBtn mail="it@cbp.id" label="IT Dev" icon={Laptop} color="text-blue-500" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="h-8 w-8 animate-spin text-cbp-navy dark:text-cbp-gold" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
