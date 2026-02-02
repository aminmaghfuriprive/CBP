
import React, { useState } from 'react';
import { SectionHeader } from '@cbp/ui';
import { FAQ_ITEMS } from '@/data/faq-content';
import { FAQItem } from '../molecules/FAQItem';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Pertanyaan Umum" 
          subtitle="Beberapa hal yang sering ditanyakan oleh calon klien sebelum memulai konsultasi hukum."
        />
        
        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
