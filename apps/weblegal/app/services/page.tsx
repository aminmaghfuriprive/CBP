
"use client";

import React, { useState } from 'react';
import { SERVICES, ServiceItem } from '@cbp/core';
import { SectionHeader, Button } from '@cbp/ui';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { ServiceDetailModal } from '@/components/ServiceDetailModal';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 pt-20">
      <div className="bg-cbp-navy dark:bg-slate-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Layanan Hukum" 
            subtitle="Solusi komprehensif yang dirancang untuk melindungi kepentingan bisnis dan pribadi Anda dengan strategi hukum yang presisi."
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;
            return (
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-cbp-gold dark:hover:border-cbp-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden"
              >
                {/* Hover Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-cbp-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cbp-navy dark:group-hover:bg-cbp-gold transition-colors duration-300 shadow-sm">
                  <IconComponent className="h-8 w-8 text-cbp-navy dark:text-cbp-gold group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                </div>
                
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 block">{service.division}</span>
                  <h3 className="text-2xl font-bold text-cbp-navy dark:text-white group-hover:text-cbp-gold transition-colors">{service.title}</h3>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow line-clamp-3">
                  {service.description}
                </p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between">
                   <span className="text-sm font-bold text-cbp-gold group-hover:text-cbp-navy dark:group-hover:text-white transition-colors flex items-center gap-2">
                    Lihat Detail & SOP <Icons.ArrowRight className="h-4 w-4" />
                   </span>
                   {service.sop && (
                     <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">
                       {service.sop.length} Langkah
                     </span>
                   )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Solution CTA */}
        <div className="mt-24 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cbp-gold/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 text-center">
            <SectionHeader 
              title="Tidak menemukan yang Anda cari?"
              subtitle="Kasus hukum seringkali kompleks dan unik. Hubungi kami untuk konsultasi awal gratis dan temukan solusi yang disesuaikan dengan kebutuhan spesifik Anda."
            />
            <Link href="/contact">
              <Button variant="primary" size="lg" className="px-8 py-4 text-base shadow-lg shadow-cbp-navy/20">Hubungi Konsultan</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ServiceDetailModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </div>
  );
}
