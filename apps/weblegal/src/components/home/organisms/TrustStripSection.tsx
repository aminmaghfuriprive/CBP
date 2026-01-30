
import React from 'react';
import { TRUST_STATS } from '../../../data/landing-content';
import { StatItem } from '../molecules/StatItem';

export const TrustStripSection: React.FC = () => {
  return (
    <div className="bg-cbp-navy dark:bg-slate-900 border-y border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {TRUST_STATS.map((stat, idx) => (
            <StatItem 
              key={idx}
              label={stat.label}
              value={stat.value}
              iconName={stat.iconName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
