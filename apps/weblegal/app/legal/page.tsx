
"use client";

import React, { useState } from 'react';
import { SectionHeader } from '@cbp/ui';
import { LEGAL_CONTENT, LegalSectionType } from '@/data/legal-content';
import { LegalSidebar } from '@/components/legal/LegalSidebar';
import { LegalContentBlock } from '@/components/legal/LegalContentBlock';

export default function LegalPage() {
  // 1. Logic Layer: State untuk tab aktif (Default: Privacy)
  const [activeTab, setActiveTab] = useState<LegalSectionType>('privacy');

  // Helper untuk mendapatkan konten berdasarkan tab yang dipilih
  const activeContent = LEGAL_CONTENT.find(section => section.id === activeTab);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* 2. Hero Section */}
      <div className="bg-cbp-navy dark:bg-slate-900 pt-40 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Pusat Kebijakan & Privasi" 
            subtitle="Transparansi dan komitmen kami dalam melindungi hak serta data pribadi Anda sebagai klien CBP Corp."
            light
          />
        </div>
      </div>

      {/* 3. Main Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Dynamic Content (2/3 Width) - Desktop Order 1 (Left) */}
          <div className="lg:col-span-8 order-2 lg:order-1 min-h-[600px]">
            {activeContent ? (
              <LegalContentBlock 
                key={activeContent.id} /* Key penting untuk trigger animasi ulang */
                section={activeContent} 
              />
            ) : (
              <div className="text-center text-slate-500 py-20">Konten tidak ditemukan.</div>
            )}
          </div>

          {/* Right Column: Sidebar Menu (1/3 Width) - Desktop Order 2 (Right) */}
          <div className="lg:col-span-4 order-1 lg:order-2 h-full">
            <LegalSidebar 
              sections={LEGAL_CONTENT} 
              activeSection={activeTab}
              onSelect={(id) => setActiveTab(id as LegalSectionType)}
            />
          </div>

        </div>
      </div>
      
    </div>
  );
}
