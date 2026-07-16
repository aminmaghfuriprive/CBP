import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = true, ...props }) => {
  return (
    <div 
      className={`
        bg-white dark:bg-slate-900 
        rounded-xl shadow-sm hover:shadow-md 
        border border-slate-200 dark:border-slate-800 
        overflow-hidden transition-all duration-300 
        ${className}
      `}
      {...props}
    >
      <div className={padding ? "p-3" : ""}>
        {children}
      </div>
    </div>
  );
};

export const CardHeader: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-2">
    <h3 className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
    {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
  </div>
);