
import React from 'react';
import { SITEMAP_CONTENT } from '@/data/sitemap-content';
import { SitemapCategory } from '../molecules/SitemapCategory';

export const SitemapGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-slate-950">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {SITEMAP_CONTENT.map((category, idx) => (
          <SitemapCategory key={idx} category={category} />
        ))}
      </div>
    </div>
  );
};
