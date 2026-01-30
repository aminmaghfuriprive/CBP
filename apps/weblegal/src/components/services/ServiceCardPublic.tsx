
import React from 'react';
import { ServiceItem } from '@cbp/core';
import { ServiceIcon, DivisionTag } from '@cbp/ui';
import { ArrowRight, Clock } from 'lucide-react';

interface ServiceCardPublicProps {
  data: ServiceItem;
  onClick: (service: ServiceItem) => void;
}

export const ServiceCardPublic: React.FC<ServiceCardPublicProps> = ({ data, onClick }) => {
  // Hitung total estimasi hari dari SOP
  const totalDays = data.sop?.reduce((acc, step) => acc + step.estimatedDays, 0) || 0;

  return (
    <div 
      onClick={() => onClick(data)}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-cbp-gold dark:hover:border-cbp-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer relative overflow-hidden"
    >
      {/* Visual Accent: Gold Line on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cbp-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10"></div>
      
      {/* Duration Badge (New Feature) */}
      {totalDays > 0 && (
        <div className="absolute top-0 right-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-bl-2xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 z-0 border-b border-l border-slate-200 dark:border-slate-700">
          <Clock className="h-3 w-3" /> {totalDays} Hari
        </div>
      )}

      {/* Atom: Service Icon */}
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cbp-navy dark:group-hover:bg-cbp-gold transition-colors duration-300 shadow-sm mt-2">
        <ServiceIcon 
          name={data.iconName} 
          className="h-8 w-8 text-cbp-navy dark:text-cbp-gold group-hover:text-white dark:group-hover:text-slate-900 transition-colors" 
        />
      </div>
      
      {/* Content Header */}
      <div className="mb-4">
        <div className="mb-3">
          <DivisionTag division={data.division} />
        </div>
        <h3 className="text-2xl font-bold text-cbp-navy dark:text-white group-hover:text-cbp-gold transition-colors">
          {data.title}
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow line-clamp-3 text-sm">
        {data.description}
      </p>
      
      {/* Footer / Action */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between">
         <span className="text-sm font-bold text-cbp-gold group-hover:text-cbp-navy dark:group-hover:text-white transition-colors flex items-center gap-2">
          Lihat Detail & SOP <ArrowRight className="h-4 w-4" />
         </span>
      </div>
    </div>
  );
};
