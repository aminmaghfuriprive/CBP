
"use client";

import React from 'react';
import { ClientData, useData, useClientLogic } from '@cbp/core';
import { X, Trash2, Edit, ExternalLink } from 'lucide-react';
import { Button } from '@cbp/ui';
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';
import { ClientContactInfo } from '../molecules/ClientContactInfo';
import { ClientStatsOverview } from '../molecules/ClientStatsOverview';

interface ClientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientData | null;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ isOpen, onClose, client }) => {
  const { cases, invoices } = useData();
  const { deleteClient } = useClientLogic();

  if (!isOpen || !client) return null;

  // Logic: Calculate Stats specifically for this client
  const clientCases = cases.filter(c => c.clientName === client.name);
  const clientInvoices = invoices.filter(i => i.clientName === client.name);
  
  const totalCases = clientCases.length;
  const activeCases = clientCases.filter(c => c.status === 'Aktif').length;
  const unpaidAmount = clientInvoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const handleDelete = () => {
    if (confirm(`Yakin ingin menghapus data ${client.name}?`)) {
      deleteClient(client.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        {/* Header Actions */}
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-8 pb-8 overflow-y-auto custom-scrollbar space-y-8">
          
          <ClientProfileHeader client={client} />
          
          <ClientStatsOverview 
            totalCases={totalCases} 
            activeCases={activeCases} 
            unpaidAmount={unpaidAmount} 
          />

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cbp-navy dark:text-white uppercase tracking-wider">Informasi Kontak</h4>
            <ClientContactInfo client={client} />
          </div>

          {/* Related Cases Preview (Optional Expansion) */}
          {clientCases.length > 0 && (
             <div className="space-y-3">
               <h4 className="text-sm font-bold text-cbp-navy dark:text-white uppercase tracking-wider">Riwayat Kasus Terbaru</h4>
               <div className="space-y-2">
                 {clientCases.slice(0, 3).map(c => (
                   <div key={c.id} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.caseType}</p>
                        <p className="text-xs text-slate-500">{c.currentStage.replace(/_/g, ' ')}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${c.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {c.status}
                      </span>
                   </div>
                 ))}
               </div>
             </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
           <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={handleDelete}>
             <Trash2 className="h-4 w-4 mr-2" /> Hapus Klien
           </Button>
           <div className="flex gap-3">
             <Button variant="outline" className="gap-2">
               <Edit className="h-4 w-4" /> Edit Profil
             </Button>
             <Button className="gap-2">
               <ExternalLink className="h-4 w-4" /> Buka File Lengkap
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
};
