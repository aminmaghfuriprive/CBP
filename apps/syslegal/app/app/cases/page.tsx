"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@cbp/core';
import { Card, Button, PageHeader, SearchInput, StatusBadge } from '@cbp/ui';
import { Plus, Filter, Eye } from 'lucide-react';

export default function CaseManagementPage() {
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manajemen Kasus" 
        subtitle="Pantau dan kelola seluruh perkara hukum."
        action={
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Kasus Baru
          </Button>
        }
      />

      <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-72">
            <SearchInput 
              placeholder="Cari klien atau kasus..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select 
              className="pl-3 pr-8 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg appearance-none outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20"
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Klien</th>
                <th className="px-6 py-4">Jenis Kasus</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Update</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCases.map((c) => (
                <tr key={c.id} onClick={() => router.push(`/app/cases/${c.id}`)} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-200">{c.clientName}</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{c.caseType}</td>
                  <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-6 py-4 text-slate-500">{c.lastUpdate}</td>
                  <td className="px-6 py-4 text-right"><Eye className="h-4 w-4 inline text-slate-400" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}