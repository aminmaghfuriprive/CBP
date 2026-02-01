
"use client";

import React, { useEffect, useRef } from 'react';
import { ClientData, CaseData, Invoice, DocumentFile, CalendarEvent } from '@cbp/core';
import { ClientViewMode } from '../molecules/ClientDirectoryCard';
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';
import { ClientStatsOverview } from '../molecules/ClientStatsOverview';
import { ClientContactInfo } from '../molecules/ClientContactInfo';
import { CaseTable } from '../../cases/molecules/CaseTable';
import { InvoiceTable } from '../../finance/molecules/InvoiceTable';
import { ClientDocumentManager } from './ClientDocumentManager';
import { AgendaTable } from '../../agenda/molecules/AgendaTable';
import { Card } from '@cbp/ui';

interface ClientWorkspacePanelProps {
  client: ClientData;
  activeView: ClientViewMode;
  cases: CaseData[];
  invoices: Invoice[];
  documents: DocumentFile[];
  events: CalendarEvent[];
  onViewCase: (id: string) => void;
}

export const ClientWorkspacePanel: React.FC<ClientWorkspacePanelProps> = ({
  client,
  activeView,
  cases,
  invoices,
  documents,
  events,
  onViewCase
}) => {
  // Ref untuk container scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect: Scroll to top saat tab view berubah
  // Note: Saat client berubah, komponen di-remount oleh parent (key prop), jadi otomatis scroll top = 0 default.
  // Effect ini khusus untuk perpindahan antar tab (Overview -> Kasus -> Dokumen)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'auto' }); // Instant jump ('auto') instead of 'smooth'
    }
  }, [activeView]); 

  // Filter Data Contextual
  const clientCases = cases.filter(c => c.clientName === client.name);
  const clientInvoices = invoices.filter(i => i.clientName === client.name);
  const clientEvents = events.filter(e => e.client === client.name);
  
  // Stats Calculation
  const totalCases = clientCases.length;
  const activeCasesCount = clientCases.filter(c => c.status === 'Aktif').length;
  const unpaidAmount = clientInvoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50 overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-6"
    >
      
      {/* Always Visible Header */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
         <ClientProfileHeader client={client} />
      </Card>

      {/* DYNAMIC CONTENT AREA BASED ON activeView */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* VIEW: OVERVIEW */}
        {activeView === 'overview' && (
          <div className="space-y-6">
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

        {/* VIEW: AGENDA (New) */}
        {activeView === 'agenda' && (
          <div className="space-y-4">
             <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Jadwal & Agenda</h3>
             {clientEvents.length > 0 ? (
               <AgendaTable events={clientEvents} />
             ) : (
               <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500">
                 Tidak ada agenda tercatat untuk klien ini.
               </div>
             )}
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
