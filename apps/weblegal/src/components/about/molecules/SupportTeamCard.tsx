
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface SupportTeamCardProps {
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
  onClick?: () => void;
}

export const SupportTeamCard: React.FC<SupportTeamCardProps> = ({ name, role, specialty, imageUrl, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="text-center group p-3 md:p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-300 cursor-pointer h-full flex flex-col justify-between"
    >
      {/* Round Image Container */}
      <div className="w-24 h-24 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden relative border-4 border-white dark:border-slate-800 shadow-xl mb-4 md:mb-6 group-hover:border-cbp-gold group-hover:shadow-cbp-gold/20 transition-all duration-300">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm md:text-lg font-bold text-cbp-navy dark:text-white group-hover:text-cbp-gold transition-colors font-serif leading-tight">
          {name}
        </h3>
        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-2 md:mb-3">
          {specialty}
        </p>
        
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-cbp-gold flex items-center justify-center gap-1 group-hover:gap-2 transition-all opacity-80 group-hover:opacity-100">
          Lihat Profil <ArrowRight className="h-3 w-3" />
        </p>
      </div>
    </div>
  );
};
