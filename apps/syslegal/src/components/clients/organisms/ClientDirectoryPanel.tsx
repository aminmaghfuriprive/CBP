
"use client";

import React, { useState, useMemo } from 'react';
import { ClientData } from '@cbp/core';
import { SearchInput, Button } from '@cbp/ui';
import { ClientDirectoryCard } from '../molecules/ClientDirectoryCard';
import { ChevronLeft, ChevronRight, UserPlus, Users, Search } from 'lucide-react';

interface ClientDirectoryPanelProps {
  clients: ClientData[];
  selectedClientId: string | null;
  onSelect: (client: ClientData) => void;
  onAddNew?: () => void;
}

const ITEMS_PER_PAGE = 12; // Menambah jumlah item karena Grid

export const ClientDirectoryPanel: React.FC<ClientDirectoryPanelProps> = ({ 
  clients, 
  onSelect,
  onAddNew 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredClients.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredClients, currentPage]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-10">
        <div className="w-full md:w-auto">
           <h2 className="font-bold text-cbp-navy dark:text-white text-lg flex items-center gap-2">
             <Users className="h-5 w-5 text-cbp-gold" /> Direktori Klien
             <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full ml-2">
               {filteredClients.length}
             </span>
           </h2>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="w-full md:w-72">
            <SearchInput 
              placeholder="Cari nama, industri, kontak..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="shadow-sm"
            />
          </div>
          {onAddNew && (
            <Button onClick={onAddNew} className="whitespace-nowrap gap-2">
              <UserPlus className="h-4 w-4" /> <span className="hidden sm:inline">Klien Baru</span>
            </Button>
          )}
        </div>
      </div>

      {/* 2. Client Grid */}
      {paginatedClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedClients.map((client) => (
            <div key={client.id} className="h-full">
              <ClientDirectoryCard 
                client={client}
                isActive={false} // Selalu false di grid view
                onClick={() => onSelect(client)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Search className="h-12 w-12 text-slate-300 mb-3" />
          <p className="text-slate-500 dark:text-slate-400">Tidak ada klien ditemukan.</p>
        </div>
      )}

      {/* 3. Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
           <button 
             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
             disabled={currentPage === 1}
             className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 transition-colors"
           >
             <ChevronLeft className="h-5 w-5" />
           </button>
           
           <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
             Halaman {currentPage} dari {totalPages}
           </span>

           <button 
             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
             disabled={currentPage === totalPages}
             className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 transition-colors"
           >
             <ChevronRight className="h-5 w-5" />
           </button>
        </div>
      )}
    </div>
  );
};
