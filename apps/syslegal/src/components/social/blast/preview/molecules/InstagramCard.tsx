import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Send } from 'lucide-react';
import { PreviewAvatar } from '../atoms/PreviewAvatar';
import { formatPreviewText } from '../utils/textUtils';

interface InstagramCardProps {
  content: string;
  mediaPreview: string | null;
}

export const InstagramCard: React.FC<InstagramCardProps> = ({ content, mediaPreview }) => {
  return (
    <div className="bg-white text-black border border-slate-200 rounded-md overflow-hidden max-w-[320px] mx-auto shadow-sm text-sm font-sans">
      {/* Header */}
      <div className="p-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
             <div className="w-full h-full bg-white rounded-full p-[2px]">
                <PreviewAvatar size="sm" className="!w-full !h-full" />
             </div>
          </div>
          <span className="font-bold text-xs">cbpcorp.id</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-600" />
      </div>
      
      {/* Image Area */}
      <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
        {mediaPreview ? (
          <img src={mediaPreview} className="w-full h-full object-cover" alt="post" />
        ) : (
          <span className="text-slate-400 text-xs">Image Preview</span>
        )}
      </div>

      {/* Action & Caption */}
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
             {formatPreviewText(content)}
           </p>
           <p className="text-[10px] text-slate-400 uppercase mt-1">2 HOURS AGO</p>
        </div>
      </div>
    </div>
  );
};
