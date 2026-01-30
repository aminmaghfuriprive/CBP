
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
      {/* Header Divisi */}
      <div className="bg-cbp-navy dark:bg-slate-800 p-4 text-center border-b border-cbp-gold/20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-cbp-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
         <h4 className="text-white dark:text-cbp-gold text-sm font-bold uppercase tracking-widest">{specialty}</h4>
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80"></div>
        
        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-center">
           <h3 className="text-lg font-bold text-white font-serif mb-1">{name}</h3>
           <p className="text-xs text-cbp-gold uppercase tracking-wider font-medium">{role}</p>
        </div>
      </div>
    </Card>
  );
};
