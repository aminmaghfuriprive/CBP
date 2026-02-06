
import React from 'react';
import Image from 'next/image';
import { NETWORK_CONTENT } from '../../../data/landing-content';

export const NetworkSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-cbp-gold uppercase tracking-[0.2em] mb-3 block">
            {NETWORK_CONTENT.title}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-cbp-navy dark:text-white max-w-2xl mx-auto leading-tight">
            {NETWORK_CONTENT.subtitle}
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {NETWORK_CONTENT.organizations.map((org, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-cbp-gold dark:hover:border-cbp-gold hover:shadow-xl transition-all duration-500 cursor-default min-h-[180px]"
            >
              {/* Logo Container */}
              <div className="relative w-full h-16 mt-4 transition-all duration-500 transform group-hover:scale-110">
                <Image 
                  src={org.logoUrl} 
                  alt={`${org.name} Logo`}
                  fill
                  className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 dark:invert dark:group-hover:invert-0"
                />
              </div>

              {/* Full Name - Always Visible now */}
              <div className="mt-6 text-center w-full">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-cbp-navy dark:group-hover:text-cbp-gold uppercase tracking-widest leading-tight transition-colors duration-300">
                  {org.fullName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
