
"use client";

import React, { useState } from 'react';
import { PageHeader } from '@cbp/ui';
import { useSocialBlastLogic } from '@cbp/core';
import { OmnichannelView } from '../../../src/components/omnichannel/OmnichannelView';
import { PlatformSelector } from '../../../src/components/social/blast/PlatformSelector';
import { UnifiedComposer } from '../../../src/components/social/blast/UnifiedComposer';
import { MultiPlatformPreview } from '../../../src/components/social/blast/MultiPlatformPreview';
import { BlastHistoryTable } from '../../../src/components/social/blast/BlastHistoryTable';
import { AccountStatusWidget } from '../../../src/components/social/blast/AccountStatusWidget';
import { MessageSquare, Rocket } from 'lucide-react';

export default function SocialMediaPage() {
  const { 
    accounts, 
    history, 
    formState, 
    formActions 
  } = useSocialBlastLogic();
  
  const [activeTab, setActiveTab] = useState<'blast' | 'inbox'>('blast');

  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Social Command Center" 
        subtitle="Kelola distribusi konten massal dan komunikasi klien dalam satu pintu." 
      />

      {/* Main Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0">
        <button
          onClick={() => setActiveTab('blast')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'blast' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Rocket className="h-4 w-4" /> Compose & Blast
          {activeTab === 'blast' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('inbox')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === 'inbox' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Inbox & DM
          {activeTab === 'inbox' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* --- TAB: BLAST (OPERATIONAL DASHBOARD) --- */}
        {activeTab === 'blast' && (
            <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto pb-10">
              
              {/* Top Row: Platform Selector */}
              <div className="col-span-12">
                 <PlatformSelector 
                   accounts={accounts} 
                   selected={formState.selectedPlatforms} 
                   onToggle={formActions.togglePlatform} 
                 />
              </div>

              {/* Main Workspace (Composer + Preview) */}
              <div className="col-span-12 lg:col-span-7 h-[500px]">
                 <UnifiedComposer 
                   content={formState.content}
                   setContent={formActions.setContent}
                   mediaPreview={formState.mediaPreview}
                   onUpload={formActions.handleMediaUpload}
                   onRemoveMedia={formActions.removeMedia}
                   shortenLinks={formState.shortenLinks}
                   setShortenLinks={formActions.setShortenLinks}
                   onBlast={formActions.blastPost}
                   isBlasting={formState.isBlasting}
                   platformCount={formState.selectedPlatforms.length}
                 />
              </div>

              <div className="col-span-12 lg:col-span-5 h-[500px] flex flex-col gap-6">
                 <div className="flex-1 min-h-0">
                    <MultiPlatformPreview 
                      content={formState.content}
                      mediaPreview={formState.mediaPreview}
                      activePlatforms={formState.selectedPlatforms}
                    />
                 </div>
                 <div className="flex-shrink-0">
                    <AccountStatusWidget accounts={accounts} />
                 </div>
              </div>

              {/* Bottom Row: History */}
              <div className="col-span-12">
                 <BlastHistoryTable history={history} />
              </div>
            </div>
        )}

        {/* --- TAB: INBOX --- */}
        {activeTab === 'inbox' && (
            <div className="h-full">
               <OmnichannelView />
            </div>
        )}
      </div>
    </div>
  );
}
