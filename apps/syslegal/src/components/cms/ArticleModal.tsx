
"use client";

import React, { useState, useEffect } from 'react';
import { X, Type, Tag, Image as ImageIcon, Calendar, AlignLeft } from 'lucide-react';
import { Button } from '@cbp/ui';
import { Article } from '@cbp/core';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  initialData?: Article | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: 'Wawasan Hukum',
    excerpt: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        category: 'Wawasan Hukum',
        excerpt: '',
        imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random()*1000)}?auto=format&fit=crop&q=80&w=600`, // Random placeholder
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const articleToSave: Article = {
      id: initialData?.id || `art_${Date.now()}`,
      title: formData.title || '',
      category: formData.category || 'Umum',
      excerpt: formData.excerpt || '',
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/600x400',
      date: formData.date || new Date().toISOString().split('T')[0]
    };
    onSave(articleToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-cbp-navy dark:text-white text-lg flex items-center gap-2">
            <AlignLeft className="h-5 w-5 text-cbp-gold" />
            {initialData ? 'Edit Artikel' : 'Tulis Artikel Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Judul Artikel</label>
            <div className="relative">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                required
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Masukkan judul yang menarik..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Kategori</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select 
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Wawasan Hukum</option>
                  <option>Perizinan</option>
                  <option>Pertanahan</option>
                  <option>HAKI</option>
                  <option>Berita Firma</option>
                </select>
              </div>
            </div>
            <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tanggal Publikasi</label>
               <div className="relative">
                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="date"
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                 />
               </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">URL Gambar (Cover)</label>
             <div className="relative">
               <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input 
                 className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                 value={formData.imageUrl}
                 onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                 placeholder="https://..."
               />
             </div>
             {formData.imageUrl && (
                <div className="mt-2 h-32 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                   <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Error+Image')} />
                </div>
             )}
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Konten / Ringkasan</label>
             <textarea 
               rows={6}
               className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
               value={formData.excerpt}
               onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
               placeholder="Tulis ringkasan artikel di sini..."
             />
          </div>

          <div className="pt-2 flex gap-3">
             <Button type="button" variant="outline" className="w-full" onClick={onClose}>Batal</Button>
             <Button type="submit" className="w-full">Publikasikan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
