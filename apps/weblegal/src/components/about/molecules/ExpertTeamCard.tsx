
import React from 'react';
import Image from 'next/image';
import { Card } from '@cbp/ui';
import { ArrowRight } from 'lucide-react';

interface ExpertTeamCardProps {
  name: string;
  role: string; // Jabatan (e.g. Staff Produksi) - Hidden/Used in Modal
  specialty: string; // Nama Divisi (e.g. Hukum Umum & Litigasi) - Moved Up
  imageUrl: string;
  onClick?: () => void;
}

export const ExpertTeamCard: React.FC<ExpertTeamCardProps> = ({ name, role, specialty, imageUrl, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden cursor-pointer" 
      padding={false}
    >
      
      {/* Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        {/* Name Overlay (Optional Style) or keep in content area? Keeping in content area for cleanliness */}
      </div>

      {/* Content Area */}
      <div className="p-6 text-center relative bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col flex-1 justify-between">
         <div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-cbp-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <h3 className="text-lg font-bold text-cbp-navy dark:text-white font-serif mb-2 leading-tight">
              {name}
            </h3>
            
            {/* Division Label (Moved Up) */}
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-4 h-8 flex items-center justify-center">
              {specialty}
            </p>
         </div>

         <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
            {/* Action Label (Replaces old 'specialty' position) */}
            <p className="text-[11px] font-bold uppercase tracking-widest text-cbp-gold flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
              Lihat Profil <ArrowRight className="h-3 w-3" />
            </p>
         </div>
      </div>
    </Card>
  );
};
