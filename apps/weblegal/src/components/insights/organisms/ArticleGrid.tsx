
import React from 'react';
import { Article } from '@cbp/core';
import { ArticleCard } from '../molecules/ArticleCard';
import { SearchX } from 'lucide-react';

interface ArticleGridProps {
  articles: Article[];
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
        <SearchX className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Artikel Tidak Ditemukan</h3>
        <p className="text-slate-500 text-sm mt-1">Coba gunakan kata kunci lain atau ubah kategori filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
