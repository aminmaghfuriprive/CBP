
"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePublicArticles } from '@/components/insights/hooks/usePublicArticles';
import { ArticleCategoryBadge } from '@/components/insights/atoms/ArticleCategoryBadge';
import { ScrollProgress } from '@/components/insights/atoms/ScrollProgress';
import { TableOfContents } from '@/components/insights/molecules/TableOfContents';
import { CommentSection } from '@/components/insights/organisms/CommentSection';
import { CategorySidebar } from '@/components/insights/molecules/CategorySidebar';
import { NewsletterCard } from '@/components/insights/molecules/NewsletterCard';
import { Button, SearchInput } from '@cbp/ui';
import { ArrowLeft, Facebook, Twitter, Linkedin, Share2, Clock, CalendarDays, UserCircle, BookOpen, Search } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getArticleById, getRelatedArticles, setSelectedCategory } = usePublicArticles();
  
  const [localSearch, setLocalSearch] = useState('');

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
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    router.push('/insights');
  };

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localSearch.trim()) {
      // Redirect ke halaman insights dengan query search (Simulasi filter logic di page insights akan menangkap ini jika diimplementasikan full, saat ini redirect basic)
      // Untuk tujuan UI ini, kita redirect ke halaman utama insights dulu
      router.push('/insights');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-32">
      <ScrollProgress />
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
         <Image 
           src={article.imageUrl} 
           alt={article.title} 
           fill
           className="object-cover"
           priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30"></div>
         
         <div className="absolute inset-0 flex flex-col">
            {/* Tombol Kembali Dihapus dari sini sesuai permintaan */}
            <div className="p-6 md:p-8"></div> 

            <div className="mt-auto max-w-5xl mx-auto w-full px-6 md:px-8 pb-16 md:pb-20 text-center">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                  <div className="flex justify-center" onClick={() => handleCategoryClick(article.category)}>
                    <ArticleCategoryBadge 
                      category={article.category} 
                      className="bg-cbp-gold text-cbp-navy border-none shadow-lg shadow-cbp-gold/20 cursor-pointer hover:bg-white transition-colors" 
                    />
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-sm max-w-4xl mx-auto">
                    {article.title}
                  </h1>

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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --- LEFT SIDEBAR (STICKY) --- */}
            <div className="hidden lg:block lg:col-span-3 sticky top-32">
               <div className="space-y-6">
                  
                  {/* Tombol Kembali (Dipindahkan ke sini) */}
                  <button 
                    onClick={() => router.back()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 font-bold text-sm hover:border-cbp-gold hover:text-cbp-navy dark:hover:text-cbp-gold hover:shadow-md transition-all group"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Daftar
                  </button>

                  {/* Share Component */}
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                     <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-3 text-center">Bagikan</h4>
                     <div className="flex justify-center gap-2">
                        <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-[#1877F2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"><Facebook className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-[#1DA1F2] hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all"><Twitter className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"><Linkedin className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"><Share2 className="h-4 w-4" /></button>
                     </div>
                  </div>

                  {/* Table of Contents */}
                  <TableOfContents />
               </div>
            </div>

            {/* --- CENTER (SCROLLABLE CONTENT) --- */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-t-3xl shadow-xl p-8 md:p-10 border border-slate-100 dark:border-slate-800 min-h-screen">
               <article 
                  id="article-content"
                  className="
                  max-w-none prose dark:prose-invert 
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-cbp-navy dark:prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-32
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-32
                  prose-p:text-[16px] prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:mb-6
                  prose-li:text-slate-600 dark:prose-li:text-slate-300
                  prose-strong:text-cbp-navy dark:prose-strong:text-white
                  prose-blockquote:border-l-4 prose-blockquote:border-cbp-gold prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/30 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl
                  first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-cbp-navy dark:first-letter:text-cbp-gold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]
               ">
                  <p className="lead text-lg text-slate-800 dark:text-slate-200 font-medium italic mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 leading-relaxed font-serif">
                    "{article.excerpt}"
                  </p>
                  
                  {article.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  ) : (
                    <p>Konten lengkap artikel ini sedang dalam proses penyuntingan.</p>
                  )}
               </article>

               {/* Mobile Share */}
               <div className="lg:hidden mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4 text-center">Bagikan Artikel</h4>
                  <div className="flex justify-center gap-4">
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800"><Facebook className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800"><Twitter className="h-5 w-5" /></button>
                     <button className="p-3 rounded-full bg-slate-100 dark:bg-slate-800"><Share2 className="h-5 w-5" /></button>
                  </div>
               </div>

               <CommentSection />
            </div>

            {/* --- RIGHT SIDEBAR (STICKY GROUP) --- */}
            {/* 3 Components Stacked: Search, Categories, Related, Newsletter */}
            <div className="hidden lg:block lg:col-span-3 sticky top-32 space-y-6">
               
               {/* 0. Search Box (New Feature) */}
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                  <h4 className="font-serif font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Search className="h-3.5 w-3.5 text-cbp-gold" /> Pencarian
                  </h4>
                  <SearchInput 
                    placeholder="Cari artikel lain..." 
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyDown={handleSearchKey}
                    className="w-full text-sm"
                  />
               </div>

               {/* 1. Categories Card */}
               <CategorySidebar 
                 onSelect={handleCategoryClick} 
                 selectedCategory={article.category} 
               />

               {/* 2. Related Articles Card */}
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                  <h3 className="font-serif font-bold text-cbp-navy dark:text-white mb-4 flex items-center gap-2 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-3">
                    <BookOpen className="h-3.5 w-3.5 text-cbp-gold" /> Bacaan Terkait
                  </h3>
                  {relatedArticles.length > 0 ? (
                    <div className="space-y-4">
                      {relatedArticles.map(rel => (
                        <div key={rel.id} className="group cursor-pointer flex flex-col gap-2" onClick={() => router.push(`/insights/${rel.id}`)}>
                           <div className="relative h-28 w-full rounded-lg overflow-hidden">
                              <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                           </div>
                           <div>
                             <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-snug group-hover:text-cbp-gold transition-colors line-clamp-2">
                               {rel.title}
                             </h4>
                             <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wide">{rel.date}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">Tidak ada artikel terkait lainnya.</p>
                  )}
               </div>

               {/* 3. Newsletter Subscription */}
               <NewsletterCard />
            </div>

         </div>
      </div>
    </div>
  );
}
