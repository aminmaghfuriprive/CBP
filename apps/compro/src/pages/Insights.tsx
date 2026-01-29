import React from 'react';
import { ARTICLES } from '@cbp/core';
import { Card } from '@cbp/ui';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const Insights: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 pt-20">
      <div className="bg-cbp-navy dark:bg-slate-900 py-24 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Wawasan Hukum</h1>
          <p className="text-slate-300 text-lg md:text-xl">Analisis mendalam dan berita terbaru seputar dunia hukum Indonesia.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Card key={article.id} className="h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" padding={false}>
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/30 z-10"></div>
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-20 bg-cbp-gold text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md shadow-lg">
                  {article.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-500 mb-4 space-x-4 font-medium uppercase tracking-wide">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> Tim Riset</span>
                </div>
                <h3 className="text-xl font-bold text-cbp-navy dark:text-white mb-4 leading-snug hover:text-cbp-gold transition-colors cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                  {article.excerpt}
                </p>
                <button className="text-cbp-navy dark:text-cbp-gold font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all pt-4 border-t border-slate-100 dark:border-slate-800">
                  Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};