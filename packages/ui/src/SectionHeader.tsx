import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean; // Jika background dark
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  light = false 
}) => {
  const textColor = light ? 'text-white' : 'text-cbp-navy dark:text-white';
  const subColor = light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400';
  
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-3xl md:text-5xl font-serif font-bold ${textColor} mb-6 tracking-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${subColor} text-lg max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-cbp-gold mt-6 ${align === 'center' ? 'mx-auto' : ''} rounded-full`}></div>
    </div>
  );
};