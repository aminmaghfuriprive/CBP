
"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { PageHeader, StatCard, SearchInput } from '@cbp/ui';
import { Users, FileText, FolderOpen, Briefcase, LayoutGrid, List } from 'lucide-react';
import { ClientListView } from '../../../src/components/clients/ClientListView';
import { CaseListView } from '../../../src/components/cases/CaseListView';
import { DocumentRepositoryView } from '../../../src/components/documents/DocumentRepositoryView';
import { KanbanBoard } from '../../../src/components/cases/board/KanbanBoard';

export default function ClientDatabasePage() {
  const [activeTab, setActiveTab] = useState<'clients' | 'cases' | 'documents'>('clients');
  const [caseViewMode, setCaseViewMode] = useState<'list' | 'board'>('list');
  const [boardSearch, setBoardSearch] = useState('');
  
  const { cases, documents, clients } = useData();

  // Summary Stats untuk Header
  const activeCasesCount = cases.filter(c => c.status === 'Aktif').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex-shrink-0">
        <PageHeader 
          title="Database & Perkara" 
          subtitle="Pusat data klien, manajemen kasus, dan repository dokumen." 
        />

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
           <StatCard 
              label="Total Klien" 
              value={clients.length} 
              icon={Users} 
              variant="primary" 
           />
           <StatCard 
              label="Kasus Aktif" 
              value={activeCasesCount} 
              icon={Briefcase} 
              variant="success" 
           />
           <StatCard 
              label="Total Dokumen" 
              value={documents.length} 
              icon={FolderOpen} 
              variant="secondary" 
           />
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('clients')}
            className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
              activeTab === 'clients' 
                ? 'text-cbp-navy dark:text-cbp-gold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" /> Daftar Klien
            {activeTab === 'clients' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
          </button>

          <button
            onClick={() => setActiveTab('cases')}
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
            onClick={() => setActiveTab('documents')}
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
          <div className="flex flex-col h-full space-y-4">
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

        {activeTab === 'documents' && <DocumentRepositoryView />}
      </div>
    </div>
  );
}
