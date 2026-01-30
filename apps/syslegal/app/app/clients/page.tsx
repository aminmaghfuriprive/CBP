
"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { PageHeader, StatCard } from '@cbp/ui';
import { Users, FileText, FolderOpen, Briefcase } from 'lucide-react';
import { ClientListView } from '../../../src/components/clients/ClientListView';
import { CaseListView } from '../../../src/components/cases/CaseListView';
import { DocumentRepositoryView } from '../../../src/components/documents/DocumentRepositoryView';

export default function ClientDatabasePage() {
  const [activeTab, setActiveTab] = useState<'clients' | 'cases' | 'documents'>('clients');
  const { cases, documents, clients } = useData();

  // Summary Stats untuk Header
  const activeCasesCount = cases.filter(c => c.status === 'Aktif').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
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

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'clients' && <ClientListView />}
        {activeTab === 'cases' && <CaseListView />}
        {activeTab === 'documents' && <DocumentRepositoryView />}
      </div>
    </div>
  );
}
