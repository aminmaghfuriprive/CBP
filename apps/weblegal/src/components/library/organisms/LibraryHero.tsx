
"use client";

import React from 'react';
import { Search, Library } from 'lucide-react';

interface LibraryHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

export const LibraryHero: React.FC<LibraryHeroProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="bg-cbp-navy dark:bg-slate-900 pt-36 pb-24 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cbp-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cbp-gold text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
           <Library className="h-3.5 w-3.5" /> JDIH CBP Corp
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          Pustaka Regulasi Digital
        </h1>
        <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Akses mudah ke database peraturan perundang-undangan terbaru, dokumen hukum, dan putusan pengadilan yang telah dikurasi oleh tim ahli kami.
        </p>

        {/* Big Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cbp-gold to-white rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-full flex items-center p-2 shadow-2xl transition-transform transform group-hover:scale-[1.01]">
             <div className="pl-5 text-slate-400">
               <Search className="h-6 w-6" />
             </div>
             <input 
               type="text"
               className="flex-1 px-4 py-3.5 bg-transparent outline-none text-slate-800 dark:text-white text-lg placeholder:text-slate-400 font-medium"
               placeholder="Cari UU, PP, Nomor, atau Topik..."
               value={searchQuery}
               onChange={(e) => onSearchChange(e.target.value)}
             />
             <button className="bg-cbp-navy text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg">
               Cari
             </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-400">
             <span>Pencarian Populer:</span>
             <button onClick={() => onSearchChange('Cipta Kerja')} className="hover:text-white underline decoration-cbp-gold/50">Cipta Kerja</button>
             <button onClick={() => onSearchChange('Pajak')} className="hover:text-white underline decoration-cbp-gold/50">Pajak</button>
             <button onClick={() => onSearchChange('Perseroan')} className="hover:text-white underline decoration-cbp-gold/50">Perseroan</button>
          </div>
        </div>
      </div>
    </div>
  );
};
