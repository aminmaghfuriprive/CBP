
"use client";

import React, { useState } from 'react';
import { usePortfolioLogic, PortfolioItem } from '@cbp/core';
import { Card, Button, SearchInput, Badge } from '@cbp/ui';
import { Plus, Edit2, Trash2, Calendar, LayoutGrid, CheckCircle } from 'lucide-react';
import { PortfolioModal } from './PortfolioModal';

export const PortfolioManager: React.FC = () => {
  const { portfolios, addPortfolio, updatePortfolio, deletePortfolio } = usePortfolioLogic();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const categories = ['Semua', ...Array.from(new Set(portfolios.map(p => p.category)))] as string[];

  const filteredItems = portfolios.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
         <div className="flex gap-2 w-full md:w-auto">
            <div className="w-full md:w-64">
              <SearchInput 
                placeholder="Cari studi kasus..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
         </div>

         <Button onClick={handleAddNew} className="gap-2 w-full md:w-auto">
             <Plus className="h-4 w-4" /> Tambah Portofolio
         </Button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} padding={false} className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 group hover:shadow-lg transition-all duration-300">
            <div className="h-48 relative overflow-hidden rounded-t-xl">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <Badge variant="warning" className="shadow-lg text-[10px]">{item.category}</Badge>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {item.year}
                  </span>
                  {item.isFeatured && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Featured
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
                  {item.challenge}
                </p>
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(item)} className="text-slate-500 hover:text-cbp-navy dark:hover:text-white">
                      <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deletePortfolio(item.id)} className="text-slate-500 hover:text-red-600 dark:hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
         <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
           <p className="text-slate-500">Belum ada data portofolio.</p>
         </div>
      )}

      <PortfolioModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingItem) {
            updatePortfolio(data.id, data);
          } else {
            addPortfolio(data);
          }
        }}
        initialData={editingItem}
      />
    </div>
  );
};
