
import React from 'react';
import { SitemapHero } from '@/components/sitemap/organisms/SitemapHero';
import { SitemapGrid } from '@/components/sitemap/organisms/SitemapGrid';

export default function SitemapPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <SitemapHero />
      <SitemapGrid />
    </div>
  );
}
