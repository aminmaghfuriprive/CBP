
import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { Shield, Phone, Globe, MapPin } from 'lucide-react';

interface LetterheadPreviewProps {
  template: DocumentTemplate;
}

export const LetterheadPreview: React.FC<LetterheadPreviewProps> = ({ template }) => {
  const isCenter = template.layout === 'center';
  const isRight = template.layout === 'right';
  const isSplit = template.layout === 'split';
  const accentColor = template.accentColor || '#d4af37';

  // --- GEOMETRIC STYLE ---
  if (template.designStyle === 'GEOMETRIC') {
    return (
      <div className="w-full bg-white shadow-lg mx-auto aspect-[1/1.414] relative text-slate-900 overflow-hidden transform scale-95 border border-slate-200 flex flex-col">
        
        {/* Top Right Geometric Shapes */}
        <div className="absolute top-0 right-0 z-0">
           <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              {/* Shape 1: Triangle lighter */}
              <path d="M100 0H200V100L100 0Z" fill={accentColor} fillOpacity="0.4" />
              {/* Shape 2: Triangle main */}
              <path d="M140 0H200V60L140 0Z" fill={accentColor} />
           </svg>
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-8 pt-10 pb-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex-shrink-0">
                {template.logoUrl ? (
                  <img src={template.logoUrl} alt="Logo" className="h-16 w-auto" />
                ) : (
                  <div className="h-14 w-14 bg-slate-900 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                )}
              </div>
              
              {/* Text Info */}
              <div>
                <h1 className="text-xl font-serif font-bold uppercase tracking-wide text-slate-900 leading-none mb-1">
                  {template.companyName}
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Legal Firm</p>
              </div>
           </div>
        </div>

        {/* Separator if needed, but geometric relies on clean space */}
        
        {/* Body Content Placeholder */}
        <div className="flex-1 px-12 py-8 space-y-4 opacity-30 pointer-events-none relative z-10">
          <div className="w-32 h-3 bg-slate-800 mb-8"></div>
          <div className="w-full h-1.5 bg-slate-400"></div>
          <div className="w-full h-1.5 bg-slate-400"></div>
          <div className="w-3/4 h-1.5 bg-slate-400"></div>
          <div className="w-full h-1.5 bg-slate-400 mt-4"></div>
          <div className="w-5/6 h-1.5 bg-slate-400"></div>
          
          <div className="pt-16 w-40">
             <div className="h-10 border-b border-slate-400"></div>
             <div className="mt-1 h-1.5 w-full bg-slate-400"></div>
             <div className="mt-1 h-1 w-1/2 bg-slate-300"></div>
          </div>
        </div>

        {/* Footer Area - Geometric Bar */}
        <div className="relative mt-auto">
           {/* Decorative Shapes Bottom Right behind footer */}
           <div className="absolute bottom-0 right-0 z-20">
              <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
                 <path d="M50 150H150V50L50 150Z" fill="#ffffff" fillOpacity="0.2" />
                 <path d="M100 150H150V100L100 150Z" fill="#ffffff" fillOpacity="0.4" />
              </svg>
           </div>

           {/* Red Footer Bar */}
           <div className="w-full py-4 px-8 flex items-center justify-between text-white relative z-10 overflow-hidden" style={{ backgroundColor: accentColor }}>
              <div className="grid grid-cols-3 gap-6 w-full max-w-3xl text-[8px] font-medium leading-tight relative z-30">
                 <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/20 rounded">
                       <Phone className="h-3 w-3 text-white" />
                    </div>
                    <span>{template.contactInfo.split('|')[0] || '+62 21 5555 8888'}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/20 rounded">
                       <Globe className="h-3 w-3 text-white" />
                    </div>
                    <span>{template.website || 'www.cbpcorp.id'}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/20 rounded">
                       <MapPin className="h-3 w-3 text-white" />
                    </div>
                    <span>{template.addressLine2 || 'Jakarta, Indonesia'}</span>
                 </div>
              </div>
              
              {/* Background pattern on footer */}
              <div className="absolute top-0 right-0 h-full w-40 bg-white/10 skew-x-12 transform translate-x-10"></div>
           </div>
        </div>
      </div>
    );
  }

  // --- SIMPLE STYLE (DEFAULT) ---
  return (
    <div className="w-full bg-white shadow-lg mx-auto aspect-[1/1.414] relative text-slate-900 overflow-hidden transform scale-95 border border-slate-200">
      {/* Header Area */}
      <div className={`p-8 border-b-4 relative`} style={{ borderBottomColor: accentColor }}>
        <div className={`flex items-center gap-6 ${isCenter ? 'flex-col text-center' : isRight ? 'flex-row-reverse text-right' : isSplit ? 'justify-between' : 'flex-row text-left'}`}>
          
          {/* Logo */}
          <div className="flex-shrink-0">
            {template.logoUrl ? (
              <img src={template.logoUrl} alt="Logo" className="h-16 w-auto" />
            ) : (
              <div className="h-16 w-16 bg-slate-900 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
                <Shield className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          {/* Text Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold uppercase tracking-wide text-slate-900 mb-1" style={{ fontFamily: template.fontFamily }}>
              {template.companyName}
            </h1>
            <div className="text-xs text-slate-600 leading-relaxed font-sans">
              <p>{template.addressLine1}</p>
              {template.addressLine2 && <p>{template.addressLine2}</p>}
              <p className="mt-1 font-medium">{template.contactInfo}</p>
              {template.website && <p className="text-blue-700">{template.website}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Body Content Placeholder */}
      <div className="p-12 space-y-4 opacity-30 pointer-events-none">
        <div className="w-32 h-4 bg-slate-200 mb-8"></div>
        <div className="w-full h-2 bg-slate-200"></div>
        <div className="w-full h-2 bg-slate-200"></div>
        <div className="w-3/4 h-2 bg-slate-200"></div>
        <div className="w-full h-2 bg-slate-200 mt-4"></div>
        <div className="w-5/6 h-2 bg-slate-200"></div>
      </div>

      {/* Footer Placeholder */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-center">
         <div className="h-1 w-full bg-slate-100 mb-2"></div>
         <span className="text-[8px] text-slate-400">Electronic Generated Document</span>
      </div>
    </div>
  );
};
