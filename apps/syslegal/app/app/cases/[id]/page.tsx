
"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useData, useCaseLogic, CaseLifecycle } from '@cbp/core';
import { Button, Card, Badge } from '@cbp/ui';
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { OverviewTab, TimelineTab, DocumentsTab } from '../../../../src/components/CaseTabs';
import { CaseAISummary } from '../../../../src/components/ai/CaseAISummary';
import { LegalDraftGenerator } from '../../../../src/components/ai/LegalDraftGenerator';
import { LifecycleStepper } from '../../../../src/components/cases/detail/LifecycleStepper';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Use Context for Data
  const { cases, events, documents } = useData();
  
  // Use Logic Hook explicitly for actions not exposed in context yet
  const { advanceLifecycle } = useCaseLogic(); 

  const [activeTab, setActiveTab] = useState<'Overview' | 'Timeline' | 'Dokumen' | 'AI Insights' | 'AI Drafter'>('Overview');
  const [isUpdating, setIsUpdating] = useState(false);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const caseData = cases.find(c => c.id === id);

  if (!caseData) return <div className="p-8 text-center text-slate-500">Kasus tidak ditemukan</div>;

  const caseEvents = events.filter(e => e.client === caseData.clientName);
  const caseDocs = documents.slice(0, 3); 

  const tabs = [
    { id: 'Overview', label: 'Ringkasan' },
    { id: 'Timeline', label: 'Timeline' },
    { id: 'Dokumen', label: 'Dokumen' },
    { id: 'AI Insights', label: 'AI Insights', icon: Sparkles },
    { id: 'AI Drafter', label: 'Smart Drafter', icon: Wand2 },
  ];

  // Handler untuk memajukan fase
  const handleAdvance = async () => {
    const nextMap: Record<CaseLifecycle, CaseLifecycle | null> = {
      'PRE_PRODUCTION': 'PRODUCTION',
      'PRODUCTION': 'POST_PRODUCTION',
      'POST_PRODUCTION': 'ARCHIVED',
      'ARCHIVED': null
    };

    const nextStage = nextMap[caseData.lifecycle];
    if (nextStage) {
      setIsUpdating(true);
      await advanceLifecycle(caseData.id, nextStage);
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <button onClick={() => router.back()} className="flex items-center text-sm text-slate-500 hover:text-cbp-navy dark:text-slate-400 dark:hover:text-cbp-gold mb-2">
        <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
      </button>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">{caseData.clientName}</h1>
             <Badge variant={caseData.status === 'Aktif' ? 'success' : 'neutral'}>{caseData.status}</Badge>
          </div>
          <p className="text-slate-500 dark:text-slate-400">{caseData.caseType} • {caseData.division}</p>
        </div>
      </div>

      {/* Lifecycle Stepper (New Component) */}
      <Card className="bg-white dark:bg-slate-900 mb-6">
        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4">Lifecycle Status</h3>
        <LifecycleStepper 
          currentStage={caseData.lifecycle || 'PRODUCTION'} 
          onAdvance={handleAdvance}
          isUpdating={isUpdating}
        />
      </Card>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 text-sm font-bold transition-all relative whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'text-cbp-navy dark:text-cbp-gold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon && <tab.icon className={`h-3.5 w-3.5 ${activeTab === tab.id ? 'text-cbp-gold' : 'text-slate-400'}`} />}
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[400px]">
        {activeTab === 'Overview' && <OverviewTab caseData={caseData} />}
        {activeTab === 'Timeline' && <TimelineTab events={caseEvents} />}
        {activeTab === 'Dokumen' && <DocumentsTab docs={caseDocs} />}
        {activeTab === 'AI Insights' && <CaseAISummary caseData={caseData} />}
        {activeTab === 'AI Drafter' && <LegalDraftGenerator caseData={caseData} />}
      </div>
    </div>
  );
}
