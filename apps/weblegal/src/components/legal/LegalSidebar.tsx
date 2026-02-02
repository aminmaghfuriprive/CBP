
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LegalSection } from '@/data/legal-content';
import { ChevronRight, FileText } from 'lucide-react';

interface LegalSidebarProps {
  sections: LegalSection[];
}

export const LegalSidebar: React.FC<LegalSidebarProps> = ({ sections }) => {
  const pathname = usePathname();

  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
           <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest">
             Daftar Dokumen
           </h4>
        </div>
        <nav className="p-2 space-y-1">
          {sections.map((section) => {
            const isActive = pathname?.endsWith(`/${section.id}`);
            
            return (
              <Link
                key={section.id}
                href={`/legal/${section.id}`}
                className={`
                  w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-slate-800 text-cbp-navy dark:text-cbp-gold font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                   <FileText className={`h-4 w-4 ${isActive ? 'text-cbp-gold' : 'text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-white'}`} />
                   <span>{section.title}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-cbp-gold animate-in fade-in slide-in-from-left-2" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6 bg-cbp-navy dark:bg-slate-800 rounded-xl text-white shadow-md border border-slate-800">
        <h5 className="font-serif font-bold text-lg mb-2">Butuh Bantuan?</h5>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Jika Anda memiliki pertanyaan spesifik mengenai kebijakan kami, silakan hubungi tim legal kami.
        </p>
        <a 
          href="mailto:legal@cbpcorp.id" 
          className="text-xs font-bold text-cbp-gold hover:underline flex items-center gap-1"
        >
          legal@cbpcorp.id
        </a>
      </div>
    </div>
  );
};
