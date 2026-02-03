
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePublicArticles } from '@/components/insights/hooks/usePublicArticles';
import { ArticleCategoryBadge } from '@/components/insights/atoms/ArticleCategoryBadge';
import { ScrollProgress } from '@/components/insights/atoms/ScrollProgress';
import { TableOfContents } from '@/components/insights/molecules/TableOfContents';
import { CommentSection } from '@/components/insights/organisms/CommentSection';
import { Button } from '@cbp/ui';
import { ArrowLeft, Facebook, Twitter, Linkedin, Share2, Clock, CalendarDays, UserCircle, MessageSquare } from 'lucide-react';

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

  // Estimasi waktu baca (rata-rata 200 kata per menit)
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <ScrollProgress />
      
      {/* 1. Immersive Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[500px]">
         <Image 
           src={article.imageUrl} 
           alt={article.title} 
           fill
           className="object-cover"
           priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30"></div>
         
         {/* Navigation & Header Content */}
         <div className="absolute inset-0 flex flex-col">
            <div className="p-6 md:p-8">
                <button 
                  onClick={() => router.back()} 
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all border border-white/10"
                >
                  <ArrowLeft className="h-4 w-4" /> Kembali
                </button>
            </div>

            <div className="mt-auto max-w-4xl mx-auto w-full px-6 md:px-8 pb-16 md:pb-24 text-center">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                  <div className="flex justify-center">
                    <ArticleCategoryBadge category={article.category} className="bg-cbp-gold text-cbp-navy border-none shadow-lg shadow-cbp-gold/20" />
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-sm">
                    {article.title}
                  </h1>

                  {/* Author & Meta Row */}
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium">
                     <div className="flex items-center gap-2">
                        <UserCircle className="h-5 w-5 text-cbp-gold" />
                        <span>Tim Riset Legal</span>
                     </div>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                     <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{article.date}</span>
                     </div>
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{readTime} menit baca</span>
                     </div>
                  </div>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Share (Left Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
               <div className="sticky top-32 flex flex-col gap-4 items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 rotate-180 writing-mode-vertical mb-2">Bagikan</span>
                  <button className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-[#1877F2] shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-110"><Facebook className="h-5 w-5" /></button>
                  <button className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-[#1DA1F2] shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-110"><Twitter className="h-5 w-5" /></button>
                  <button className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-[#0A66C2] shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-110"><Linkedin className="h-5 w-5" /></button>
                  <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 mt-2"></div>
               </div>
            </div>

            {/* Main Content (Center) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-t-3xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800">
               {/* Mobile TOC Wrapper if needed (can be implemented as expandable) */}
               
               <article 
                  id="article-content"
                  className="
                  max-w-none 
                  /* Base Prose Styles */
                  prose dark:prose-invert 
                  
                  /* Manual Overrides for Adjusted Text Size (Compact & Readable) */
                  [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-cbp-navy [&>h2]:dark:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:leading-tight
                  [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-cbp-navy [&>h3]:dark:text-white [&>h3]:mt-8 [&>h3]:mb-3
                  
                  /* Body Text: Smaller size (text-base on desktop, text-sm on mobile) but good line-height */
                  [&>p]:text-[15px] [&>p]:md:text-[16px] [&>p]:leading-relaxed [&>p]:text-slate-600 [&>p]:dark:text-slate-300 [&>p]:mb-5
                  
                  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul]:text-[15px] [&>ul]:md:text-[16px] [&>ul]:text-slate-600 [&>ul]:dark:text-slate-300
                  [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol]:text-[15px] [&>ol]:md:text-[16px] [&>ol]:text-slate-600 [&>ol]:dark:text-slate-300
                  [&>li]:mb-2 [&>li]:pl-1
                  
                  [&>blockquote]:border-l-4 [&>blockquote]:border-cbp-gold [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-700 [&>blockquote]:dark:text-slate-300 [&>blockquote]:my-8 [&>blockquote]:text-lg
                  [&>strong]:font-bold [&>strong]:text-cbp-navy [&>strong]:dark:text-white
                  
                  /* Drop Cap Style */
                  first-letter:text-5xl first-letter:md:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-cbp-navy dark:first-letter:text-cbp-gold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]
               ">
                  
                  {/* Lead Excerpt */}
                  <p className="lead text-lg md:text-xl text-slate-800 dark:text-slate-200 font-medium italic mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 leading-relaxed font-serif">
                    "{article.excerpt}"
                  </p>
                  
                  {/* Dynamic HTML Content */}
                  {article.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  ) : (
                    <p>Konten lengkap artikel ini sedang dalam proses penyuntingan.</p>
                  )}
               </article>

               {/* Mobile Share (Bottom) */}
               <div className="lg:hidden mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4 text-center">Bagikan Artikel</h4>
                  <div className="flex justify-center gap-4">
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-colors"><Facebook className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-100 hover:text-sky-500 transition-colors"><Twitter className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-100 hover:text-blue-800 transition-colors"><Linkedin className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-green-100 hover:text-green-600 transition-colors"><Share2 className="h-5 w-5" /></button>
                  </div>
               </div>

               {/* New Comment Section */}
               <CommentSection />
            </div>

            {/* Sidebar / TOC / Related (Right) */}
            <div className="lg:col-span-3 space-y-8 pt-0 lg:pt-12">
               
               {/* New TOC Component Sticky */}
               <div className="sticky top-32 space-y-8">
                 <TableOfContents />

                 <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="font-serif font-bold text-lg text-cbp-navy dark:text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-cbp-gold rounded-full"></span>
                      Bacaan Terkait
                    </h3>
                    {relatedArticles.length > 0 ? (
                      <div className="space-y-6">
                        {relatedArticles.map(rel => (
                          <div key={rel.id} className="group cursor-pointer flex flex-col gap-3" onClick={() => router.push(`/insights/${rel.id}`)}>
                             <div className="relative h-28 w-full rounded-lg overflow-hidden">
                                <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                             </div>
                             <div>
                               <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 leading-snug group-hover:text-cbp-gold transition-colors line-clamp-2">
                                 {rel.title}
                               </h4>
                               <p className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-wide">{rel.date}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">Tidak ada artikel terkait lainnya.</p>
                    )}
                    
                    {/* Newsletter Widget */}
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                       <h4 className="font-bold text-sm text-cbp-navy dark:text-white mb-2">Langganan Newsletter</h4>
                       <p className="text-xs text-slate-500 mb-4">Dapatkan update hukum terbaru setiap minggu.</p>
                       <div className="flex gap-2">
                          <input type="email" placeholder="Email Anda" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-cbp-gold" />
                          <button className="bg-cbp-navy text-white p-2 rounded-lg hover:bg-cbp-gold transition-colors">
                             <MessageSquare className="h-4 w-4" />
                          </button>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
