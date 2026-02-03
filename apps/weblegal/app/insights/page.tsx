
"use client";

import React from 'react';
import { SectionHeader } from '@cbp/ui';
import { usePublicArticles } from '@/components/insights/hooks/usePublicArticles';
import { FeaturedArticle } from '@/components/insights/molecules/FeaturedArticle';
import { ArticleFilterBar } from '@/components/insights/organisms/ArticleFilterBar';
import { ArticleGrid } from '@/components/insights/organisms/ArticleGrid';

export default function InsightsPage() {
  const { 
    categories, 
    searchQuery, 
    selectedCategory, 
    setSearchQuery, 
    setSelectedCategory,
    featuredArticle,
    gridArticles 
  } = usePublicArticles();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* 1. Standardized Hero Section */}
      <div className="bg-cbp-navy dark:bg-slate-900 pt-32 pb-14 text-center text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Wawasan Hukum" 
            subtitle="Analisis mendalam, berita regulasi terbaru, dan panduan hukum praktis untuk bisnis Anda."
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20 space-y-16">
        
        {/* 2. Featured Article (Only show if no search/filter active) */}
        {!searchQuery && selectedCategory === 'Semua' && featuredArticle && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* 3. Main Content Area */}
        <div>
           <ArticleFilterBar 
             categories={categories}
             selectedCategory={selectedCategory}
             onSelectCategory={setSelectedCategory}
             searchQuery={searchQuery}
             onSearchChange={setSearchQuery}
           />
           
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <ArticleGrid articles={gridArticles} />
           </div>
        </div>

      </div>
    </div>
  );
}
