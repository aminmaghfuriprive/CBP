import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = true }) => {
  return (
    <div className={`
      bg-white dark:bg-slate-900 
      rounded-xl shadow-sm hover:shadow-md 
      border border-slate-200 dark:border-slate-800 
      overflow-hidden transition-all duration-300 
      ${className}
    `}>
      <div className={padding ? "p-6" : ""}>
        {children}
      </div>
    </div>
  );
};

export const CardHeader: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-5">
    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
    {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
  </div>
);