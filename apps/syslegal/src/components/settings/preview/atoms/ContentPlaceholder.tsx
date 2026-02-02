import React from 'react';

interface ContentPlaceholderProps {
  variant?: 'simple' | 'geometric';
  className?: string;
}

export const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({ variant = 'simple', className = '' }) => {
  const isGeometric = variant === 'geometric';
  
  // Style config berdasarkan varian
  const barColor = isGeometric ? 'bg-slate-400' : 'bg-slate-200';
  const headingColor = isGeometric ? 'bg-slate-800' : 'bg-slate-200';
  const barHeight = isGeometric ? 'h-1.5' : 'h-2';

  return (
    <div className={`flex-1 opacity-30 pointer-events-none relative z-10 ${className}`}>
      <div className="space-y-4">
        <div className={`w-32 ${isGeometric ? 'h-3' : 'h-4'} ${headingColor} mb-8`}></div>
        <div className={`w-full ${barHeight} ${barColor}`}></div>
        <div className={`w-full ${barHeight} ${barColor}`}></div>
        <div className={`w-3/4 ${barHeight} ${barColor}`}></div>
        <div className={`w-full ${barHeight} ${barColor} mt-4`}></div>
        <div className={`w-5/6 ${barHeight} ${barColor}`}></div>
      </div>

      {isGeometric && (
        <div className="pt-16 w-40">
           <div className="h-10 border-b border-slate-400"></div>
           <div className="mt-1 h-1.5 w-full bg-slate-400"></div>
           <div className="mt-1 h-1 w-1/2 bg-slate-300"></div>
        </div>
      )}
    </div>
  );
};