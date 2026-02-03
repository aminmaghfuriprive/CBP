
"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface LibraryHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export const LibraryHero: React.FC<LibraryHeroProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-cbp-navy dark:bg-slate-900 pt-32 pb-20 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cbp-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Pustaka Regulasi & Dokumen Hukum
        </h1>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          Akses ribuan peraturan perundang-undangan terbaru yang telah dikurasi dan diringkas oleh AI untuk kemudahan riset Anda.
        </p>

        {/* Big Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cbp-gold to-white rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white rounded-full flex items-center p-2 shadow-2xl">
             <div className="pl-4 text-slate-400">
               <Search className="h-6 w-6" />
             </div>
             <input 
               type="text"
               className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-800 text-lg placeholder:text-slate-400"
               placeholder="Cari UU, PP, atau topik hukum..."
               value={searchQuery}
               onChange={(e) => onSearchChange(e.target.value)}
             />
             <button className="bg-cbp-navy text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">
               Cari
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
