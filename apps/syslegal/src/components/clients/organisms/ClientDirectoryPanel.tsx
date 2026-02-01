
"use client";

import React, { useState, useMemo } from 'react';
import { ClientData } from '@cbp/core';
import { SearchInput, Button } from '@cbp/ui';
import { ClientDirectoryCard } from '../molecules/ClientDirectoryCard';
import { ChevronLeft, ChevronRight, UserPlus, Users } from 'lucide-react';

interface ClientDirectoryPanelProps {
  clients: ClientData[];
  selectedClientId: string | null;
  onSelect: (client: ClientData) => void;
  onAddNew?: () => void;
}

const ITEMS_PER_PAGE = 10;

export const ClientDirectoryPanel: React.FC<ClientDirectoryPanelProps> = ({ 
  clients, 
  selectedClientId, 
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
      
      {/* 1. Sticky Header & Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 space-y-3">
        <div className="flex justify-between items-center">
           <h2 className="font-bold text-cbp-navy dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
             <Users className="h-4 w-4" /> Direktori Klien
           </h2>
           <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
             {filteredClients.length} Total
           </span>
        </div>
        
        <SearchInput 
          placeholder="Cari nama, industri..." 
          value={searchTerm}
          onChange={handleSearch}
          className="shadow-sm"
        />
        
        {onAddNew && (
          <Button onClick={onAddNew} size="sm" variant="outline" className="w-full text-xs h-8 border-dashed">
            <UserPlus className="h-3 w-3 mr-1.5" /> Tambah Klien Baru
          </Button>
        )}
      </div>

      {/* 2. Client List */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50/50 dark:bg-slate-950/30">
        {paginatedClients.length > 0 ? (
          paginatedClients.map((client) => (
            <ClientDirectoryCard 
              key={client.id}
              client={client}
              isActive={selectedClientId === client.id}
              onClick={() => onSelect(client)}
            />
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            <p>Tidak ada data ditemukan.</p>
          </div>
        )}
      </div>

      {/* 3. Pagination Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
         <button 
           onClick={() => goToPage(currentPage - 1)}
           disabled={currentPage === 1}
           className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-400"
         >
           <ChevronLeft className="h-4 w-4" />
         </button>
         
         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
           Hal. {currentPage} / {totalPages || 1}
         </span>

         <button 
           onClick={() => goToPage(currentPage + 1)}
           disabled={currentPage === totalPages || totalPages === 0}
           className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-400"
         >
           <ChevronRight className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
};
