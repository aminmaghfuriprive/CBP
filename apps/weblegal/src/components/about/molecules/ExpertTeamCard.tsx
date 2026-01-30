
import React from 'react';
import Image from 'next/image';
import { Card } from '@cbp/ui';

interface ExpertTeamCardProps {
  name: string;
  role: string;
  specialty: string;
  imageUrl: string;
}

export const ExpertTeamCard: React.FC<ExpertTeamCardProps> = ({ name, role, specialty, imageUrl }) => {
  return (
    <Card className="text-center group bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500" padding={false}>
      <div className="aspect-[3/4] overflow-hidden relative border-b border-slate-200 dark:border-slate-800">
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-cbp-navy/10 group-hover:bg-transparent transition-colors z-10"></div>
        
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1 leading-tight group-hover:text-cbp-gold transition-colors">
          {name}
        </h3>
        <p className="text-xs text-cbp-gold font-bold uppercase tracking-wider mb-2">
          {role}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {specialty}
        </p>
      </div>
    </Card>
  );
};
