
import React from 'react';
import { SectionHeader } from '@cbp/ui';
import { PHILOSOPHY_CONTENT } from '@/data/about-content';
import { ValueItem } from '../molecules/ValueItem';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-20 relative z-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Area */}
          <div className="p-10 md:p-16 text-center border-b border-slate-100 dark:border-slate-800">
              <SectionHeader 
                title={PHILOSOPHY_CONTENT.header.title}
                subtitle={PHILOSOPHY_CONTENT.header.subtitle}
              />
              <div className="max-w-4xl mx-auto text-slate-600 dark:text-slate-300 leading-relaxed space-y-6 text-lg">
                 {PHILOSOPHY_CONTENT.header.description.map((desc, idx) => (
                   <p key={idx} dangerouslySetInnerHTML={{ __html: desc }} />
                 ))}
              </div>
          </div>
          
          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-950">
             {PHILOSOPHY_CONTENT.values.map((val, idx) => (
               <ValueItem 
                 key={idx}
                 title={val.title}
                 description={val.description}
                 iconName={val.iconName}
                 colorTheme={val.colorTheme}
               />
             ))}
          </div>
      </div>
    </section>
  );
};
