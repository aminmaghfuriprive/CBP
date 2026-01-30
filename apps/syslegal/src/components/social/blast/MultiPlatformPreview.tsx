
import React, { useState } from 'react';
import { Card } from '@cbp/ui';
import { SocialPlatform } from '@cbp/core';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { MoreHorizontal, Heart, MessageCircle, Send, Globe, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface MultiPlatformPreviewProps {
  content: string;
  mediaPreview: string | null;
  activePlatforms: SocialPlatform[];
}

export const MultiPlatformPreview: React.FC<MultiPlatformPreviewProps> = ({ content, mediaPreview }) => {
  const [tab, setTab] = useState<SocialPlatform>('INSTAGRAM');

  const formatText = (text: string) => {
    if (!text) return <span className="text-slate-400 italic">Preview text akan muncul di sini...</span>;
    return text;
  };

  const renderInstagram = () => (
    <div className="bg-white text-black border border-slate-200 rounded-md overflow-hidden max-w-[320px] mx-auto shadow-sm text-sm">
      <div className="p-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
             <div className="w-full h-full bg-white rounded-full p-[2px]">
                <img src="/favicon.ico" className="w-full h-full rounded-full bg-slate-200" alt="avatar" />
             </div>
          </div>
          <span className="font-bold text-xs">cbpcorp.id</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-600" />
      </div>
      
      <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
        {mediaPreview ? (
          <img src={mediaPreview} className="w-full h-full object-cover" alt="post" />
        ) : (
          <span className="text-slate-400 text-xs">Image Preview</span>
        )}
      </div>

      <div className="p-3">
        <div className="flex justify-between mb-2">
           <div className="flex gap-3">
             <Heart className="h-5 w-5" />
             <MessageCircle className="h-5 w-5" />
             <Send className="h-5 w-5" />
           </div>
           <div className="w-4 h-5 border-black"></div>
        </div>
        <div className="space-y-1">
           <p className="font-bold text-xs">1,234 likes</p>
           <p className="text-xs leading-snug">
             <span className="font-bold mr-1">cbpcorp.id</span>
             {formatText(content)}
           </p>
           <p className="text-[10px] text-slate-400 uppercase mt-1">2 HOURS AGO</p>
        </div>
      </div>
    </div>
  );

  const renderLinkedIn = () => (
    <div className="bg-white text-slate-900 border border-slate-200 rounded-md overflow-hidden max-w-[350px] mx-auto shadow-sm text-sm font-sans">
       <div className="p-3 flex gap-2 border-b border-slate-50">
          <div className="w-10 h-10 rounded bg-slate-200">
             <img src="/favicon.ico" className="w-full h-full rounded object-cover" alt="avatar" />
          </div>
          <div>
             <p className="font-bold text-xs">CBP Corp Legal Firm</p>
             <p className="text-[10px] text-slate-500">2,450 followers</p>
             <p className="text-[10px] text-slate-500 flex items-center gap-1">2h • <Globe className="h-2 w-2" /></p>
          </div>
       </div>
       <div className="p-3 text-xs leading-relaxed">
          {formatText(content)}
       </div>
       {mediaPreview && (
         <div className="w-full bg-slate-100 aspect-video overflow-hidden">
            <img src={mediaPreview} className="w-full h-full object-cover" alt="post" />
         </div>
       )}
       <div className="px-3 py-2 border-t border-slate-100 flex justify-between text-slate-500">
          <span className="flex items-center gap-1 text-[10px] font-bold"><ThumbsUp className="h-3 w-3" /> Like</span>
          <span className="flex items-center gap-1 text-[10px] font-bold"><MessageSquare className="h-3 w-3" /> Comment</span>
          <span className="flex items-center gap-1 text-[10px] font-bold"><Share2 className="h-3 w-3" /> Share</span>
       </div>
    </div>
  );

  return (
    <Card className="h-full bg-slate-100 dark:bg-black/40 border-none shadow-inner flex flex-col">
      <div className="flex justify-center mb-6">
         <div className="bg-white dark:bg-slate-800 p-1 rounded-lg inline-flex shadow-sm border border-slate-200 dark:border-slate-700">
            {['INSTAGRAM', 'LINKEDIN', 'FACEBOOK'].map((p) => (
              <button
                key={p}
                onClick={() => setTab(p as SocialPlatform)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  tab === p 
                    ? 'bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <SocialPlatformIcon platform={p as SocialPlatform} className="h-4 w-4" />
              </button>
            ))}
         </div>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-y-auto">
         <div className="transform scale-90 sm:scale-100 transition-transform">
            {tab === 'INSTAGRAM' && renderInstagram()}
            {tab === 'LINKEDIN' && renderLinkedIn()}
            {tab === 'FACEBOOK' && renderLinkedIn()} 
         </div>
      </div>
      
      <div className="text-center mt-4 text-xs text-slate-400">
         *Tampilan hanyalah simulasi visual.
      </div>
    </Card>
  );
};
