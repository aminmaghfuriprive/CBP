
import React from 'react';
import { ClientData } from '@cbp/core';
import { ShieldCheck } from 'lucide-react';

interface ClientProfileHeaderProps {
  client: ClientData;
}

export const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({ client }) => {
  return (
    <div className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
      <div className="h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-lg">
        <span className="text-3xl font-serif font-bold text-cbp-navy dark:text-cbp-gold">
          {client.name.charAt(0)}
        </span>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            {client.industry}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-900">
            <ShieldCheck className="h-3 w-3" /> Terverifikasi
          </span>
        </div>
        <h2 className="text-2xl font-bold text-cbp-navy dark:text-white leading-tight">
          {client.name}
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">ID: {client.id.toUpperCase()}</p>
      </div>
    </div>
  );
};
