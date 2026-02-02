
import React, { useMemo } from 'react';
import { ClientData, useData, useClientLogic } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Trash2, Edit, ExternalLink } from 'lucide-react';
import { ClientProfileHeader } from '../molecules/ClientProfileHeader';
import { ClientStatsOverview } from '../molecules/ClientStatsOverview';
import { ClientContactInfo } from '../molecules/ClientContactInfo';
import { ClientRecentCases } from '../molecules/ClientRecentCases';

interface ClientProfileViewProps {
  client: ClientData;
  onClose: () => void;
}

export const ClientProfileView: React.FC<ClientProfileViewProps> = ({ client, onClose }) => {
  const { cases, invoices } = useData();
  const { deleteClient } = useClientLogic();

  // Kalkulasi Statistik
  const stats = useMemo(() => {
    const clientCases = cases.filter(c => c.clientName === client.name);
    const clientInvoices = invoices.filter(i => i.clientName === client.name);
    
    return {
      clientCases,
      totalCases: clientCases.length,
      activeCases: clientCases.filter(c => c.status === 'Aktif').length,
      unpaidAmount: clientInvoices
        .filter(i => i.status !== 'Paid')
        .reduce((sum, i) => sum + i.amount, 0)
    };
  }, [client, cases, invoices]);

  const handleDelete = () => {
    if (confirm(`Yakin ingin menghapus data ${client.name}?`)) {
      deleteClient(client.id);
      onClose();
    }
  };

  return (
    <>
      <div className="px-8 py-8 space-y-8">
        <ClientProfileHeader client={client} />
        
        <ClientStatsOverview 
          totalCases={stats.totalCases} 
          activeCases={stats.activeCases} 
          unpaidAmount={stats.unpaidAmount} 
        />

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-cbp-navy dark:text-white uppercase tracking-wider">Informasi Kontak</h4>
          <ClientContactInfo client={client} />
        </div>

        <ClientRecentCases cases={stats.clientCases} />
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center mt-auto">
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
    </>
  );
};
