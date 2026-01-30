
import React from 'react';
import { useData } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { User, Briefcase, Calendar, DollarSign, PlusCircle, AlertCircle } from 'lucide-react';

export const ContextPanel: React.FC = () => {
  const { currentContext } = useData();

  if (!currentContext) {
    return (
      <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hidden lg:flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
           <User className="h-8 w-8 text-slate-300" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Pilih percakapan untuk melihat detail klien.</p>
      </div>
    );
  }

  const { client, activeCases, conversation } = currentContext;

  return (
    <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full hidden lg:flex">
      
      {/* 1. Client Profile Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 text-center">
        <div className="h-20 w-20 mx-auto rounded-full bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy flex items-center justify-center text-2xl font-bold font-serif mb-4 shadow-lg">
          {client ? client.name.charAt(0) : conversation.contactName.charAt(0)}
        </div>
        <h3 className="font-bold text-lg text-cbp-navy dark:text-white leading-tight">
          {client ? client.name : conversation.contactName}
        </h3>
        
        {client ? (
          <div className="mt-2">
             <Badge variant="success" className="text-[10px]">Client Terdaftar</Badge>
             <p className="text-xs text-slate-500 mt-2">{client.industry}</p>
          </div>
        ) : (
          <div className="mt-2 space-y-2">
             <Badge variant="warning" className="text-[10px]">Potential Lead</Badge>
             <Button size="sm" variant="outline" className="w-full mt-2 text-xs h-8 border-dashed">
               <PlusCircle className="h-3 w-3 mr-1" /> Add to Contacts
             </Button>
          </div>
        )}
      </div>

      {/* 2. Active Cases List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
             <Briefcase className="h-3 w-3" /> Kasus Aktif
           </h4>
           
           {activeCases && activeCases.length > 0 ? (
             <div className="space-y-3">
               {activeCases.map(c => (
                 <Card key={c.id} padding={false} className="p-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                         {c.caseType}
                       </span>
                       {c.status === 'Aktif' && <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400">
                       Stage: {c.currentStage.replace(/_/g, ' ')}
                    </div>
                 </Card>
               ))}
             </div>
           ) : (
             <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                <p className="text-xs text-slate-400">Tidak ada kasus aktif.</p>
             </div>
           )}
        </div>

        {/* 3. Tags & Meta */}
        <div>
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tags</h4>
           <div className="flex flex-wrap gap-2">
              {conversation.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md">
                  #{tag}
                </span>
              ))}
              <button className="px-2 py-1 border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-xs rounded-md hover:text-cbp-navy dark:hover:text-white transition-colors">+</button>
           </div>
        </div>
      </div>

      {/* 4. Quick Actions (Bottom) */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-2">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Actions</h4>
         <Button className="w-full justify-start gap-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm h-10">
            <Calendar className="h-4 w-4 text-blue-500" /> Buat Jadwal Konsultasi
         </Button>
         <Button className="w-full justify-start gap-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm h-10">
            <DollarSign className="h-4 w-4 text-green-500" /> Buat Invoice Cepat
         </Button>
         <Button className="w-full justify-start gap-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm h-10">
            <AlertCircle className="h-4 w-4 text-red-500" /> Buat Tiket Kasus Baru
         </Button>
      </div>
    </div>
  );
};
