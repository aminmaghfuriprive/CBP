
import React from 'react';
import Link from 'next/link';
import { Button } from '@cbp/ui';
import { CTA_CONTENT } from '../../../data/landing-content';

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-32 bg-cbp-navy dark:bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cbp-navy/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
          {CTA_CONTENT.title}
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light">
          {CTA_CONTENT.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact">
            <Button size="lg" className="!bg-cbp-gold !text-cbp-navy hover:!bg-white hover:!text-cbp-navy px-12 py-4 text-lg shadow-lg hover:shadow-cbp-gold/20 transform hover:-translate-y-1 transition-all !border-transparent font-bold">
              {CTA_CONTENT.buttons.primary}
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="px-12 py-4 text-lg !border-slate-400 !text-slate-100 hover:!bg-white hover:!text-cbp-navy hover:!border-white">
              {CTA_CONTENT.buttons.secondary}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
