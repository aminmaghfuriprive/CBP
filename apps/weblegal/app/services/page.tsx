
"use client";

import React, { useState } from 'react';
import { ServiceItem } from '@cbp/core';
import { SectionHeader } from '@cbp/ui';
import { ServicePublicCatalog } from '@/components/services/ServicePublicCatalog';
import { ServiceDetailModal } from '@/components/ServiceDetailModal';

export default function ServicesPage() {
  // Satu-satunya state yang perlu diatur di level halaman adalah Modal
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="bg-cbp-navy dark:bg-slate-900 pt-40 pb-20 text-center text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Katalog Layanan Hukum" 
            subtitle="Jelajahi solusi hukum komprehensif kami yang dikategorikan berdasarkan spesialisasi divisi untuk memudahkan kebutuhan bisnis dan pribadi Anda."
            light
          />
        </div>
      </div>

      {/* 2. Main Catalog Content (The Organism) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-950 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-900 p-6 md:p-12">
           <ServicePublicCatalog onSelectService={setSelectedService} />
        </div>
      </div>

      {/* 3. Detail Modal (Interactive Layer) */}
      <ServiceDetailModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
      
    </div>
  );
}
