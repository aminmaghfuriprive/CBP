
"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useData } from '@cbp/core';
import { Button, Card, Badge } from '@cbp/ui';
import { ArrowLeft, Check, Circle } from 'lucide-react';
import { OverviewTab, TimelineTab, DocumentsTab } from '../../../../src/components/CaseTabs';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { cases, events, documents } = useData();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Timeline' | 'Dokumen'>('Overview');

  // Handle params.id possibly being string or array
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const caseData = cases.find(c => c.id === id);

  if (!caseData) return <div className="p-8 text-center text-slate-500">Kasus tidak ditemukan</div>;

  const caseEvents = events.filter(e => e.client === caseData.clientName);
  // Mock logic: filter docs by category logic or random for demo
  const caseDocs = documents.slice(0, 3); 

  const tabs = ['Overview', 'Timeline', 'Dokumen'];

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center text-sm text-slate-500 hover:text-cbp-navy dark:text-slate-400 dark:hover:text-cbp-gold mb-2">
        <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
      </button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">{caseData.clientName}</h1>
             <Badge variant={caseData.status === 'Aktif' ? 'success' : 'neutral'}>{caseData.status}</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400">{caseData.caseType} • {caseData.division}</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm">Edit Kasus</Button>
           <Button size="sm">Update Status</Button>
        </div>
      </div>

      {/* Workflow Progress Bar (Simple Visual) */}
      <Card padding={false} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="p-4 min-w-[600px] flex items-center justify-between">
           {['Buka File', 'Produksi', 'Review', 'Selesai'].map((step, idx) => {
             // Mock progress logic
             const isCompleted = idx < 2; 
             const isCurrent = idx === 2;
             return (
               <div key={step} className="flex items-center gap-2">
                 <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                   isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-cbp-gold text-cbp-navy' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
                 }`}>
                   {isCompleted ? <Check className="h-3 w-3" /> : idx + 1}
                 </div>
                 <span className={`text-sm font-medium ${isCurrent ? 'text-cbp-navy dark:text-white' : 'text-slate-500'}`}>{step}</span>
                 {idx < 3 && <div className="w-12 h-0.5 bg-slate-200 dark:bg-slate-700 mx-2"></div>}
               </div>
             );
           })}
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === tab 
                  ? 'text-cbp-navy dark:text-cbp-gold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'Overview' && <OverviewTab caseData={caseData} />}
        {activeTab === 'Timeline' && <TimelineTab events={caseEvents} />}
        {activeTab === 'Dokumen' && <DocumentsTab docs={caseDocs} />}
      </div>
    </div>
  );
}
