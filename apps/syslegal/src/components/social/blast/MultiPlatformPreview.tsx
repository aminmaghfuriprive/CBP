import React from 'react';
import { Card } from '@cbp/ui';
import { SocialPlatform } from '@cbp/core';
import { usePreviewState } from './preview/hooks/usePreviewState';
import { PlatformSelector } from './preview/molecules/PlatformSelector';
import { InstagramCard } from './preview/molecules/InstagramCard';
import { StandardCard } from './preview/molecules/StandardCard';

interface MultiPlatformPreviewProps {
  content: string;
  mediaPreview: string | null;
  activePlatforms?: SocialPlatform[];
}

export const MultiPlatformPreview: React.FC<MultiPlatformPreviewProps> = ({ content, mediaPreview }) => {
  // 1. Logic Layer: State Management via Custom Hook
  const { activeTab, setActiveTab } = usePreviewState('INSTAGRAM');

  return (
    <Card className="h-full bg-slate-100 dark:bg-black/40 border-none shadow-inner flex flex-col">
      {/* 2. Control Layer: Tab Selection */}
      <div className="flex justify-center mb-6">
         <PlatformSelector 
           activeTab={activeTab} 
           onTabChange={setActiveTab} 
         />
      </div>

      {/* 3. Presentation Layer: Conditional Rendering based on Molecules */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto">
         <div className="transform scale-90 sm:scale-100 transition-transform duration-300">
            {activeTab === 'INSTAGRAM' ? (
              <InstagramCard 
                content={content} 
                mediaPreview={mediaPreview} 
              />
            ) : (
              // Facebook & LinkedIn menggunakan struktur StandardCard
              <StandardCard 
                platform={activeTab}
                content={content} 
                mediaPreview={mediaPreview} 
              />
            )}
         </div>
      </div>
      
      <div className="text-center mt-4 text-xs text-slate-400">
         *Tampilan hanyalah simulasi visual.
      </div>
    </Card>
  );
};
