
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ContactStepIndicatorProps {
  currentStep: number;
}

export const ContactStepIndicator: React.FC<ContactStepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between mb-10 relative px-4">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 rounded-full"></div>
      
      {/* Active Line Progress */}
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-cbp-gold -z-10 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
      ></div>

      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-2 relative z-10">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2
            ${currentStep >= s 
              ? 'bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy border-cbp-navy dark:border-cbp-gold' 
              : 'bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-600 border-slate-200 dark:border-slate-700'}
          `}>
            {currentStep > s ? <CheckCircle className="h-5 w-5" /> : s}
          </div>
          <span className={`
            text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
            ${currentStep >= s ? 'text-cbp-navy dark:text-cbp-gold' : 'text-slate-400 dark:text-slate-600'}
          `}>
            {s === 1 ? 'Data Diri' : s === 2 ? 'Jadwal' : 'Konfirmasi'}
          </span>
        </div>
      ))}
    </div>
  );
};
