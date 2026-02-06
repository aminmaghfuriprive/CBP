
import React from 'react';
import { NETWORK_CONTENT } from '../../../data/landing-content';
import * as Icons from 'lucide-react';

export const NetworkSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">
            {NETWORK_CONTENT.title}
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-cbp-navy dark:text-white">
            {NETWORK_CONTENT.subtitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {NETWORK_CONTENT.organizations.map((org, idx) => {
            const IconComponent = (Icons as any)[org.iconName] || Icons.Shield;
            
            return (
              <div 
                key={idx}
                className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-cbp-gold dark:hover:border-cbp-gold hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-cbp-navy group-hover:text-cbp-gold transition-colors duration-300">
                   <IconComponent className="h-6 w-6" />
                </div>
                
                {/* Updated H3 color for better visibility in inactive state */}
                <h3 className="text-2xl font-bold text-slate-400 dark:text-slate-500 group-hover:text-cbp-navy dark:group-hover:text-white transition-colors duration-300 font-serif">
                  {org.name}
                </h3>
                
                {/* Updated description color and weight for better readability */}
                <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wide leading-tight">
                  {org.fullName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
