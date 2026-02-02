import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { usePreviewStyle } from '../hooks/usePreviewStyle';
import { PreviewLogo } from '../atoms/PreviewLogo';
import { ContentPlaceholder } from '../atoms/ContentPlaceholder';

interface SimpleLayoutProps {
  template: DocumentTemplate;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({ template }) => {
  const { layoutClasses, styles, resolvedColor } = usePreviewStyle(template);

  return (
    <>
      {/* Header Area */}
      <div 
        className="p-8 border-b-4 relative transition-all duration-300" 
        style={styles.borderBottom}
      >
        <div className={layoutClasses.container}>
          
          {/* Logo */}
          <div className="flex-shrink-0 transition-all duration-300">
            <PreviewLogo 
              logoUrl={template.logoUrl} 
              accentColor={resolvedColor} 
              className="h-16 w-16"
            />
          </div>

          {/* Text Info */}
          <div className="flex-1">
            <h1 
              className="text-2xl font-serif font-bold uppercase tracking-wide text-slate-900 mb-1 leading-none" 
              style={styles.font}
            >
              {template.companyName}
            </h1>
            <div className={`text-xs text-slate-600 leading-relaxed font-sans ${layoutClasses.text}`}>
              <p>{template.addressLine1}</p>
              {template.addressLine2 && <p>{template.addressLine2}</p>}
              <p className="mt-1 font-medium">{template.contactInfo}</p>
              {template.website && <p className="text-blue-700">{template.website}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Body Content Placeholder */}
      <div className="p-12 relative z-10">
        <ContentPlaceholder />
      </div>

      {/* Footer Placeholder (Static for Simple Layout) */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-center">
         <div className="h-1 w-full bg-slate-100 mb-2"></div>
         <span className="text-[8px] text-slate-400 uppercase tracking-widest">Electronic Generated Document • {template.companyName}</span>
      </div>
    </>
  );
};