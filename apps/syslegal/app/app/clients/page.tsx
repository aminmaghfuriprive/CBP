
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useData, useDocumentLogic } from '@cbp/core';
import { PageHeader, SearchInput } from '@cbp/ui';
import { Users, FileText, FolderOpen, LayoutGrid, List, Calendar, ShieldCheck } from 'lucide-react';
import { ClientListView } from '../../../src/components/clients/ClientListView';
import { CaseListView } from '../../../src/components/cases/CaseListView';
import { DocumentRepositoryView } from '../../../src/components/documents/DocumentRepositoryView';
import { KanbanBoard } from '../../../src/components/cases/board/KanbanBoard';
import { ScheduleView } from '../../../src/components/agenda/ScheduleView';
import { DocumentVerificationList } from '../../../src/components/verification/DocumentVerificationList';

type TabView = 'clients' | 'cases' | 'agenda' | 'documents' | 'verification';

export default function ClientDatabasePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. Initialize Tab from URL or Default
  const initialTab = (searchParams.get('view') as TabView) || 'clients';
  const [activeTab, setActiveTab] = useState<TabView>(initialTab);
  
  const [caseViewMode, setCaseViewMode] = useState<'list' | 'board'>('list');
  const [boardSearch, setBoardSearch] = useState('');
  
  const { cases, events } = useData();
  const { documents: allDocs } = useDocumentLogic();

  // 2. Sync State when URL Changes (Back/Forward navigation)
  useEffect(() => {
    const view = searchParams.get('view') as TabView;
    if (view && ['clients', 'cases', 'agenda', 'documents', 'verification'].includes(view)) {
      setActiveTab(view);
    }
  }, [searchParams]);

  // 3. Update URL when Tab Changes
  const handleTabChange = (tab: TabView) => {
    setActiveTab(tab);
    router.push(`/app/clients?view=${tab}`, { scroll: false });
  };

  // Pending Document Verification Count
  const pendingDocs = allDocs.filter(d => d.status === 'Pending' || (d.uploadedBy === 'Client' && !d.status)).length;

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0 px-1">
        <PageHeader 
          title="Database & Perkara" 
          subtitle="Pusat data klien, manajemen kasus, agenda sidang, dan repository dokumen." 
        />

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleTabChange('clients')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
              activeTab === 'clients' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" /> Direktori Klien
            {activeTab === 'clients' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>

          <button
            onClick={() => handleTabChange('cases')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
              activeTab === 'cases' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" /> Semua Kasus
            {activeTab === 'cases' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>

          <button
            onClick={() => handleTabChange('agenda')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
              activeTab === 'agenda' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="h-4 w-4" /> Agenda & Sidang
            {activeTab === 'agenda' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>

          <button
            onClick={() => handleTabChange('verification')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
              activeTab === 'verification' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" /> Validasi Berkas
            {pendingDocs > 0 && (
              <span className="h-5 w-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px]">
                {pendingDocs}
              </span>
            )}
            {activeTab === 'verification' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>

          <button
            onClick={() => handleTabChange('documents')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
              activeTab === 'documents' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FolderOpen className="h-4 w-4" /> Repository Dokumen
            {activeTab === 'documents' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'clients' && <ClientListView />}
        
        {activeTab === 'cases' && (
          <div className="flex flex-col h-full space-y-4 max-w-7xl mx-auto">
             {/* View Switcher & Search for Board Mode */}
             <div className="flex justify-between items-center">
                {caseViewMode === 'board' ? (
                  <div className="w-full max-w-md">
                    <SearchInput 
                      placeholder="Cari kartu kasus..." 
                      value={boardSearch}
                      onChange={(e) => setBoardSearch(e.target.value)}
                      className="bg-white dark:bg-slate-900 shadow-sm"
                    />
                  </div>
                ) : <div></div>}

                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex gap-1 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setCaseViewMode('list')}
                    title="List View"
                    className={`p-2 rounded-md transition-all ${caseViewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCaseViewMode('board')}
                    title="Kanban Board"
                    className={`p-2 rounded-md transition-all ${caseViewMode === 'board' ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
               </div>
             </div>

             {caseViewMode === 'list' ? (
                <CaseListView />
             ) : (
                <div className="flex-1 min-h-0 overflow-hidden">
                   <KanbanBoard searchTerm={boardSearch} />
                </div>
             )}
          </div>
        )}

        {activeTab === 'agenda' && (
          <div className="max-w-7xl mx-auto">
            <ScheduleView />
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="max-w-7xl mx-auto">
            <DocumentVerificationList />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="max-w-7xl mx-auto">
            <DocumentRepositoryView />
          </div>
        )}
      </div>
    </div>
  );
}
