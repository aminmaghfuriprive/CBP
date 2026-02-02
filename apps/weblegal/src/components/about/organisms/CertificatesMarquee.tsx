
"use client";

import React, { useState } from 'react';
import { useCertificateLogic, CertificateItem } from '@cbp/core';
import { CertificateCard } from '../molecules/CertificateCard';
import { CertificateLightbox } from '../molecules/CertificateLightbox';
import { Award } from 'lucide-react';

export const CertificatesMarquee: React.FC = () => {
  const { certificates } = useCertificateLogic();
  const [selectedItem, setSelectedItem] = useState<CertificateItem | null>(null);

  if (!certificates || certificates.length === 0) return null;

  // Navigation Logic
  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = certificates.findIndex(c => c.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % certificates.length;
    setSelectedItem(certificates[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = certificates.findIndex(c => c.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
    setSelectedItem(certificates[prevIndex]);
  };

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-cbp-gold/10 text-cbp-gold rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-cbp-gold/20">
            <Award className="h-4 w-4" /> Kredibilitas & Kompetensi
         </div>
         <h2 className="text-3xl md:text-4xl font-serif font-bold text-cbp-navy dark:text-white">
            Lisensi & Sertifikasi
         </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden group">
         {/* Fade Gradients */}
         <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

         <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] py-4">
            {/* Loop 1: Original */}
            {certificates.map((cert) => (
               <CertificateCard 
                 key={cert.id} 
                 item={cert} 
                 onClick={setSelectedItem} 
               />
            ))}
            {/* Loop 2: Duplicate for seamless effect (Translate -50%) */}
            {certificates.map((cert) => (
               <CertificateCard 
                 key={`${cert.id}-dup`} 
                 item={cert} 
                 onClick={setSelectedItem} 
               />
            ))}
         </div>
      </div>

      <CertificateLightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
