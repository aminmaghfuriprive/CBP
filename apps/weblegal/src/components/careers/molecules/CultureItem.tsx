
import React from 'react';
import * as Icons from 'lucide-react';

interface CultureItemProps {
  title: string;
  description: string;
  icon: string;
}

export const CultureItem: React.FC<CultureItemProps> = ({ title, description, icon }) => {
  const IconComponent = (Icons as any)[icon] || Icons.Star;

  return (
    <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
      <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
        <IconComponent className="h-6 w-6 text-cbp-gold" />
      </div>
      <h4 className="font-bold text-cbp-navy dark:text-white mb-2 group-hover:text-cbp-gold transition-colors">
        {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
