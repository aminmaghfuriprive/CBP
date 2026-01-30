
import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { Shield } from 'lucide-react';

interface LetterheadPreviewProps {
  template: DocumentTemplate;
}

export const LetterheadPreview: React.FC<LetterheadPreviewProps> = ({ template }) => {
  const isCenter = template.layout === 'center';
  const isRight = template.layout === 'right';
  const isSplit = template.layout === 'split';

  return (
    <div className="w-full bg-white shadow-lg mx-auto aspect-[1/1.414] relative text-slate-900 overflow-hidden transform scale-95 border border-slate-200">
      {/* Header Area */}
      <div className={`p-8 border-b-4 relative`} style={{ borderBottomColor: template.accentColor || '#d4af37' }}>
        <div className={`flex items-center gap-6 ${isCenter ? 'flex-col text-center' : isRight ? 'flex-row-reverse text-right' : isSplit ? 'justify-between' : 'flex-row text-left'}`}>
          
          {/* Logo */}
          <div className="flex-shrink-0">
            {template.logoUrl ? (
              <img src={template.logoUrl} alt="Logo" className="h-16 w-auto" />
            ) : (
              <div className="h-16 w-16 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <Shield className="h-8 w-8" />
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
