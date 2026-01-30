
import React from 'react';
import Image from 'next/image';

interface SupportStaffRowProps {
  name: string;
  specialty: string;
  imageUrl: string;
}

export const SupportStaffRow: React.FC<SupportStaffRowProps> = ({ name, specialty, imageUrl }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group cursor-default">
      <div className="h-16 w-16 rounded-full overflow-hidden relative flex-shrink-0 border border-slate-200 dark:border-slate-700 group-hover:border-cbp-gold transition-colors">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover" 
        />
      </div>
      <div>
        <h4 className="font-bold text-cbp-navy dark:text-white text-sm group-hover:text-cbp-gold transition-colors">
          {name}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">
          {specialty}
        </p>
      </div>
    </div>
  );
};
