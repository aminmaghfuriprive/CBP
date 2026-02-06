
import React from 'react';
import { HeroSection } from '@/components/home/organisms/HeroSection';
import { TrustStripSection } from '@/components/home/organisms/TrustStripSection';
import { FounderSection } from '@/components/home/organisms/FounderSection';
import { NetworkSection } from '@/components/home/organisms/NetworkSection';
import { ServicesSection } from '@/components/home/organisms/ServicesSection';
import { CTASection } from '@/components/home/organisms/CTASection';

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <HeroSection />
      <TrustStripSection />
      <FounderSection />
      <NetworkSection />
      <ServicesSection />
      <CTASection />
    </div>
  );
}
