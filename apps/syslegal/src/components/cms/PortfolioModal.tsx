
"use client";

import React, { useState, useEffect } from 'react';
import { X, Briefcase, Target, Trophy, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@cbp/ui';
import { PortfolioItem, ServiceDivision } from '@cbp/core';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
  initialData?: PortfolioItem | null;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Hukum Umum & Litigasi',
    clientIndustry: '',
    year: new Date().getFullYear().toString(),
    challenge: '',
    solution: '',
    result: '',
    imageUrl: '',
    isFeatured: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        category: 'Hukum Umum & Litigasi',
        clientIndustry: '',
        year: new Date().getFullYear().toString(),
        challenge: '',
        solution: '',
        result: '',
        imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random()*1000)}?auto=format&fit=crop&q=80&w=1000`,
        isFeatured: false
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave: PortfolioItem = {
      id: initialData?.id || `pf_${Date.now()}`,
      title: formData.title || '',
      category: formData.category as ServiceDivision,
      clientIndustry: formData.clientIndustry || '',
      year: formData.year || '',
      challenge: formData.challenge || '',
      solution: formData.solution || '',
      result: formData.result || '',
      imageUrl: formData.imageUrl || '',
      isFeatured: formData.isFeatured
    };
    onSave(itemToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-cbp-navy dark:text-white text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-cbp-gold" />
            {initialData ? 'Edit Studi Kasus' : 'Tambah Portofolio Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="col-span-2">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Judul Kasus</label>
               <input 
                 required
                 className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                 value={formData.title}
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                 placeholder="Contoh: Sengketa Lahan Kawasan Industri"
               />
             </div>

             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Kategori Divisi</label>
                <select 
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as ServiceDivision})}
                >
                  <option value="Hukum Umum & Litigasi">Hukum Umum & Litigasi</option>
                  <option value="Perizinan & Bisnis">Perizinan & Bisnis</option>
                  <option value="Pertanahan & Agraria">Pertanahan & Agraria</option>
                  <option value="Legal Administratif & Korporasi">Korporasi</option>
                </select>
             </div>

             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Industri Klien</label>
                <input 
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                  value={formData.clientIndustry}
                  onChange={(e) => setFormData({...formData, clientIndustry: e.target.value})}
                  placeholder="Contoh: Manufaktur, Mining"
                />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tantangan (Challenge)</label>
             <div className="relative">
               <Target className="absolute left-3 top-3 h-4 w-4 text-red-500" />
               <textarea 
                 rows={2}
                 className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                 value={formData.challenge}
                 onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                 placeholder="Jelaskan masalah hukum yang dihadapi klien..."
               />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Solusi Hukum (Solution)</label>
             <div className="relative">
               <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
               <textarea 
                 rows={3}
                 className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                 value={formData.solution}
                 onChange={(e) => setFormData({...formData, solution: e.target.value})}
                 placeholder="Jelaskan strategi dan langkah hukum yang diambil..."
               />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Hasil Akhir (Result)</label>
             <div className="relative">
               <Trophy className="absolute left-3 top-3 h-4 w-4 text-cbp-gold" />
               <textarea 
                 rows={2}
                 className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                 value={formData.result}
                 onChange={(e) => setFormData({...formData, result: e.target.value})}
                 placeholder="Apa dampak positif bagi klien?"
               />
             </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">URL Gambar Cover</label>
             <div className="relative">
               <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                 className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                 value={formData.imageUrl}
                 onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
               />
             </div>
          </div>

          <div className="pt-2 flex gap-3 border-t border-slate-100 dark:border-slate-800 mt-4">
             <Button type="button" variant="outline" className="w-full" onClick={onClose}>Batal</Button>
             <Button type="submit" className="w-full">Simpan Portofolio</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
