
"use client";

import React from 'react';
import { ClientData, CaseData, Invoice, DocumentFile } from '@cbp/core';
import { ClientViewMode } from '../molecules/ClientDirectoryCard';
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';
import { ClientStatsOverview } from '../molecules/ClientStatsOverview';
import { ClientContactInfo } from '../molecules/ClientContactInfo';
import { CaseTable } from '../../cases/molecules/CaseTable';
import { InvoiceTable } from '../../finance/molecules/InvoiceTable';
import { ClientDocumentManager } from './ClientDocumentManager';
import { Card } from '@cbp/ui';

interface ClientWorkspacePanelProps {
  client: ClientData;
  activeView: ClientViewMode;
  cases: CaseData[];
  invoices: Invoice[];
  documents: DocumentFile[];
  onViewCase: (id: string) => void;
}

export const ClientWorkspacePanel: React.FC<ClientWorkspacePanelProps> = ({
  client,
  activeView,
  cases,
  invoices,
  documents,
  onViewCase
}) => {
  // Filter Data Contextual
  const clientCases = cases.filter(c => c.clientName === client.name);
  const clientInvoices = invoices.filter(i => i.clientName === client.name);
  
  // Stats Calculation
  const totalCases = clientCases.length;
  const activeCasesCount = clientCases.filter(c => c.status === 'Aktif').length;
  const unpaidAmount = clientInvoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-6">
      
      {/* Always Visible Header */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
         <ClientProfileHeader client={client} />
      </Card>

      {/* DYNAMIC CONTENT AREA BASED ON activeView */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* VIEW: OVERVIEW */}
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            <div className="lg:col-span-1">
               <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col">
                  <h3 className="font-bold text-slate-700 dark:text-white mb-4">Aktivitas Terakhir</h3>
                  {clientCases.length > 0 ? (
                    <div className="flex-1 overflow-auto -mx-2 px-2">
                       <CaseTable cases={clientCases.slice(0, 3)} onView={onViewCase} />
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm italic">Belum ada aktivitas kasus.</p>
                  )}
               </Card>
            </div>
          </div>
        )}

        {/* VIEW: CASES */}
        {activeView === 'cases' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Daftar Perkara</h3>
             </div>
             <CaseTable cases={clientCases} onView={onViewCase} />
          </div>
        )}

        {/* VIEW: DOCUMENTS */}
        {activeView === 'documents' && (
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

        {/* VIEW: BILLING */}
        {activeView === 'billing' && (
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
