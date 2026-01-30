
import React from 'react';
import Image from 'next/image';
import { Card } from '@cbp/ui';

interface ExpertTeamCardProps {
  name: string;
  role: string; // Jabatan (e.g. Staff Produksi)
  specialty: string; // Nama Divisi (e.g. Hukum Umum & Litigasi)
  imageUrl: string;
}

export const ExpertTeamCard: React.FC<ExpertTeamCardProps> = ({ name, role, specialty, imageUrl }) => {
  return (
    <Card className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden" padding={false}>
      
      {/* Image Area - Fokus Utama di Atas */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
        />
        {/* Subtle Gradient overlay di bawah gambar untuk blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Area - Informasi di Bawah */}
      <div className="p-6 text-center relative bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-cbp-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
         
         <h3 className="text-lg font-bold text-cbp-navy dark:text-white font-serif mb-1 leading-tight">
           {name}
         </h3>
         <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
           {role}
         </p>

         <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-widest text-cbp-gold group-hover:text-cbp-navy dark:group-hover:text-white transition-colors">
              {specialty}
            </p>
         </div>
      </div>
    </Card>
  );
};
