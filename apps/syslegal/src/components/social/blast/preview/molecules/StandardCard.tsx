import React from 'react';
import { SocialPlatform } from '@cbp/core';
import { Globe, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { PreviewAvatar } from '../atoms/PreviewAvatar';
import { formatPreviewText } from '../utils/textUtils';

interface StandardCardProps {
  content: string;
  mediaPreview: string | null;
  platform: SocialPlatform;
}

export const StandardCard: React.FC<StandardCardProps> = ({ content, mediaPreview, platform }) => {
  const name = platform === 'LINKEDIN' ? 'CBP Corp Legal Firm' : 'CBP Law Firm Official';
  const meta = platform === 'LINKEDIN' ? '2,450 followers' : 'Law Firm • Sponsored';

  return (
    <div className="bg-white text-slate-900 border border-slate-200 rounded-md overflow-hidden max-w-[350px] mx-auto shadow-sm text-sm font-sans">
       {/* Header */}
       <div className="p-3 flex gap-2 border-b border-slate-50">
          <PreviewAvatar size="md" />
          <div>
             <p className="font-bold text-xs">{name}</p>
             <p className="text-[10px] text-slate-500">{meta}</p>
             <p className="text-[10px] text-slate-500 flex items-center gap-1">2h • <Globe className="h-2 w-2" /></p>
          </div>
       </div>

       {/* Content Text */}
       <div className="p-3 text-xs leading-relaxed whitespace-pre-wrap">
          {formatPreviewText(content)}
       </div>

       {/* Media */}
       {mediaPreview && (
         <div className="w-full bg-slate-100 aspect-video overflow-hidden">
            <img src={mediaPreview} className="w-full h-full object-cover" alt="post" />
         </div>
       )}

       {/* Footer Actions */}
       <div className="px-3 py-2 border-t border-slate-100 flex justify-between text-slate-500">
          <span className="flex items-center gap-1 text-[10px] font-bold cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
            <ThumbsUp className="h-3 w-3" /> Like
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
            <MessageSquare className="h-3 w-3" /> Comment
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
            <Share2 className="h-3 w-3" /> Share
          </span>
       </div>
    </div>
  );
};
