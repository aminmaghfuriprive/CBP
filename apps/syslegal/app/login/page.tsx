
"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Mail, ArrowRight, Loader2, DollarSign, Scale, Laptop, UserCog } from 'lucide-react';

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
    await login(targetEmail); // Role otomatis didapat dari Mock DB berdasarkan email
    setIsSubmitting(false);
    router.push(from);
  };

  const QuickBtn = ({ mail, label, icon: Icon, color }: any) => (
    <button
      type="button"
      onClick={() => handleLogin(undefined, mail)}
      className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-cbp-gold dark:hover:border-cbp-gold hover:shadow-md transition-all duration-200 group"
    >
      <Icon className={`h-6 w-6 mb-2 ${color} group-hover:scale-110 transition-transform`} />
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-cbp-navy dark:group-hover:text-white">{label}</span>
      <span className="text-[10px] text-slate-400 scale-0 group-hover:scale-100 transition-transform h-0 group-hover:h-auto">Klik utk Login</span>
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
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-1">SysLegal Internal</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Portal Manajemen Staff & Partner.</p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Email Staff</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none text-sm transition-all" placeholder="staff@cbpcorp.id" />
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
             <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Access (Demo)</p>
             <div className="grid grid-cols-4 gap-3">
               <QuickBtn mail="admin@cbp.id" label="Owner" icon={UserCog} color="text-purple-600" />
               <QuickBtn mail="finance@cbp.id" label="Finance" icon={DollarSign} color="text-green-600" />
               <QuickBtn mail="legal@cbp.id" label="Legal" icon={Scale} color="text-cbp-gold" />
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
