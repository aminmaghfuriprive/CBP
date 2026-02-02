
import React from 'react';
import { LegalSection } from '@/data/legal-content';

interface LegalContentBlockProps {
  section: LegalSection;
}

export const LegalContentBlock: React.FC<LegalContentBlockProps> = ({ section }) => {
  return (
    <section 
      id={section.id} 
      className="scroll-mt-32 border-b border-slate-100 dark:border-slate-800 last:border-0 pb-16 mb-16 last:mb-0"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1 bg-cbp-gold rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cbp-navy dark:text-white">
          {section.title}
        </h2>
      </div>

      <div className="space-y-10">
        {section.content.map((item, index) => (
          <div key={index} className="group">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 group-hover:text-cbp-navy dark:group-hover:text-cbp-gold transition-colors">
              {item.heading}
            </h3>
            <div 
              className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg font-light prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
