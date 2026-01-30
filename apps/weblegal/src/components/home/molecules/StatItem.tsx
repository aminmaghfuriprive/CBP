
import React from 'react';
import * as Icons from 'lucide-react';

interface StatItemProps {
  label: string;
  value: string;
  iconName?: string;
}

export const StatItem: React.FC<StatItemProps> = ({ label, value, iconName }) => {
  const IconComponent = iconName ? (Icons as any)[iconName] : null;

  return (
    <div className="py-8 px-4 text-center group hover:bg-white/5 transition-colors cursor-default">
      {IconComponent && (
        <div className="mb-3 flex justify-center opacity-50 group-hover:opacity-100 group-hover:text-cbp-gold transition-all duration-300">
           <IconComponent className="h-6 w-6 text-white" />
        </div>
      )}
      <p className="text-3xl md:text-4xl font-serif font-bold text-white mb-1 group-hover:text-cbp-gold transition-colors">
        {value}
      </p>
      <p className="text-xs text-slate-400 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
};
