
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
    <div className="space-y-6 lg:sticky lg:top-24">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
        <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-6 px-2">
          Daftar Dokumen
        </h4>
        <nav className="space-y-2">
          {sections.map((section) => {
            // Check if current path ends with the section id
            const isActive = pathname?.endsWith(`/${section.id}`);
            
            return (
              <Link
                key={section.id}
                href={`/legal/${section.id}`}
                className={`
                  w-full text-left flex items-center justify-between px-4 py-4 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-slate-50 dark:bg-slate-800 text-cbp-navy dark:text-cbp-gold shadow-sm border-l-4 border-l-cbp-gold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent'
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
      
      <div className="p-6 bg-cbp-navy dark:bg-slate-800 rounded-xl text-white shadow-xl border border-white/10">
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
