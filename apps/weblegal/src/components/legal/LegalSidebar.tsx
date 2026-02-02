
import React from 'react';
import { LegalSection } from '@/data/legal-content';
import { ChevronRight, FileText } from 'lucide-react';

interface LegalSidebarProps {
  sections: LegalSection[];
  activeSection: string;
  onSelect: (id: string) => void;
}

export const LegalSidebar: React.FC<LegalSidebarProps> = ({ sections, activeSection, onSelect }) => {
  return (
    <div className="lg:sticky lg:top-32 space-y-6">
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
        <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-6 px-2">
          Daftar Dokumen
        </h4>
        <nav className="space-y-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onSelect(section.id)}
                className={`
                  w-full text-left flex items-center justify-between px-4 py-4 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white dark:bg-slate-800 text-cbp-navy dark:text-cbp-gold shadow-md border-l-4 border-l-cbp-gold border-y border-r border-slate-100 dark:border-slate-700' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
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
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6 bg-cbp-navy dark:bg-slate-800 rounded-xl text-white shadow-lg">
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
