
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group focus:outline-none"
      >
        <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-cbp-navy dark:text-cbp-gold' : 'text-slate-700 dark:text-slate-300 group-hover:text-cbp-navy dark:group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-cbp-gold text-cbp-navy rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
           <ChevronDown className="h-5 w-5" />
        </div>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};
