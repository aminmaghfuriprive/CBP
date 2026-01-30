
import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { Shield } from 'lucide-react';

interface EnvelopePreviewProps {
  template: DocumentTemplate;
}

export const EnvelopePreview: React.FC<EnvelopePreviewProps> = ({ template }) => {
  return (
    <div className="w-full bg-white shadow-md mx-auto aspect-[2.2/1] relative text-slate-900 overflow-hidden border border-slate-200 p-6 flex flex-col justify-between">
      
      {/* Sender Info (Kop) */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
            {template.logoUrl ? (
              <img src={template.logoUrl} alt="Logo" className="h-10 w-auto" />
            ) : (
              <div className="h-10 w-10 bg-slate-900 rounded flex items-center justify-center text-white">
                <Shield className="h-5 w-5" />
              </div>
            )}
        </div>
        <div>
            <h3 className="text-sm font-bold uppercase text-slate-900" style={{ color: template.accentColor }}>{template.companyName}</h3>
            <p className="text-[9px] text-slate-600 max-w-[200px] leading-tight mt-1">
              {template.addressLine1} <br/> {template.addressLine2}
            </p>
        </div>
      </div>

      {/* Recipient Area */}
      <div className="self-end w-1/2 pr-8 pb-4 opacity-50">
         <div className="border-b border-dashed border-slate-300 pb-2 mb-2 text-xs font-bold text-slate-400">Kepada Yth.</div>
         <div className="h-2 w-3/4 bg-slate-200 mb-1"></div>
         <div className="h-2 w-1/2 bg-slate-200"></div>
      </div>

      {/* Decorative Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1.5" style={{ backgroundColor: template.accentColor || '#0f172a' }}></div>
    </div>
  );
};
