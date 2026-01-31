
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@cbp/core';
import { Button, SearchInput } from '@cbp/ui';
import { Plus, Filter } from 'lucide-react';
import { CaseTable } from './molecules/CaseTable';

export const CaseListView: React.FC = () => {
  const { cases } = useData();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredCases = cases.filter(c => {
    const matchesFilter = filter === 'All' || c.status === filter;
    const matchesSearch = c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.caseType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewCase = (id: string) => {
    router.push(`/app/cases/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
         <div className="flex gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <SearchInput 
                placeholder="Cari klien atau kasus..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="pl-3 pr-8 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg appearance-none outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 cursor-pointer h-full"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Selesai">Selesai</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500 pointer-events-none" />
            </div>
         </div>
         <Button className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Registrasi Kasus
         </Button>
      </div>

      {/* Atomic Table */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <CaseTable cases={filteredCases} onView={handleViewCase} />
        
        <div className="mt-4 text-xs text-slate-500 text-center">
          Menampilkan {filteredCases.length} dari total {cases.length} perkara
        </div>
      </div>
    </div>
  );
};
