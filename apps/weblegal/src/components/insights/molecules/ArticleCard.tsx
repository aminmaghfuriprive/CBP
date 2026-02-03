
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@cbp/core';
import { ArrowRight } from 'lucide-react';
import { Card } from '@cbp/ui';
import { ArticleCategoryBadge } from '../atoms/ArticleCategoryBadge';
import { ArticleMeta } from '../atoms/ArticleMeta';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/insights/${article.id}`} className="block h-full group">
      <Card className="h-full flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300" padding={false}>
        {/* Image Container */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
          <div className="absolute top-4 left-4">
            <ArticleCategoryBadge category={article.category} className="shadow-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-none" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col">
          <ArticleMeta date={article.date} className="mb-3" />
          
          <h3 className="text-lg font-serif font-bold text-cbp-navy dark:text-white mb-3 line-clamp-2 group-hover:text-cbp-gold transition-colors">
            {article.title}
          </h3>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-1 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm font-bold text-cbp-navy dark:text-cbp-gold group-hover:gap-2 transition-all">
            Baca Selengkapnya <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
