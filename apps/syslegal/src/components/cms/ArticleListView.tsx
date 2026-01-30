
"use client";

import React, { useState } from 'react';
import { useContentLogic, Article } from '@cbp/core';
import { Card, Button, SearchInput, Badge } from '@cbp/ui';
import { Plus, Edit2, Trash2, Calendar, LayoutGrid, List as ListIcon } from 'lucide-react';
import { ArticleModal } from './ArticleModal';

export const ArticleListView: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useContentLogic();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Semua', ...Array.from(new Set(articles.map(a => a.category)))] as string[];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex gap-2 w-full md:w-auto">
            <div className="w-full md:w-64">
              <SearchInput 
                placeholder="Cari artikel..." 
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

         <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-1">
               <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cbp-navy text-white' : 'text-slate-400'}`}>
                 <LayoutGrid className="h-4 w-4" />
               </button>
               <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-cbp-navy text-white' : 'text-slate-400'}`}>
                 <ListIcon className="h-4 w-4" />
               </button>
            </div>
            <Button onClick={handleAddNew} className="gap-2 w-full md:w-auto">
                <Plus className="h-4 w-4" /> Tulis Artikel
            </Button>
         </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} padding={false} className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 group hover:shadow-lg transition-all duration-300">
              <div className="h-48 relative overflow-hidden rounded-t-xl">
                 <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-3 left-3">
                    <Badge variant="warning" className="shadow-lg">{article.category}</Badge>
                 </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                 <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <Calendar className="h-3 w-3" /> {article.date}
                 </div>
                 <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-2 line-clamp-2">{article.title}</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
                 
                 <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(article)} className="text-slate-500 hover:text-cbp-navy dark:hover:text-white">
                       <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteArticle(article.id)} className="text-slate-500 hover:text-red-600 dark:hover:text-red-400">
                       <Trash2 className="h-4 w-4" />
                    </Button>
                 </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
           {filteredArticles.map((article) => (
             <Card key={article.id} className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" padding={false}>
                <div className="h-16 w-16 md:h-20 md:w-24 rounded-lg overflow-hidden flex-shrink-0">
                   <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2 mb-1">
                      <Badge variant="neutral" className="text-[10px]">{article.category}</Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                   </div>
                   <h3 className="font-bold text-cbp-navy dark:text-white truncate">{article.title}</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{article.excerpt}</p>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(article)}>
                       <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteArticle(article.id)} className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30">
                       <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
             </Card>
           ))}
        </div>
      )}

      {filteredArticles.length === 0 && (
         <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
           <p className="text-slate-500">Tidak ada artikel yang ditemukan.</p>
         </div>
      )}

      <ArticleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingArticle) {
            updateArticle(data.id, data);
          } else {
            addArticle(data);
          }
        }}
        initialData={editingArticle}
      />
    </div>
  );
};
