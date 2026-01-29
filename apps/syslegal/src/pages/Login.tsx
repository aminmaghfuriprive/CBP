import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Shield, Lock, Mail, ArrowRight, Loader2, User, Briefcase } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'CLIENT'>('CLIENT');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, role);
    setIsSubmitting(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      <div className="w-full max-w-md mx-auto flex items-center justify-center p-8">
        <div className="w-full bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
               <Shield className="h-12 w-12 text-cbp-gold" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">CBP Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Masuk ke sistem manajemen.</p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
            <button onClick={() => setRole('CLIENT')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${role === 'CLIENT' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              <User className="h-4 w-4" /> Client
            </button>
            <button onClick={() => setRole('ADMIN')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${role === 'ADMIN' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
              <Briefcase className="h-4 w-4" /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold/50 outline-none" placeholder="nama@email.com" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-cbp-gold/50 outline-none" placeholder="••••••••" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full flex justify-between group" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : <><span className="flex-1 font-bold">Masuk</span><ArrowRight className="h-5 w-5" /></>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};