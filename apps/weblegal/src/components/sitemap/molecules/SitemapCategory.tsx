
import React from 'react';
import { SitemapCategoryData } from '@/data/sitemap-content';
import { SitemapLink } from '../atoms/SitemapLink';

interface SitemapCategoryProps {
  category: SitemapCategoryData;
}

export const SitemapCategory: React.FC<SitemapCategoryProps> = ({ category }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-serif font-bold text-cbp-navy dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
        {category.title}
      </h3>
      <div className="flex flex-col gap-1 pl-2">
        {category.links.map((link, idx) => (
          <SitemapLink key={idx} label={link.label} href={link.href} />
        ))}
      </div>
    </div>
  );
};
