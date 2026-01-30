
"use client";

import React, { useState, useEffect } from 'react';
import { useServiceCatalog, ServiceItem, ServiceDivision } from '@cbp/core';
import { ServiceCardPublic } from './ServiceCardPublic';
import { ServiceAnchorNav } from './ServiceAnchorNav';
import { Loader2, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@cbp/ui';

interface ServicePublicCatalogProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicePublicCatalog: React.FC<ServicePublicCatalogProps> = ({ onSelectService }) => {
  const { groupedServices, divisions } = useServiceCatalog();
  const [activeTab, setActiveTab] = useState<string>('');

  // Set default tab saat data siap
  useEffect(() => {
    if (divisions.length > 0 && !activeTab) {
      setActiveTab(divisions[0]);
    }
  }, [divisions, activeTab]);

  if (!groupedServices || !divisions || !activeTab) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cbp-gold" />
      </div>
    );
  }

  // Filter layanan berdasarkan tab aktif, dan ambil max 9 (Updated limit)
  // Type assertion: activeTab is validated by UI flow to be one of the divisions (keys of GroupedServices)
  const currentServices = groupedServices[activeTab as ServiceDivision] || [];
  const displayServices = currentServices.slice(0, 9);

  return (
    <div>
      {/* Tab Navigation */}
      <ServiceAnchorNav 
        divisions={divisions} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeTab}">
        {/* Header Tab Aktif */}
        <div className="flex flex-col md:flex-row items-baseline gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
           <h2 className="text-3xl font-serif font-bold text-cbp-navy dark:text-white">
             {activeTab}
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400">
             Menampilkan {displayServices.length} layanan terpopuler.
           </p>
        </div>

        {/* Grid Layout (Max 9 Cards) */}
        {displayServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayServices.map((service) => (
              <ServiceCardPublic 
                key={service.id} 
                data={service} 
                onClick={onSelectService} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-slate-500 font-serif text-lg">Belum ada layanan di kategori ini.</p>
          </div>
        )}

        {/* Closing CTA Section */}
        <div className="mt-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div>
              <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-4">
                 <MessageSquare className="h-6 w-6 text-cbp-gold" />
              </div>
              <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-2">
                Tidak menemukan layanan yang Anda cari?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg text-sm leading-relaxed">
                Setiap kasus hukum memiliki keunikan. Kami menyediakan layanan <i>Tailor-Made</i> yang disesuaikan spesifik dengan kebutuhan bisnis atau masalah Anda.
              </p>
           </div>
           <Link href="/contact">
             <Button className="whitespace-nowrap px-8 py-4 h-auto text-sm font-bold shadow-lg shadow-cbp-navy/10 dark:shadow-none">
               Hubungi Kami <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
           </Link>
        </div>
      </div>
    </div>
  );
};
