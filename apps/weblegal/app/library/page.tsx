
"use client";

import React from 'react';
import { usePublicLibrary } from '@/components/library/hooks/usePublicLibrary';
import { LibraryHero } from '@/components/library/organisms/LibraryHero';
import { FilterSidebar } from '@/components/library/molecules/FilterSidebar';
import { RegulationCard } from '@/components/library/molecules/RegulationCard';
import { SearchX } from 'lucide-react';

export default function LibraryPage() {
  const { regulations, filterOptions, filters, setters } = usePublicLibrary();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <LibraryHero 
        searchQuery={filters.searchQuery}
        onSearchChange={setters.setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
             <FilterSidebar 
               options={filterOptions} 
               filters={filters} 
               setters={setters} 
             />
          </div>

          {/* List Content */}
          <div className="lg:col-span-9 space-y-4">
             <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-slate-500">Menampilkan <strong>{regulations.length}</strong> dokumen</p>
             </div>

             {regulations.length > 0 ? (
               regulations.map(item => (
                 <RegulationCard key={item.id} item={item} />
               ))
             ) : (
               <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
                  <SearchX className="h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="font-bold text-slate-600 dark:text-slate-300 text-lg">Tidak Ditemukan</h3>
                  <p className="text-slate-500 text-sm">Coba ubah kata kunci atau filter pencarian Anda.</p>
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
}
