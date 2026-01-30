
import React, { useEffect, useState } from 'react';

interface ServiceAnchorNavProps {
  divisions: string[];
}

export const ServiceAnchorNav: React.FC<ServiceAnchorNavProps> = ({ divisions }) => {
  const [activeId, setActiveId] = useState<string>('');

  // Logic untuk mendeteksi section mana yang sedang dilihat user
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        // rootMargin negatif berarti area deteksi dipersempit ke tengah layar
        // agar active state lebih akurat saat section berpindah
        rootMargin: '-100px 0px -50% 0px', 
        threshold: 0.1 
      }
    );

    divisions.forEach((div) => {
      const id = div.replace(/\s+/g, '-').toLowerCase();
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [divisions]);

  const scrollToSection = (divName: string) => {
    const id = divName.replace(/\s+/g, '-').toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      // Offset -140px untuk memberikan ruang bagi Navbar Utama + Anchor Nav ini sendiri
      const yOffset = -140; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    // Sticky position dengan top-[80px] agar pas di bawah Navbar Utama website
    // Negative margin (-mx) digunakan untuk melawan padding container induk (Card) agar Nav ini full-width
    <div className="sticky top-[80px] z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 mb-10 -mx-6 md:-mx-12 px-6 md:px-12 py-3 transition-colors">
      <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-2 flex-shrink-0 hidden md:block">
          Lompat ke:
        </span>
        {divisions.map((div) => {
          const id = div.replace(/\s+/g, '-').toLowerCase();
          const isActive = activeId === id;
          
          return (
            <button
              key={div}
              onClick={() => scrollToSection(div)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border flex-shrink-0
                ${isActive 
                  ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold shadow-md transform scale-105' 
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-cbp-navy hover:text-cbp-navy dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:border-cbp-gold dark:hover:text-cbp-gold'}
              `}
            >
              {div}
            </button>
          );
        })}
      </div>
    </div>
  );
};
