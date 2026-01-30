
"use client";

import React from 'react';
import { SocialPost, formatDateID } from '@cbp/core';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { Card } from '@cbp/ui';
import { ThumbsUp, Share2 } from 'lucide-react';

interface SocialFeedViewProps {
  posts: SocialPost[];
}

export const SocialFeedView: React.FC<SocialFeedViewProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Aktivitas Terkini</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} className="flex gap-4 p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" padding={false}>
             <div className="flex-shrink-0">
               <div className="flex -space-x-2">
                 {post.platforms.map((p, idx) => (
                   <div key={idx} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center z-10">
                     <SocialPlatformIcon platform={p} className="h-4 w-4" />
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="flex-1">
               <div className="flex justify-between items-start mb-1">
                 <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                   {post.status}
                 </span>
                 <span className="text-xs text-slate-400">
                   {formatDateID(post.date, { dateStyle: 'medium', timeStyle: 'short' })}
                 </span>
               </div>
               
               <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                 {post.content}
               </p>
               
               <div className="flex gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                 <div className="flex items-center gap-1.5">
                   <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Share2 className="h-3.5 w-3.5" /> {post.shares}
                 </div>
               </div>
             </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
          Belum ada postingan.
        </div>
      )}
    </div>
  );
};
