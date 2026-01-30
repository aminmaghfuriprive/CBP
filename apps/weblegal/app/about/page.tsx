
"use client";

import React from 'react';
import { useTeamData } from '@/hooks/useTeamData';
import { AboutHeroSection } from '@/components/about/organisms/AboutHeroSection';
import { PhilosophySection } from '@/components/about/organisms/PhilosophySection';
import { TeamSection } from '@/components/about/organisms/TeamSection';
import { AboutCTASection } from '@/components/about/organisms/AboutCTASection';

export default function About() {
  // 1. Logic Layer: Mengambil data tim yang sudah terfilter
  const { founder, expertStaff, supportStaff } = useTeamData();

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 2. Organism Layer: Hero Section (Founder & Story) */}
      <AboutHeroSection founder={founder} />

      {/* Spacer untuk memisahkan Hero dan Philosophy secara visual */}
      <div className="h-10 md:h-20 bg-transparent"></div>

      {/* 3. Organism Layer: Philosophy & Values (Static Content) */}
      <PhilosophySection />

      {/* Jarak Proporsional Antar Sesi */}
      <div className="py-12 bg-white dark:bg-slate-950"></div>

      {/* 4. Organism Layer: Team Grid (Dynamic Data) */}
      <TeamSection 
        expertStaff={expertStaff} 
        supportStaff={supportStaff} 
      />

      {/* 5. Organism Layer: Closing CTA */}
      <AboutCTASection />
      
    </div>
  );
}
