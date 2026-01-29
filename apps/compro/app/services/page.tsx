import React from 'react';
import { SERVICES } from '@cbp/core';
import { SectionHeader, Button } from '@cbp/ui';
import * as Icons from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 pt-20">
      <div className="bg-cbp-navy dark:bg-slate-900 py-24 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Layanan Hukum" 
            subtitle="Solusi komprehensif untuk setiap tantangan hukum Anda."
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;
            return (
              <div key={service.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-cbp-gold dark:hover:border-cbp-gold hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cbp-navy dark:group-hover:bg-cbp-gold transition-colors">
                  <IconComponent className="h-8 w-8 text-cbp-navy dark:text-cbp-gold group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-cbp-navy dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                   <Link href="/contact" className="inline-flex items-center text-sm font-bold text-cbp-gold hover:text-cbp-dark transition-colors">
                    Konsultasi Layanan <Icons.ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-200 dark:border-slate-800">
          <SectionHeader 
            title="Tidak menemukan yang Anda cari?"
            subtitle="Kasus hukum seringkali kompleks dan unik. Hubungi kami untuk konsultasi awal gratis dan temukan solusi yang disesuaikan dengan kebutuhan spesifik Anda."
          />
          <div className="text-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="px-8 py-4 text-base">Hubungi Konsultan</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}