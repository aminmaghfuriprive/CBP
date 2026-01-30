
import React from 'react';
import { ServiceItem } from '@cbp/core';
import { ServiceCardPublic } from './ServiceCardPublic';

interface ServiceCategoryRowProps {
  title: string;
  services: ServiceItem[];
  onItemClick: (service: ServiceItem) => void;
  index: number;
}

export const ServiceCategoryRow: React.FC<ServiceCategoryRowProps> = ({ title, services, onItemClick, index }) => {
  if (services.length === 0) return null;

  return (
    <section className="scroll-mt-24" id={title.replace(/\s+/g, '-').toLowerCase()}>
      {/* Visual Header untuk Setiap Divisi */}
      <div className="flex items-end gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-cbp-navy dark:text-white leading-none relative z-10">
          {title}
        </h2>
        
        {/* Decorative Line */}
        <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800 mb-2 relative">
           <div className="absolute right-0 -top-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-950 pl-3">
             {services.length} Layanan
           </div>
        </div>
      </div>

      {/* Grid Layout untuk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => (
          <ServiceCardPublic 
            key={service.id} 
            data={service} 
            onClick={onItemClick} 
          />
        ))}
      </div>
    </section>
  );
};
