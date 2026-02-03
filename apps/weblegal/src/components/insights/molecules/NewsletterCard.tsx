
"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@cbp/ui';

export const NewsletterCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Di sini bisa ditambahkan logika API call ke backend
    }
  };

  return (
    <div className="bg-cbp-navy dark:bg-slate-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg border border-cbp-navy dark:border-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cbp-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <h4 className="font-serif font-bold text-lg mb-2 flex items-center gap-2 relative z-10">
        <Mail className="h-5 w-5 text-cbp-gold" /> Langganan
      </h4>
      
      {!isSubscribed ? (
        <>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed relative z-10">
            Dapatkan ringkasan hukum terbaru dan update regulasi bisnis langsung ke inbox Anda setiap minggu.
          </p>
          <form onSubmit={handleSubmit} className="relative z-10 space-y-3">
            <input 
              type="email" 
              required
              placeholder="Alamat email Anda..."
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbp-gold/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" size="sm" className="w-full bg-cbp-gold text-cbp-navy hover:bg-white hover:text-cbp-navy border-transparent font-bold">
              Gabung Sekarang <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center py-6 animate-in zoom-in duration-300 relative z-10">
          <div className="inline-flex p-3 bg-green-500/20 rounded-full text-green-400 mb-3">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h5 className="font-bold text-white text-sm">Terima Kasih!</h5>
          <p className="text-xs text-slate-300 mt-1">Anda telah terdaftar.</p>
        </div>
      )}
    </div>
  );
};
