
"use client";

import React, { useState } from 'react';
import { ClientData, CaseData, Invoice, DocumentFile } from '@cbp/core';
import { ArrowLeft, LayoutGrid, FileText, FolderOpen, DollarSign } from 'lucide-react';
import { Button, Card } from '@cbp/ui';
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

  const tabs = [
    { id: 'overview', label: 'Ringkasan Profil', icon: LayoutGrid },
    { id: 'cases', label: `Riwayat Kasus (${totalCases})`, icon: FileText },
    { id: 'documents', label: 'Dokumen & Validasi', icon: FolderOpen },
    { id: 'billing', label: 'Keuangan', icon: DollarSign },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-20">
      
      {/* 1. TOP BAR: Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-cbp-navy dark:hover:border-cbp-gold transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Direktori
        </Button>
      </div>

      {/* 2. CLIENT HEADER CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="p-6 md:p-8">
            <ClientProfileHeader client={client} />
         </div>
         
         {/* STICKY TABS */}
         <div className="px-6 md:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 sticky top-0 z-20 overflow-x-auto no-scrollbar">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'border-cbp-navy text-cbp-navy dark:border-cbp-gold dark:text-cbp-gold' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}
                  `}
                >
                  <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-cbp-gold' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              ))}
            </div>
         </div>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Stats & Contact */}
            <div className="lg:col-span-2 space-y-6">
               <ClientStatsOverview 
                  totalCases={totalCases} 
                  activeCases={activeCasesCount} 
                  unpaidAmount={unpaidAmount} 
               />
               
               <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-4">Informasi Kontak</h3>
                  <ClientContactInfo client={client} />
               </Card>
            </div>

            {/* Right: Quick Activity */}
            <div className="lg:col-span-1">
               <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-slate-700 dark:text-white">Aktivitas Terakhir</h3>
                     <button onClick={() => setActiveTab('cases')} className="text-xs font-bold text-cbp-gold hover:underline">Lihat Semua</button>
                  </div>
                  {clientCases.length > 0 ? (
                    <CaseTable cases={clientCases.slice(0, 3)} onView={onViewCase} />
                  ) : (
                    <p className="text-slate-500 text-sm italic">Belum ada aktivitas kasus.</p>
                  )}
               </Card>
            </div>
          </div>
        )}

        {/* TAB: CASES */}
        {activeTab === 'cases' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Daftar Perkara</h3>
             </div>
             <CaseTable cases={clientCases} onView={onViewCase} />
          </div>
        )}

        {/* TAB: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
             <div className="mb-6">
               <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Repository & Validasi</h3>
               <p className="text-sm text-slate-500 mt-1">Kelola dan validasi dokumen yang diunggah oleh klien ini.</p>
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
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
             <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-6">Riwayat Keuangan</h3>
             <InvoiceTable 
               invoices={clientInvoices} 
               onMarkPaid={() => {}} 
             />
          </div>
        )}

      </div>
    </div>
  );
};
