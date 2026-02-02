
import React from 'react';
import { SectionHeader } from '@cbp/ui';
import { CAREER_HERO } from '@/data/career-content';

export const CareerHero: React.FC = () => {
  return (
    <div className="bg-cbp-navy dark:bg-slate-900 pt-40 pb-20 text-center text-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <SectionHeader 
          title={CAREER_HERO.title} 
          subtitle={CAREER_HERO.subtitle}
          light
        />
      </div>
    </div>
  );
};
