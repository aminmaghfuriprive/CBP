
import React from 'react';
import { ClientData } from '@cbp/core';
import { ChevronRight, Phone } from 'lucide-react';

interface ClientDirectoryCardProps {
  client: ClientData;
  isActive: boolean;
  onClick: () => void;
}

export const ClientDirectoryCard: React.FC<ClientDirectoryCardProps> = ({ client, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-blue-50/50 dark:bg-slate-800/80 border-l-4 border-l-cbp-navy dark:border-l-cbp-gold' 
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-white dark:bg-slate-900 border-l-4 border-l-transparent'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Avatar / Initial */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border
          ${isActive 
            ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy border-transparent' 
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }
        `}>
          {client.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <h4 className={`text-sm truncate font-bold pr-2 ${isActive ? 'text-cbp-navy dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
              {client.name}
            </h4>
          </div>
          
          <div className="flex flex-col gap-0.5">
             <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 truncate">
               {client.industry}
             </span>
             <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
               <Phone className="h-2.5 w-2.5" /> {client.contact}
             </div>
          </div>
        </div>

        {/* Action Indicator (Visible on Active/Hover) */}
        <div className={`
          flex-shrink-0 transition-opacity duration-200
          ${isActive ? 'opacity-100 text-cbp-navy dark:text-cbp-gold' : 'opacity-0 group-hover:opacity-100 text-slate-400'}
        `}>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
