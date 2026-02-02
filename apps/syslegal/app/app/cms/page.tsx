
"use client";

import React, { useState } from 'react';
import { useContentLogic, usePortfolioLogic, useCertificateLogic } from '@cbp/core';
import { PageHeader, StatCard } from '@cbp/ui';
import { FileText, TrendingUp, Briefcase, Award } from 'lucide-react';
import { ArticleListView } from '../../../src/components/cms/ArticleListView';
import { PortfolioManager } from '../../../src/components/cms/PortfolioManager';
import { CertificateManager } from '../../../src/components/cms/CertificateManager';

export default function CMSPage() {
  const { articles } = useContentLogic();
  const { portfolios } = usePortfolioLogic();
  const { certificates } = useCertificateLogic();
  
  const [activeTab, setActiveTab] = useState<'articles' | 'portfolio' | 'certificates'>('articles');
  
  // Statistik
  const articleCount = articles.length;
  const portfolioCount = portfolios.length;
  const certCount = certificates.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <PageHeader 
        title="Konten Website" 
        subtitle="Kelola artikel, portofolio, dan sertifikat yang tampil di website publik." 
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
            variant="success" 
         />
         <StatCard 
            label="Sertifikat" 
            value={certCount} 
            icon={Award} 
            variant="secondary" 
         />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0 overflow-x-auto">
        <button
          onClick={() => setActiveTab('articles')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'articles' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="h-4 w-4" /> Artikel & Berita
          {activeTab === 'articles' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'portfolio' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="h-4 w-4" /> Portofolio
          {activeTab === 'portfolio' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'certificates' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Award className="h-4 w-4" /> Sertifikat & Lisensi
          {activeTab === 'certificates' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'articles' && <ArticleListView />}
        {activeTab === 'portfolio' && <PortfolioManager />}
        {activeTab === 'certificates' && <CertificateManager />}
      </div>
    </div>
  );
}
