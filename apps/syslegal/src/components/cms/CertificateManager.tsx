
"use client";

import React, { useState } from 'react';
import { useCertificateLogic, CertificateItem } from '@cbp/core';
import { Card, Button, SearchInput } from '@cbp/ui';
import { Plus, Edit2, Trash2, Award } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const CertificateManager: React.FC = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useCertificateLogic();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CertificateItem | null>(null);

  const filteredItems = certificates.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: CertificateItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
         <div className="w-full sm:w-64">
            <SearchInput 
              placeholder="Cari sertifikat..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

         <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto">
             <Plus className="h-4 w-4" /> Tambah Sertifikat
         </Button>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} padding={false} className="group relative bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="aspect-[4/3] relative bg-slate-100 dark:bg-slate-800">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <Button size="sm" variant="secondary" onClick={() => handleEdit(item)} className="shadow-lg">
                      <Edit2 className="h-4 w-4" />
                   </Button>
                   <Button size="sm" className="bg-red-600 hover:bg-red-700 border-transparent text-white shadow-lg" onClick={() => deleteCertificate(item.id)}>
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
            </div>
            <div className="p-4">
                <div className="text-xs font-bold text-cbp-gold mb-1">{item.year}</div>
                <h4 className="font-bold text-cbp-navy dark:text-white text-sm line-clamp-2 leading-tight mb-1" title={item.title}>
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.issuer}</p>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
         <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center">
           <Award className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
           <p className="text-slate-500 text-sm">Belum ada sertifikat yang ditambahkan.</p>
         </div>
      )}

      <CertificateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingItem) {
            updateCertificate(data.id, data);
          } else {
            addCertificate(data);
          }
        }}
        initialData={editingItem}
      />
    </div>
  );
};
