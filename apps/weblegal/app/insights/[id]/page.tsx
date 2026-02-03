
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePublicArticles } from '@/components/insights/hooks/usePublicArticles';
import { ArticleCategoryBadge } from '@/components/insights/atoms/ArticleCategoryBadge';
import { ArticleMeta } from '@/components/insights/atoms/ArticleMeta';
import { ArticleGrid } from '@/components/insights/organisms/ArticleGrid';
import { Button } from '@cbp/ui';
import { ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getArticleById, getRelatedArticles } = usePublicArticles();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Artikel tidak ditemukan</h1>
        <Button onClick={() => router.back()} className="mt-4">Kembali</Button>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.id, article.category);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-20">
      
      {/* 1. Article Hero / Header */}
      <div className="relative h-[60vh] w-full">
         <Image 
           src={article.imageUrl} 
           alt={article.title} 
           fill
           className="object-cover"
           priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30"></div>
         
         <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20 max-w-5xl mx-auto w-full">
            <button 
              onClick={() => router.back()} 
              className="absolute top-32 left-4 md:left-12 text-white/80 hover:text-white flex items-center gap-2 text-sm font-bold bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali
            </button>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ArticleCategoryBadge category={article.category} className="bg-cbp-gold text-cbp-navy border-none mb-4 inline-block" />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              <ArticleMeta date={article.date} className="text-slate-300 text-sm md:text-base" />
            </div>
         </div>
      </div>

      {/* 2. Content Body & Sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
               <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-loose">
                  <p className="font-serif text-xl md:text-2xl text-cbp-navy dark:text-cbp-gold italic font-medium leading-relaxed mb-8">
                    "{article.excerpt}"
                  </p>
                  
                  {/* Simulated Content Body */}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <h3>Analisis Hukum Mendalam</h3>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <ul>
                    <li>Poin analisis hukum pertama yang krusial.</li>
                    <li>Implikasi regulasi terhadap bisnis Anda.</li>
                    <li>Strategi mitigasi risiko yang disarankan.</li>
                  </ul>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <blockquote>
                    "Hukum adalah seni kebaikan dan keadilan. (Ars boni et aequi)"
                  </blockquote>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
               </div>

               {/* Share Buttons */}
               <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4">Bagikan Artikel</h4>
                  <div className="flex gap-3">
                     <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"><Facebook className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"><Twitter className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"><Linkedin className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"><Share2 className="h-5 w-5" /></button>
                  </div>
               </div>
            </div>

            {/* Sidebar / Related */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 sticky top-28">
                  <h3 className="font-serif font-bold text-xl text-cbp-navy dark:text-white mb-6">Artikel Terkait</h3>
                  {relatedArticles.length > 0 ? (
                    <div className="space-y-6">
                      {relatedArticles.map(rel => (
                        <div key={rel.id} className="group cursor-pointer" onClick={() => router.push(`/insights/${rel.id}`)}>
                           <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3">
                              <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                           </div>
                           <h4 className="font-bold text-sm text-cbp-navy dark:text-white leading-snug group-hover:text-cbp-gold transition-colors">
                             {rel.title}
                           </h4>
                           <p className="text-xs text-slate-500 mt-1">{rel.date}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Tidak ada artikel terkait lainnya.</p>
                  )}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
