
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
    <div className="bg-cbp-navy dark:bg-slate-900 relative overflow-hidden pt-40 pb-32">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy via-cbp-navy/80 to-cbp-navy/40 dark:from-slate-900 dark:via-slate-900/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column: Founder Image */}
          <div className="w-full md:w-5/12 order-2 md:order-1">
             <div className="relative group aspect-[3/4] w-full max-w-sm mx-auto md:mr-auto">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy/80 via-transparent to-transparent opacity-60"></div>
               </div>
             </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-7/12 text-white order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbp-gold/10 border border-cbp-gold/30 rounded-full text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6">
              {ABOUT_HERO_CONTENT.role}
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-2 leading-tight">
                {founder?.name}
              </h1>
              {/* Gelar ditaruh di bawah nama sesuai request */}
              <p className="text-xl text-cbp-gold font-serif italic tracking-wide">
                {founder?.specialty}
              </p>
            </div>
            
            <div className="relative pl-6 border-l-4 border-cbp-gold mb-8">
              <p className="text-xl md:text-2xl text-slate-200 font-serif italic leading-relaxed">
                {ABOUT_HERO_CONTENT.quote}
              </p>
            </div>
            
            <div className="text-slate-300 leading-relaxed space-y-4 text-lg font-light">
              {ABOUT_HERO_CONTENT.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-8">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Sertifikasi & Keahlian</p>
              <div className="flex flex-wrap gap-4">
                {ABOUT_HERO_CONTENT.credentials.map((cred, idx) => (
                  <CredentialBadge key={idx} iconName={cred.iconName} label={cred.label} />
                ))}
                {/* Tambahan manual jika perlu */}
                <CredentialBadge iconName="Award" label="Certified Legal Auditor" />
                <CredentialBadge iconName="FileCheck" label="Certified Contract Drafter" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
