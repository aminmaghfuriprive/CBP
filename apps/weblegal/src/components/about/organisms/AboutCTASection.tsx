
import React from 'react';
import Link from 'next/link';
import { Button } from '@cbp/ui';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cbp-navy/5 dark:bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-8">
           <ShieldCheck className="h-8 w-8 text-cbp-gold" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cbp-navy dark:text-white mb-6">
          Siap Bermitra dengan Tim Profesional Kami?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Jangan biarkan keraguan hukum menghambat langkah Anda. Diskusikan kebutuhan legalitas atau sengketa Anda langsung dengan Dr. Christian dan tim ahli CBP Corp.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="bg-cbp-navy text-white hover:bg-cbp-gold hover:text-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:hover:bg-white transition-all shadow-xl font-bold px-8">
              Jadwalkan Konsultasi <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="lg" className="border-slate-300 text-slate-600 hover:text-cbp-navy hover:border-cbp-navy dark:border-slate-600 dark:text-slate-300 dark:hover:text-white dark:hover:border-white px-8">
              Lihat Layanan Kami
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
