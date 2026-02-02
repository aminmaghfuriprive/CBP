import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { Phone, Globe, MapPin } from 'lucide-react';
import { PreviewLogo } from '../atoms/PreviewLogo';
import { ContentPlaceholder } from '../atoms/ContentPlaceholder';

interface GeometricLayoutProps {
  template: DocumentTemplate;
}

export const GeometricLayout: React.FC<GeometricLayoutProps> = ({ template }) => {
  const accentColor = template.accentColor || '#d4af37';

  return (
    <>
      {/* Top Right Geometric Shapes */}
      <div className="absolute top-0 right-0 z-0">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M100 0H200V100L100 0Z" fill={accentColor} fillOpacity="0.4" />
          <path d="M140 0H200V60L140 0Z" fill={accentColor} />
        </svg>
      </div>

      {/* Header Content */}
      <div className="relative z-10 px-8 pt-10 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <PreviewLogo logoUrl={template.logoUrl} accentColor={accentColor} className="h-14 w-14" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold uppercase tracking-wide text-slate-900 leading-none mb-1">
              {template.companyName}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Legal Firm</p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex-1 px-12 py-8 relative z-10">
         <ContentPlaceholder variant="geometric" />
      </div>

      {/* Footer Area */}
      <div className="relative mt-auto">
        {/* Decorative Shapes Bottom Right */}
        <div className="absolute bottom-0 right-0 z-20">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
            <path d="M50 150H150V50L50 150Z" fill="#ffffff" fillOpacity="0.2" />
            <path d="M100 150H150V100L100 150Z" fill="#ffffff" fillOpacity="0.4" />
          </svg>
        </div>

        {/* Footer Bar */}
        <div 
          className="w-full py-4 px-8 flex items-center justify-between text-white relative z-10 overflow-hidden" 
          style={{ backgroundColor: accentColor }}
        >
          <div className="grid grid-cols-3 gap-6 w-full max-w-3xl text-[8px] font-medium leading-tight relative z-30">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded"><Phone className="h-3 w-3 text-white" /></div>
              <span>{template.contactInfo.split('|')[0] || '+62 21 5555 8888'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded"><Globe className="h-3 w-3 text-white" /></div>
              <span>{template.website || 'www.cbpcorp.id'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded"><MapPin className="h-3 w-3 text-white" /></div>
              <span>{template.addressLine2 || 'Jakarta, Indonesia'}</span>
            </div>
          </div>
          
          {/* Background pattern on footer */}
          <div className="absolute top-0 right-0 h-full w-40 bg-white/10 skew-x-12 transform translate-x-10"></div>
        </div>
      </div>
    </>
  );
};