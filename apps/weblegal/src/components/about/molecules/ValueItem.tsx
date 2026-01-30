
import React from 'react';
import * as Icons from 'lucide-react';

interface ValueItemProps {
  title: string;
  description: string;
  iconName: string;
  colorTheme: string; // 'blue' | 'amber' | 'emerald'
}

export const ValueItem: React.FC<ValueItemProps> = ({ title, description, iconName, colorTheme }) => {
  const IconComponent = (Icons as any)[iconName] || Icons.Shield;

  // Mapping warna berdasarkan tema input
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
  };

  const theme = colorMap[colorTheme] || colorMap.blue;

  return (
    <div className="p-10 text-center hover:bg-white dark:hover:bg-slate-900 transition-colors duration-300 group">
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${theme.bg}`}>
        <IconComponent className={`h-8 w-8 ${theme.text}`} />
      </div>
      <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-3 group-hover:text-cbp-gold transition-colors">
        {title}
      </h3>
      <div 
        className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
