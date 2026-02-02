
import React from 'react';
import { SectionHeader } from '@cbp/ui';
import { LEGAL_CONTENT } from '@/data/legal-content';
import { LegalSidebar } from '@/components/legal/LegalSidebar';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* Hero Section (Compact & Clean) */}
      <div className="bg-cbp-navy dark:bg-slate-900 pt-32 pb-14 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        {/* Subtle glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Pusat Kebijakan" 
            subtitle="Transparansi komitmen kami melindungi hak Anda."
            light
          />
        </div>
      </div>

      {/* Main Layout Grid with Anchor ID */}
      {/* Removed negative margin for clean separation */}
      <div id="legal-content-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dynamic Content */}
          <div className="lg:col-span-8 order-2 lg:order-1 min-h-[600px]">
            {children}
          </div>

          {/* Right Column: Sidebar Menu */}
          <div className="lg:col-span-4 order-1 lg:order-2 h-full">
            <LegalSidebar sections={LEGAL_CONTENT} />
          </div>

        </div>
      </div>
      
    </div>
  );
}
