
import React from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ServiceItem } from '@cbp/core';

interface ServicePreviewCardProps {
  service: ServiceItem;
}

export const ServicePreviewCard: React.FC<ServicePreviewCardProps> = ({ service }) => {
  const IconComponent = (Icons as any)[service.iconName] || HelpCircle;

  return (
    <div className="group relative bg-white dark:bg-slate-950 rounded-2xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cbp-gold to-cbp-goldlight transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cbp-navy dark:group-hover:bg-cbp-gold transition-colors duration-500">
        <IconComponent className="h-8 w-8 text-cbp-navy dark:text-cbp-gold group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
      </div>
      
      <h3 className="text-2xl font-bold text-cbp-navy dark:text-white mb-4 group-hover:text-cbp-gold transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 min-h-[80px] flex-grow">
        {service.description}
      </p>
      
      <Link href="/services" className="inline-flex items-center text-sm font-bold text-cbp-gold hover:text-cbp-goldlight transition-colors mt-auto">
        Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};
