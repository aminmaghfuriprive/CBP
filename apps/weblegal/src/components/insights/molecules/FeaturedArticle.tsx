
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@cbp/core';
import { Button } from '@cbp/ui';
import { ArrowRight } from 'lucide-react';
import { ArticleCategoryBadge } from '../atoms/ArticleCategoryBadge';
import { ArticleMeta } from '../atoms/ArticleMeta';

interface FeaturedArticleProps {
  article: Article;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-200 dark:border-slate-800">
      <div className="absolute inset-0">
        <Image 
          src={article.imageUrl} 
          alt={article.title} 
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        {/* Lighting Fix: Navy/Blue gradient for better color pop in Light Mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-cbp-navy/95 via-cbp-navy/50 to-transparent dark:from-slate-950 dark:via-slate-900/60"></div>
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[500px] max-w-4xl">
        <div className="mb-4">
           <ArticleCategoryBadge category={article.category} className="bg-cbp-gold text-cbp-navy border-none" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight group-hover:text-cbp-gold transition-colors">
          {article.title}
        </h2>
        
        <p className="text-slate-200 text-lg mb-8 line-clamp-2 md:line-clamp-none max-w-2xl leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
           <Link href={`/insights/${article.id}`}>
             <Button className="bg-white text-cbp-navy hover:bg-cbp-gold hover:text-cbp-navy border-none font-bold px-8 h-12 text-base">
               Baca Artikel Utama <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
           </Link>
           <ArticleMeta date={article.date} className="text-slate-300" />
        </div>
      </div>
    </div>
  );
};
