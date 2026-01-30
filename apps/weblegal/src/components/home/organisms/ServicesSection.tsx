
import React from 'react';
import { SERVICES_SECTION_CONTENT } from '../../../data/landing-content';
import { ServicePreviewCard } from '../molecules/ServicePreviewCard';
import { ServiceItem } from '@cbp/core';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cbp-navy dark:text-white mb-6">{SERVICES_SECTION_CONTENT.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {SERVICES_SECTION_CONTENT.subtitle}
          </p>
        </div>
        
        {/* Changed grid from 3 to 4 columns on large screens to accommodate the 4 divisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_SECTION_CONTENT.divisions.map((division) => (
            // Casting to ServiceItem to satisfy the component prop, as division data matches the structure needed for display
            <ServicePreviewCard key={division.id} service={division as unknown as ServiceItem} />
          ))}
        </div>
      </div>
    </section>
  );
};
