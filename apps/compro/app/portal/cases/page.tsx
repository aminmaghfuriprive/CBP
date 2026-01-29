"use client";

import React from 'react';
import { useData, useAuth } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { Calendar, FileText } from 'lucide-react';

export default function MyCasesPage() {
  const { user } = useAuth();
  const { cases } = useData();

  const myCases = cases.filter(c => c.clientName.includes(user?.name || ''));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Tracking Kasus</h1>
      
      {myCases.map((c) => (
        <Card key={c.id} className="border-l-4 border-l-cbp-gold">
          <div className="flex justify-between items-start mb-4">
             <div>
               <h3 className="text-lg font-bold text-cbp-navy dark:text-white">{c.caseType}</h3>
               <p className="text-sm text-slate-500 font-mono">{c.id}</p>
             </div>
             <Badge variant="success">{c.status}</Badge>
          </div>
          
          <div className="relative pt-6 pb-2">
             <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-cbp-gold" style={{width: c.currentStage.includes('produksi') ? '60%' : '30%'}}></div>
             </div>
             <div className="flex justify-between text-xs text-slate-500 mt-2">
               <span>Registrasi</span>
               <span className="font-bold text-cbp-navy dark:text-cbp-gold">{c.currentStage.replace(/_/g, ' ')}</span>
               <span>Selesai</span>
             </div>
          </div>

          <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-bold text-sm mb-2 text-cbp-navy dark:text-white">Catatan Progress</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">{c.description}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
               <Calendar className="h-3 w-3" /> Update: {c.lastUpdate}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}