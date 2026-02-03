
"use client";

import React from 'react';
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
      
      {/* Main Container with Padding for Fixed Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative z-20 space-y-12">
        
        {/* 1. Hero: Featured Article (Latest) */}
        {/* Only show if no search/filter active to maintain focus */}
        {!searchQuery && selectedCategory === 'Semua' && featuredArticle && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* 2. Main Content Area: Filters & Grid */}
        <div className="space-y-8">
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
