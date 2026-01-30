
"use client";

import React, { useState } from 'react';
import { PageHeader } from '@cbp/ui';
import { useSocialMediaLogic } from '@cbp/core';
import { ConnectedAccountsView } from '../../../src/components/social/organisms/ConnectedAccountsView';
import { PostComposer } from '../../../src/components/social/molecules/PostComposer';
import { SocialFeedView } from '../../../src/components/social/organisms/SocialFeedView';
import { OmnichannelView } from '../../../src/components/omnichannel/OmnichannelView';
import { AyrshareIntegrationView } from '../../../src/components/ayrshare/AyrshareIntegrationView';
import { MessageSquare, Share2, Radio } from 'lucide-react';

export default function SocialMediaPage() {
  const { accounts, posts, toggleConnection, createPost } = useSocialMediaLogic();
  const [activeTab, setActiveTab] = useState<'social' | 'inbox' | 'ayrshare'>('social');

  // Filter connected platforms for composer
  const connectedPlatforms = accounts.filter(a => a.isConnected).map(a => a.platform);

  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Sosial & Komunikasi" 
        subtitle="Kelola media sosial terpadu, integrasi API Ayrshare, dan pesan masuk." 
      />

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-6 flex-shrink-0 overflow-x-auto">
        <button
          onClick={() => setActiveTab('social')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'social' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Share2 className="h-4 w-4" /> Media Sosial
          {activeTab === 'social' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('ayrshare')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'ayrshare' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Radio className="h-4 w-4" /> Integrasi Ayrshare
          {activeTab === 'ayrshare' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>

        <button
          onClick={() => setActiveTab('inbox')}
          className={`pb-3 px-2 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
            activeTab === 'inbox' 
              ? 'text-cbp-navy dark:text-cbp-gold' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Inbox Pesan
          {activeTab === 'inbox' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cbp-gold rounded-t-full"></div>}
        </button>
      </div>

      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'social' && (
            <div className="space-y-8 max-w-6xl mx-auto pb-10">
              <section>
                <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-4">Akun Terhubung</h3>
                <ConnectedAccountsView 
                  accounts={accounts} 
                  onToggleConnection={toggleConnection} 
                />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SocialFeedView posts={posts} />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-4">
                    <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-4">Buat Postingan</h3>
                    <PostComposer 
                      onPost={createPost} 
                      availablePlatforms={connectedPlatforms} 
                    />
                  </div>
                </div>
              </div>
            </div>
        )}

        {activeTab === 'ayrshare' && (
           <div className="max-w-6xl mx-auto pb-10">
             <AyrshareIntegrationView />
           </div>
        )}

        {activeTab === 'inbox' && (
            <div className="h-full">
               <OmnichannelView />
            </div>
        )}
      </div>
    </div>
  );
}
