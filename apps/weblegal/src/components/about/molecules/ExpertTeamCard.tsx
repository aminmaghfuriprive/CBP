
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
    <Card className="text-center group bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 pt-10 pb-8 px-6" padding={false}>
      {/* Round Image Container */}
      <div className="w-40 h-40 mx-auto rounded-full overflow-hidden relative border-4 border-slate-50 dark:border-slate-800 shadow-lg mb-6 group-hover:border-cbp-gold transition-colors duration-300">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-cbp-navy dark:text-white leading-tight group-hover:text-cbp-gold transition-colors">
          {name}
        </h3>
        
        <div className="h-px w-12 bg-slate-200 dark:bg-slate-700 mx-auto my-3"></div>
        
        <p className="text-xs text-cbp-gold font-bold uppercase tracking-wider">
          {specialty}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {role}
        </p>
      </div>
    </Card>
  );
};
