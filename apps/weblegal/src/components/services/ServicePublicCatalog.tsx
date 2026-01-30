
"use client";

import React from 'react';
import { useServiceCatalog, ServiceItem } from '@cbp/core';
import { ServiceCategoryRow } from './ServiceCategoryRow';
import { ServiceAnchorNav } from './ServiceAnchorNav';
import { Loader2 } from 'lucide-react';

interface ServicePublicCatalogProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicePublicCatalog: React.FC<ServicePublicCatalogProps> = ({ onSelectService }) => {
  // Menggunakan Logic Hook dari Core (Step 2)
  const { groupedServices, divisions } = useServiceCatalog();

  // Validasi safety jika data belum siap
  if (!groupedServices || !divisions) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cbp-gold" />
      </div>
    );
  }

  const hasData = Object.values(groupedServices).flat().length > 0;

  return (
    <div>
      {/* Step 8: Sticky Navigation Anchor */}
      {hasData && <ServiceAnchorNav divisions={divisions} />}

      <div className="space-y-20 md:space-y-24">
        {divisions.map((divisionName, index) => (
          <ServiceCategoryRow
            key={divisionName}
            index={index}
            title={divisionName}
            services={groupedServices[divisionName]}
            onItemClick={onSelectService}
          />
        ))}

        {/* Empty State Fallback */}
        {!hasData && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-slate-500 font-serif text-lg">Tidak ada layanan yang tersedia saat ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};
