
import React from 'react';
import { LegalSection } from '@/data/legal-content';
import { ChevronRight } from 'lucide-react';

interface LegalSidebarProps {
  sections: LegalSection[];
  activeSection: string;
}

export const LegalSidebar: React.FC<LegalSidebarProps> = ({ sections, activeSection }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-32">
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
        <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-6">
          Daftar Isi
        </h4>
        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-white dark:bg-slate-800 text-cbp-navy dark:text-cbp-gold shadow-sm border border-slate-200 dark:border-slate-700' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <span>{section.title}</span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-cbp-gold animate-in fade-in slide-in-from-left-2" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-6 p-6 bg-cbp-navy dark:bg-slate-800 rounded-xl text-white">
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
