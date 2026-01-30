
"use client";

import React from 'react';
import { useContentLogic } from '@cbp/core';
import { PageHeader, StatCard } from '@cbp/ui';
import { FileText, Layers, TrendingUp } from 'lucide-react';
import { ArticleListView } from '../../../src/components/cms/ArticleListView';

export default function CMSPage() {
  const { articles } = useContentLogic();
  
  // Statistik Sederhana
  const categories = new Set(articles.map(a => a.category)).size;
  const latestDate = articles.length > 0 ? articles[0].date : '-';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader 
        title="Konten Website" 
        subtitle="Kelola artikel, berita, dan wawasan hukum yang tampil di website publik." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <StatCard 
            label="Total Artikel" 
            value={articles.length} 
            icon={FileText} 
            variant="primary" 
         />
         <StatCard 
            label="Kategori Aktif" 
            value={categories} 
            icon={Layers} 
            variant="secondary" 
         />
         <StatCard 
            label="Terbit Terakhir" 
            value={latestDate} 
            icon={TrendingUp} 
            variant="success" 
         />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <ArticleListView />
      </div>
    </div>
  );
}
