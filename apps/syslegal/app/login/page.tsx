
"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Mail, ArrowRight, Loader2, Briefcase } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from') || '/app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Don't enforce role here, let AuthContext mock DB decide based on email
    // For manual overrides, admin@cbp.id = SUPER_ADMIN, finance@cbp.id = FINANCE
    await login(email); 
    setIsSubmitting(false);
    router.push(from);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      <div className="w-full max-w-md mx-auto flex items-center justify-center p-8">
        <div className="w-full bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
               <Shield className="h-12 w-12 text-cbp-navy dark:text-cbp-gold" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">SysLegal Internal</h1>
            <p className="text-slate-500 dark:text-slate-400">Portal Manajemen Staff & Partner.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Staff</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none" placeholder="staff@cbpcorp.id" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-navy outline-none" placeholder="••••••••" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full flex justify-between group bg-cbp-navy hover:bg-slate-800" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : <><span className="flex-1 font-bold">Masuk Sistem</span><ArrowRight className="h-5 w-5" /></>}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
             <p className="font-bold mb-1">Akun Demo:</p>
             <p>Admin: admin@cbp.id</p>
             <p>Finance: finance@cbp.id</p>
             <p>Legal: legal@cbp.id</p>
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
