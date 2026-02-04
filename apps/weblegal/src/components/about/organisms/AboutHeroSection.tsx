
import React from 'react';
import Image from 'next/image';
import { Lawyer } from '@cbp/core';
import { ABOUT_HERO_CONTENT } from '@/data/about-content';
import { CredentialBadge } from '../molecules/CredentialBadge';

interface AboutHeroSectionProps {
  founder?: Lawyer;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({ founder }) => {
  return (
    <div className="bg-cbp-navy dark:bg-slate-900 relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 dark:opacity-10"></div>
      
      {/* Lighting Fix: Lighter Navy gradient for Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-cbp-navy/70 to-cbp-navy/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900/60 transition-colors duration-500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          
          {/* Left Column: Founder Image */}
          <div className="w-full md:w-5/12">
             <div className="relative group aspect-[3/4] w-full max-w-xs md:max-w-sm mx-auto md:mr-auto">
               <div className="absolute -inset-4 bg-cbp-gold/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition duration-1000"></div>
               <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-cbp-gold/30 shadow-2xl">
                  {founder && (
                    <Image 
                      src={founder.imageUrl} 
                      alt={founder.name} 
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy/90 via-transparent to-transparent opacity-60"></div>
               </div>
             </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-7/12 text-white text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbp-gold/10 border border-cbp-gold/30 rounded-full text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6">
              {ABOUT_HERO_CONTENT.role}
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 leading-tight">
                {founder?.name}
              </h1>
              <p className="text-lg md:text-xl text-cbp-gold font-serif italic tracking-wide">
                {founder?.specialty}
              </p>
            </div>
            
            <div className="relative pl-0 md:pl-6 md:border-l-4 border-cbp-gold mb-8">
              <p className="text-lg md:text-2xl text-slate-200 font-serif italic leading-relaxed">
                {ABOUT_HERO_CONTENT.quote}
              </p>
            </div>
            
            <div className="text-slate-200 dark:text-slate-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              {ABOUT_HERO_CONTENT.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-8">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Sertifikasi & Keahlian</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {ABOUT_HERO_CONTENT.credentials.map((cred, idx) => (
                  <CredentialBadge key={idx} iconName={cred.iconName} label={cred.label} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
