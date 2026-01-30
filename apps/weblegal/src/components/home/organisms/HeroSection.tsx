
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@cbp/ui';
import { HERO_CONTENT } from '../../../data/landing-content';
import { QuoteCard } from '../molecules/QuoteCard';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Image 
          src={HERO_CONTENT.backgroundImage} 
          alt="Corporate Law Background" 
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-0.5 w-12 bg-cbp-gold"></div>
              <span className="text-cbp-gold font-bold tracking-[0.2em] text-sm uppercase">{HERO_CONTENT.tag}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] mb-8 tracking-tight">
              {HERO_CONTENT.title.line1}<br />
              {HERO_CONTENT.title.line2} <br/>
              <span className="text-cbp-gold italic">{HERO_CONTENT.title.highlight}</span>
            </h1>
            
            <div className="border-l-2 border-slate-700 pl-6 mb-10">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light" dangerouslySetInnerHTML={{__html: HERO_CONTENT.description}} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="!bg-cbp-gold !text-cbp-navy hover:!bg-white hover:!text-cbp-navy !border-transparent transition-all duration-300 px-8 py-4 h-auto text-base w-full sm:w-auto shadow-lg shadow-cbp-gold/20 font-bold">
                  {HERO_CONTENT.buttons.primary}
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="!bg-transparent !border-slate-400 !text-slate-100 hover:!border-white hover:!text-white hover:!bg-white/10 px-8 py-4 h-auto text-base w-full sm:w-auto">
                  {HERO_CONTENT.buttons.secondary}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-end animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
            <QuoteCard text={HERO_CONTENT.quote.text} author={HERO_CONTENT.quote.author} />
          </div>

        </div>
      </div>
    </section>
  );
};
