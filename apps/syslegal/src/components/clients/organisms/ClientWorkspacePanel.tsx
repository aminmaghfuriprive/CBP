
"use client";

import React, { useState } from 'react';
import { ClientData, CaseData, Invoice, DocumentFile } from '@cbp/core';
import { ArrowLeft, LayoutGrid, FileText, FolderOpen, DollarSign } from 'lucide-react';
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';
import { ClientStatsOverview } from '../molecules/ClientStatsOverview';
import { ClientContactInfo } from '../molecules/ClientContactInfo';
import { CaseTable } from '../../cases/molecules/CaseTable';
import { InvoiceTable } from '../../finance/molecules/InvoiceTable';
import { ClientDocumentManager } from './ClientDocumentManager';

interface ClientWorkspacePanelProps {
  client: ClientData;
  cases: CaseData[];
  invoices: Invoice[];
  documents: DocumentFile[];
  onBack: () => void;
  onViewCase: (id: string) => void;
}

export const ClientWorkspacePanel: React.FC<ClientWorkspacePanelProps> = ({
  client,
  cases,
  invoices,
  documents,
  onBack,
  onViewCase
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cases' | 'documents' | 'billing'>('overview');

  // Filter Data Contextual
  const clientCases = cases.filter(c => c.clientName === client.name);
  const clientInvoices = invoices.filter(i => i.clientName === client.name);
  
  // Stats Calculation
  const totalCases = clientCases.length;
  const activeCasesCount = clientCases.filter(c => c.status === 'Aktif').length;
  const unpaidAmount = clientInvoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  // Tab Definitions
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'cases', label: `Riwayat Kasus (${totalCases})`, icon: FileText },
    { id: 'documents', label: 'Dokumen & Validasi', icon: FolderOpen },
    { id: 'billing', label: 'Keuangan', icon: DollarSign },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 relative">
      {/* 1. Workspace Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cbp-navy dark:hover:text-cbp-gold mb-4 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Kembali ke Dashboard
        </button>
        
        <ClientProfileHeader client={client} />

        {/* Internal Tabs Navigation */}
        <div className="flex gap-6 mt-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-cbp-navy dark:text-cbp-gold' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-cbp-gold' : 'text-slate-400'}`} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cbp-gold rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Workspace Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/50 custom-scrollbar animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 max-w-4xl">
            <ClientStatsOverview 
              totalCases={totalCases} 
              activeCases={activeCasesCount} 
              unpaidAmount={unpaidAmount} 
            />
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Detail Kontak</h3>
              <ClientContactInfo client={client} />
            </div>

            {clientCases.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Aktivitas Terakhir</h3>
                   <button onClick={() => setActiveTab('cases')} className="text-xs font-bold text-cbp-navy dark:text-cbp-gold hover:underline">Lihat Semua</button>
                </div>
                <CaseTable cases={clientCases.slice(0, 3)} onView={onViewCase} />
              </div>
            )}
          </div>
        )}

        {/* TAB: CASES */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
             <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Daftar Perkara</h3>
             </div>
             <CaseTable cases={clientCases} onView={onViewCase} />
          </div>
        )}

        {/* TAB: DOCUMENTS (VALIDATION) */}
        {activeTab === 'documents' && (
          <div className="space-y-4 max-w-5xl">
             <div className="mb-4">
               <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Repository & Validasi</h3>
               <p className="text-sm text-slate-500">Kelola dan validasi dokumen yang diunggah oleh klien.</p>
             </div>
             <ClientDocumentManager 
               clientId={client.id} 
               clientName={client.name} 
               documents={documents} 
             />
          </div>
        )}

        {/* TAB: BILLING */}
        {activeTab === 'billing' && (
          <div className="space-y-4">
             <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Riwayat Keuangan</h3>
             <InvoiceTable 
               invoices={clientInvoices} 
               onMarkPaid={() => {}} // Read only in this view or implement mark paid logic
             />
          </div>
        )}

      </div>
    </div>
  );
};
