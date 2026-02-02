
import React from 'react';
import { CertificateItem } from '@cbp/core';
import { ZoomIn } from 'lucide-react';

interface CertificateCardProps {
  item: CertificateItem;
  onClick: (item: CertificateItem) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ item, onClick }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group relative flex-shrink-0 w-64 h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mx-3"
    >
      {/* Image Container */}
      <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <ZoomIn className="text-white h-8 w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-32 justify-between relative bg-white dark:bg-slate-900">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cbp-gold rounded-full flex items-center justify-center text-xs font-bold text-cbp-navy shadow-lg border-2 border-white dark:border-slate-900">
            {item.year}
         </div>
         
         <div className="pt-3 text-center">
            <h4 className="text-sm font-bold text-cbp-navy dark:text-white line-clamp-2 leading-tight mb-1" title={item.title}>
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1" title={item.issuer}>
              {item.issuer}
            </p>
         </div>
         
         <div className="w-8 h-0.5 bg-cbp-gold/50 mx-auto rounded-full group-hover:w-16 transition-all duration-300"></div>
      </div>
    </div>
  );
};
