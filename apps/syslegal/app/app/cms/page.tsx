
"use client";

import React, { useState } from 'react';
import { useContentLogic, usePortfolioLogic } from '@cbp/core';
import { PageHeader, StatCard } from '@cbp/ui';
import { FileText, Layers, TrendingUp, Briefcase, FileImage } from 'lucide-react';
import { ArticleListView } from '../../../src/components/cms/ArticleListView';
import { PortfolioManager } from '../../../src/components/cms/PortfolioManager';

export default function CMSPage() {
  const { articles } = useContentLogic();
  const { portfolios } = usePortfolioLogic();
  const [activeTab, setActiveTab] = useState<'articles' | 'portfolios'>('articles');
  
  // Statistik
  const articleCount = articles.length;
  const portfolioCount = portfolios.length;
  const latestDate = articles.length > 0 ? articles[0].date : '-';

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <PageHeader 
        title="Konten Website" 
        subtitle="Kelola artikel, berita, dan studi kasus yang tampil di website publik." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex-shrink-0">
         <StatCard 
            label="Total Artikel" 
            value={articleCount} 
            icon={FileText} 
            variant="primary" 
         />
         <StatCard 
            label="Studi Kasus" 
            value={portfolioCount} 
            icon={Briefcase} 
            variant="secondary" 
         />
         <StatCard 
            label="Terbit Terakhir" 
            value={latestDate} 
            icon={TrendingUp} 
            variant="success" 
         />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0">
        <button
          onClick={() => setActiveTab('articles')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'articles' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="h-4 w-4" /> Artikel & Berita
          {activeTab === 'articles' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('portfolios')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'portfolios' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileImage className="h-4 w-4" /> Studi Kasus (Portfolio)
          {activeTab === 'portfolios' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'articles' ? (
          <ArticleListView />
        ) : (
          <PortfolioManager />
        )}
      </div>
    </div>
  );
}
