
import React from 'react';
import { CareerHero } from '@/components/careers/organisms/CareerHero';
import { NoOpeningsCard } from '@/components/careers/molecules/NoOpeningsCard';
import { CultureGrid } from '@/components/careers/organisms/CultureGrid';

export default function CareersPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-24">
      <CareerHero />
      
      {/* Adjusted negative margin from -mt-10 to -mt-6 to lower the content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <NoOpeningsCard />
        <CultureGrid />
      </div>
    </div>
  );
}
