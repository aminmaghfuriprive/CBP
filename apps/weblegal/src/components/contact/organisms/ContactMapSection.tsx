
import React from 'react';
import { SectionHeader } from '@cbp/ui';
import { MapPin } from 'lucide-react';

export const ContactMapSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Lokasi Kantor" 
          subtitle="Kunjungi kantor pusat kami di kawasan bisnis strategis Sudirman Central Business District (SCBD)."
        />
        
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 group">
          {/* Google Maps Iframe */}
          <iframe 
            width="100%" 
            height="100%" 
            id="gmap_canvas" 
            src="https://maps.google.com/maps?q=Equity%20Tower%20Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0}
            title="CBP Corp Location"
            className="filter grayscale-[100%] contrast-[0.9] opacity-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-700 ease-in-out"
          ></iframe>
          
          {/* Overlay Info Card (Desktop Only) */}
          <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100 dark:border-slate-800 hidden md:block animate-in slide-in-from-bottom-4 duration-700 delay-300">
             <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-cbp-navy dark:bg-cbp-gold rounded-lg text-white dark:text-cbp-navy">
                   <MapPin className="h-5 w-5" />
                </div>
                <h4 className="font-serif font-bold text-cbp-navy dark:text-white text-lg leading-none">
                  Equity Tower
                </h4>
             </div>
             <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
               Lantai 35, SCBD Lot 9<br/>
               Jl. Jend. Sudirman Kav. 52-53<br/>
               Jakarta Selatan 12190
             </p>
             <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <a 
                  href="https://maps.google.com/maps?q=Equity%20Tower%20Jakarta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-cbp-gold hover:underline flex items-center gap-1"
                >
                  Buka di Google Maps &rarr;
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
