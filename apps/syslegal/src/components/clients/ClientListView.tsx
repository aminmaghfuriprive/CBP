
"use client";

import React, { useState, useMemo } from 'react';
import { useData, ClientData, useClientLogic } from '@cbp/core';
import { Button, SearchInput } from '@cbp/ui';
import { Download, Plus } from 'lucide-react';
import { ClientDetailModal } from './organisms/ClientDetailModal';
import { ClientTable } from './molecules/ClientTable';

export const ClientListView: React.FC = () => {
  const { clients } = useData();
  const { deleteClient } = useClientLogic();
  
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof ClientData; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc'
  });

  // Logic: Filtering & Sorting
  const processedClients = useMemo(() => {
    let result = [...clients];

    // 1. Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(lowerTerm) ||
        c.industry.toLowerCase().includes(lowerTerm) ||
        c.contact.toLowerCase().includes(lowerTerm)
      );
    }

    // 2. Sort
    result.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [clients, searchTerm, sortConfig]);

  const handleSort = (key: keyof ClientData) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data klien ini secara permanen?')) {
      deleteClient(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-full sm:w-72">
          <SearchInput 
            placeholder="Cari nama, industri, atau kontak..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700 w-full sm:w-auto">
            <Download className="h-4 w-4" /> Ekspor
          </Button>
          <Button size="sm" className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Tambah Klien
          </Button>
        </div>
      </div>

      {/* Interactive Table View */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <ClientTable 
          clients={processedClients}
          onSort={handleSort}
          sortConfig={sortConfig}
          onView={setSelectedClient}
          onDelete={handleDelete}
        />
        
        <div className="mt-4 text-xs text-slate-500 text-center">
          Menampilkan {processedClients.length} dari total {clients.length} klien
        </div>
      </div>

      <ClientDetailModal 
        isOpen={!!selectedClient} 
        onClose={() => setSelectedClient(null)} 
        client={selectedClient} 
      />
    </div>
  );
};
