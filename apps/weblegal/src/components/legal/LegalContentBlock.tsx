
import React from 'react';
import { LegalSection } from '@/data/legal-content';

interface LegalContentBlockProps {
  section: LegalSection;
}

export const LegalContentBlock: React.FC<LegalContentBlockProps> = ({ section }) => {
  return (
    <section 
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="flex flex-col gap-2 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold text-cbp-gold uppercase tracking-widest">
          Legal Document
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-cbp-navy dark:text-white">
          {section.title}
        </h2>
      </div>

      <div className="space-y-8">
        {section.content.map((item, index) => (
          <div key={index} className="group">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
              {item.heading}
            </h3>
            <div 
              className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base font-light prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 text-right">
         <p className="text-xs text-slate-400 italic">
           Terakhir diperbarui: Oktober 2023
         </p>
      </div>
    </section>
  );
};
