
"use client";

import React, { useState } from 'react';
import { MOCK_PORTFOLIO, PortfolioItem, ServiceDivision } from '@cbp/core';
import { SectionHeader } from '@cbp/ui';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { PortfolioDetailModal } from '@/components/portfolio/PortfolioDetailModal';

// Ambil list unik kategori dari data
const CATEGORIES = ['Semua', ...Array.from(new Set(MOCK_PORTFOLIO.map(p => p.category)))] as string[];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = MOCK_PORTFOLIO.filter(item => 
    filter === 'Semua' || item.category === filter
  );

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <div className="bg-cbp-navy dark:bg-slate-900 pt-40 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <SectionHeader 
            title="Jejak Keberhasilan" 
            subtitle="Kumpulan studi kasus terpilih yang menunjukkan keahlian kami dalam menangani kompleksitas hukum."
            light
          />
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border
                ${filter === cat 
                  ? 'bg-cbp-gold text-cbp-navy border-cbp-gold shadow-lg shadow-cbp-gold/20 transform scale-105' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-cbp-gold hover:text-cbp-gold'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {filteredItems.map((item) => (
              <PortfolioCard 
                key={item.id} 
                item={item} 
                onClick={setSelectedItem} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg">Belum ada portofolio di kategori ini.</p>
          </div>
        )}
      </div>

      {/* 3. Detail Modal */}
      <PortfolioDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
      
    </div>
  );
}
