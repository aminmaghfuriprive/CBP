
"use client";

import React, { useState } from 'react';
import { useRegulationLogic, RegulationItem } from '@cbp/core';
import { Button, SearchInput } from '@cbp/ui';
import { Plus, Library } from 'lucide-react';
import { RegulationTable } from './molecules/RegulationTable';
import { RegulationUploadModal } from './molecules/RegulationUploadModal';

export const RegulationManager: React.FC = () => {
  const { regulations, addRegulation, updateRegulation, deleteRegulation } = useRegulationLogic();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RegulationItem | null>(null);
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Logic: Unique Categories for Filter
  const categories = ['Semua', ...Array.from(new Set(regulations.map(r => r.category)))];

  // Logic: Filtering
  const filteredRegulations = regulations.filter(reg => {
    const matchesSearch = reg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.number.includes(searchTerm);
    const matchesCategory = filterCategory === 'Semua' || reg.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item: RegulationItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex-shrink-0">
         <div className="flex gap-2 w-full md:w-auto">
            <div className="w-full md:w-72">
              <SearchInput 
                placeholder="Cari UU, PP, atau Judul..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:text-white cursor-pointer"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
         </div>

         <div className="flex gap-3 w-full md:w-auto">
            <Button onClick={handleAddNew} className="gap-2 w-full md:w-auto shadow-lg shadow-cbp-navy/10">
               <Plus className="h-4 w-4" /> Upload Regulasi
            </Button>
         </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
         <RegulationTable 
           regulations={filteredRegulations}
           onEdit={handleEdit}
           onDelete={deleteRegulation}
         />
      </div>

      {/* Upload Modal */}
      <RegulationUploadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingItem) {
            updateRegulation(data.id, data);
          } else {
            addRegulation(data);
          }
        }}
        initialData={editingItem}
      />
    </div>
  );
};
