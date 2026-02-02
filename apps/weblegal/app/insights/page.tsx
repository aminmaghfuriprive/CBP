
import React from 'react';
import { ARTICLES } from '@cbp/core';
import { Card, SectionHeader } from '@cbp/ui';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Insights() {
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
            subtitle="Analisis mendalam dan berita terbaru seputar dunia hukum Indonesia."
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Card key={article.id} className="h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" padding={false}>
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/30 z-10"></div>
                <Image 
                  src={article.imageUrl} 
                  alt={article.title} 
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
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
}
