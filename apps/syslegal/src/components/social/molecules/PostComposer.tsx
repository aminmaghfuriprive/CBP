
"use client";

import React, { useState } from 'react';
import { Card, Button } from '@cbp/ui';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { SocialPlatform } from '@cbp/core';
import { Send, Image as ImageIcon } from 'lucide-react';

interface PostComposerProps {
  onPost: (content: string, platforms: SocialPlatform[]) => void;
  availablePlatforms: SocialPlatform[];
}

export const PostComposer: React.FC<PostComposerProps> = ({ onPost, availablePlatforms }) => {
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([]);

  const togglePlatform = (p: SocialPlatform) => {
    setSelectedPlatforms(prev => 
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  const handlePost = () => {
    if (!content || selectedPlatforms.length === 0) return;
    onPost(content, selectedPlatforms);
    setContent('');
    setSelectedPlatforms([]);
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">Pilih Platform</label>
        <div className="flex gap-3">
          {availablePlatforms.map(p => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={`p-2 rounded-lg border transition-all ${
                selectedPlatforms.includes(p) 
                  ? 'bg-cbp-navy/10 border-cbp-navy dark:bg-cbp-gold/20 dark:border-cbp-gold ring-1 ring-cbp-navy dark:ring-cbp-gold' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <SocialPlatformIcon platform={p} className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      <textarea 
        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-cbp-navy/20 dark:focus:ring-cbp-gold/20 text-sm mb-4 min-h-[100px] text-slate-900 dark:text-white placeholder:text-slate-400"
        placeholder="Apa yang ingin Anda bagikan hari ini?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cbp-navy">
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button 
          onClick={handlePost} 
          disabled={!content || selectedPlatforms.length === 0}
          className="gap-2"
        >
          <Send className="h-4 w-4" /> Posting Sekarang
        </Button>
      </div>
    </Card>
  );
};
