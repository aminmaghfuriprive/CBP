
import React from 'react';
import { CULTURE_VALUES } from '@/data/career-content';
import { CultureItem } from '../molecules/CultureItem';

export const CultureGrid: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 mt-16">
      <div className="text-center mb-10">
        <h3 className="text-xl font-serif font-bold text-cbp-navy dark:text-white">Mengapa CBP Corp?</h3>
        <p className="text-slate-500 text-sm mt-2">Lingkungan yang membangun profesionalisme Anda.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CULTURE_VALUES.map((val, idx) => (
          <CultureItem 
            key={idx}
            title={val.title}
            description={val.description}
            icon={val.icon}
          />
        ))}
      </div>
    </div>
  );
};
