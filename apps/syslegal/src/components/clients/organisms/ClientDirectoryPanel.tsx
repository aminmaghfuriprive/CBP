
"use client";

import React, { useState, useMemo } from 'react';
import { ClientData } from '@cbp/core';
import { SearchInput } from '@cbp/ui';
import { ClientDirectoryCard, ClientViewMode } from '../molecules/ClientDirectoryCard';
import { UserPlus, Users, Search } from 'lucide-react';

interface ClientDirectoryPanelProps {
  clients: ClientData[];
  selectedClientId: string | null;
  activeView: ClientViewMode;
  onSelect: (client: ClientData) => void;
  onViewChange: (view: ClientViewMode) => void;
  onAddNew?: () => void;
}

export const ClientDirectoryPanel: React.FC<ClientDirectoryPanelProps> = ({ 
  clients, 
  selectedClientId,
  activeView,
  onSelect,
  onViewChange,
  onAddNew 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
      
      {/* 1. Header & Search (Sticky Top) */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 space-y-3">
        <div className="flex justify-between items-center">
           <h2 className="font-bold text-cbp-navy dark:text-white text-sm flex items-center gap-2">
             <Users className="h-4 w-4 text-cbp-gold" /> Direktori Klien
           </h2>
        </div>
        
        <div className="flex gap-2">
          <SearchInput 
            placeholder="Cari klien..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow-sm flex-1"
          />
          {onAddNew && (
            <button 
              onClick={onAddNew} 
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-cbp-gold hover:bg-yellow-500 text-cbp-navy shadow-sm transition-colors"
              title="Tambah Klien Baru"
            >
              <UserPlus className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Client List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientDirectoryCard 
              key={client.id}
              client={client}
              isActive={selectedClientId === client.id}
              activeView={selectedClientId === client.id ? activeView : undefined}
              onSelect={() => onSelect(client)}
              onViewChange={onViewChange}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Search className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-xs">Tidak ada klien ditemukan.</p>
          </div>
        )}
      </div>
      
      {/* 3. Footer Stats */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-900">
         Menampilkan {filteredClients.length} dari {clients.length} klien
      </div>
    </div>
  );
};
