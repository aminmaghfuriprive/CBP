
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@cbp/ui';
import { ArrowRight } from 'lucide-react';
import { FOUNDER_PROFILE } from '../../../data/landing-content';

export const FounderSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-1">
            <div className="absolute -inset-4 bg-cbp-navy/5 dark:bg-cbp-gold/10 rounded-xl transform rotate-3"></div>
            {/* Updated aspect ratio to [3/4] and fixed height on desktop for portrait look */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-[3/4] lg:aspect-auto lg:h-[650px]">
              <Image 
                src={FOUNDER_PROFILE.image} 
                alt={FOUNDER_PROFILE.name} 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cbp-navy/90 to-transparent p-8">
                <p className="text-white font-serif text-2xl italic">{FOUNDER_PROFILE.quote}</p>
                <p className="text-cbp-gold text-sm font-bold uppercase mt-2 tracking-widest">{FOUNDER_PROFILE.name}</p>
              </div>
            </div>
          </div>

          <div className="order-2">
            <h2 className="text-cbp-gold font-bold tracking-widest uppercase text-sm mb-4">{FOUNDER_PROFILE.roleLabel}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-cbp-navy dark:text-white mb-6 leading-tight">
              {FOUNDER_PROFILE.heading.line1} <br/>{FOUNDER_PROFILE.heading.line2}
            </h3>
            
            {FOUNDER_PROFILE.bio.map((paragraph, idx) => (
               <p key={idx} className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{__html: paragraph}} />
            ))}
            
            <div className="space-y-4 mb-8">
              {FOUNDER_PROFILE.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-cbp-gold rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{cred}</span>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button size="lg" className="bg-cbp-gold text-cbp-navy hover:bg-cbp-navy hover:text-cbp-gold border-transparent transition-all duration-300 px-8 py-4 h-auto text-base shadow-lg shadow-cbp-gold/20 font-bold">
                 {FOUNDER_PROFILE.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
