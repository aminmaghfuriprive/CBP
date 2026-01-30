
"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useServiceLogic, ServiceItem } from '@cbp/core';
import { Button, SearchInput } from '@cbp/ui';
import { Plus } from 'lucide-react';
import { ServiceTable } from './molecules/ServiceTable';

export const ServiceListView: React.FC = () => {
  const { services, deleteService } = useServiceLogic();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDivision, setFilterDivision] = useState('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof ServiceItem; direction: 'asc' | 'desc' }>({
    key: 'title',
    direction: 'asc'
  });

  const handleAddNew = () => {
    router.push('/app/services/create');
  };

  const handleView = (id: string) => {
    router.push(`/app/services/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      deleteService(id);
    }
  };

  const handleSort = (key: keyof ServiceItem) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Logic: Filter & Sort
  const processedServices = useMemo(() => {
    let result = [...services];

    // 1. Search Filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(s => s.title.toLowerCase().includes(lower));
    }

    // 2. Division Filter
    if (filterDivision !== 'All') {
      result = result.filter(s => s.division === filterDivision);
    }

    // 3. Sorting
    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return result;
  }, [services, searchTerm, filterDivision, sortConfig]);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchInput 
              placeholder="Cari layanan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:text-white cursor-pointer max-w-[150px]"
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
          >
            <option value="All">Semua Divisi</option>
            <option value="Hukum Umum & Litigasi">Litigasi</option>
            <option value="Perizinan & Bisnis">Perizinan</option>
            <option value="Pertanahan & Agraria">Pertanahan</option>
            <option value="Legal Administratif & Korporasi">Korporasi</option>
          </select>
        </div>
        <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto">
           <Plus className="h-4 w-4" /> Tambah Layanan
        </Button>
      </div>

      {/* Table Component */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <ServiceTable 
          services={processedServices}
          onSort={handleSort}
          sortConfig={sortConfig}
          onView={handleView}
          onDelete={handleDelete}
        />
        
        <div className="mt-4 text-xs text-slate-500 text-center">
          Menampilkan {processedServices.length} dari total {services.length} layanan
        </div>
      </div>
    </div>
  );
};
