
"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { DocumentList } from '../../../src/components/DocumentList';
import { DocumentUploadModal } from '../../../src/components/DocumentUploadModal';
import { Search, Folder, Upload } from 'lucide-react';

export default function DocumentsPage() {
  const { documents, addDocument, deleteDocument } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Semua', 'Kontrak', 'Litigasi', 'Bukti', 'Audit', 'Administrasi'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Dokumen</h1>
          <p className="text-slate-500 dark:text-slate-400">Repository digital berkas perkara dan administrasi.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Kategori */}
        <Card className="h-fit md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" padding={false}>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 font-bold text-cbp-navy dark:text-slate-200 text-sm uppercase tracking-wide">
            Kategori
          </div>
          <div className="p-2 space-y-1">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium flex items-center justify-between transition-all ${
                  activeCategory === cat 
                    ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-cbp-navy dark:hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Folder className={`h-4 w-4 ${activeCategory === cat ? 'text-cbp-gold dark:text-cbp-navy' : 'text-slate-400'}`} />
                  {cat}
                </span>
                {activeCategory === cat && <span className="text-xs bg-cbp-gold text-cbp-navy dark:bg-slate-900 dark:text-white px-1.5 rounded-full font-bold">{filteredDocs.length}</span>}
              </button>
            ))}
          </div>
        </Card>

        {/* List Dokumen */}
        <Card className="md:col-span-3 min-h-[500px] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" padding={false}>
          {/* Toolbar Pencarian */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 rounded-t-lg">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder={`Cari dokumen di ${activeCategory}...`}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 focus:border-cbp-navy dark:focus:border-cbp-gold transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto bg-white dark:bg-slate-900">
            <DocumentList documents={filteredDocs} onDelete={deleteDocument} />
          </div>
          
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 text-center bg-slate-50 dark:bg-slate-800/30 rounded-b-lg">
            Total {filteredDocs.length} dokumen ditampilkan
          </div>
        </Card>
      </div>

      {/* Upload Modal */}
      <DocumentUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUpload={addDocument} 
      />
    </div>
  );
}
