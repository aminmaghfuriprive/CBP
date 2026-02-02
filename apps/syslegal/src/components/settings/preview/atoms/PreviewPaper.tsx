import React from 'react';

interface PreviewPaperProps {
  children: React.ReactNode;
  className?: string;
}

export const PreviewPaper: React.FC<PreviewPaperProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      w-full bg-white shadow-lg mx-auto aspect-[1/1.414] relative text-slate-900 
      overflow-hidden transform scale-95 border border-slate-200 flex flex-col 
      ${className}
    `}>
      {children}
    </div>
  );
};