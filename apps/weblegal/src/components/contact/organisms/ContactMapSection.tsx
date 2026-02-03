
import React from 'react';
import { SectionHeader } from '@cbp/ui';
import { MapPin } from 'lucide-react';

export const ContactMapSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Lokasi Kantor" 
          subtitle="Kunjungi kantor pusat kami untuk konsultasi langsung."
        />
        
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 group">
          {/* Google Maps Iframe Updated to CBP Corp Location */}
          <iframe 
            width="100%" 
            height="100%" 
            id="gmap_canvas" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1260213835276!2d111.40774267484603!3d-6.9944357685014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7741383039d96d%3A0xb90b96e3e0377027!2sCBP%20Corp!5e0!3m2!1sid!2sid!4v1770091893165!5m2!1sid!2sid" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
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
                  Kantor Pusat
                </h4>
             </div>
             <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
               Jl. Mr. Iskandar, Bangeran, Kamolan,<br/>
               Kec. Blora, Kabupaten Blora,<br/>
               Jawa Tengah 58219
             </p>
             <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <a 
                  href="https://maps.app.goo.gl/nadvznyH5XX48VgY7" 
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
