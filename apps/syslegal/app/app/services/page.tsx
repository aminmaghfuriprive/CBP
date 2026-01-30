
"use client";

import React from 'react';
import { useServiceLogic } from '@cbp/core';
import { PageHeader, StatCard } from '@cbp/ui';
import { Briefcase, CheckCircle, Tag } from 'lucide-react';
import { ServiceListView } from '../../../src/components/services/ServiceListView';

export default function ServicesPage() {
  const { services } = useServiceLogic();
  
  const activeServices = services.filter(s => s.isActive).length;
  const corporateServices = services.filter(s => s.division.includes('Korporasi')).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader 
        title="Manajemen Layanan" 
        subtitle="Atur katalog layanan hukum, harga, dan ketersediaan untuk sistem booking." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <StatCard 
            label="Total Layanan" 
            value={services.length} 
            icon={Briefcase} 
            variant="primary" 
         />
         <StatCard 
            label="Layanan Aktif" 
            value={activeServices} 
            icon={CheckCircle} 
            variant="success" 
         />
         <StatCard 
            label="Layanan Korporasi" 
            value={corporateServices} 
            icon={Tag} 
            variant="secondary" 
         />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <ServiceListView />
      </div>
    </div>
  );
}
