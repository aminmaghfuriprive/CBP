
"use client";

import React from 'react';
import { useTeamData } from '@/hooks/useTeamData';
import { AboutHeroSection } from '@/components/about/organisms/AboutHeroSection';
import { PhilosophySection } from '@/components/about/organisms/PhilosophySection';
import { TeamSection } from '@/components/about/organisms/TeamSection';
import { AboutCTASection } from '@/components/about/organisms/AboutCTASection';
import { CertificatesMarquee } from '@/components/about/organisms/CertificatesMarquee';

export default function About() {
  // 1. Logic Layer: Mengambil data tim yang sudah terfilter
  const { founder, expertStaff, supportStaff } = useTeamData();

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* 2. Organism Layer: Hero Section (Founder & Story) */}
      <AboutHeroSection founder={founder} />

      {/* NEW: Certificates Marquee (Lisensi & Sertifikasi) */}
      <CertificatesMarquee />

      {/* Spacer untuk memisahkan secara visual */}
      <div className="h-10 md:h-16 bg-transparent"></div>

      {/* 3. Organism Layer: Philosophy & Values (Static Content) */}
      <PhilosophySection />

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
