
"use client";

import React from 'react';
import { PageHeader } from '@cbp/ui';
import { useSocialMediaLogic } from '@cbp/core';
import { ConnectedAccountsView } from '../../../src/components/social/organisms/ConnectedAccountsView';
import { PostComposer } from '../../../src/components/social/molecules/PostComposer';
import { SocialFeedView } from '../../../src/components/social/organisms/SocialFeedView';

export default function SocialMediaPage() {
  const { accounts, posts, toggleConnection, createPost } = useSocialMediaLogic();

  // Filter connected platforms for composer
  const connectedPlatforms = accounts.filter(a => a.isConnected).map(a => a.platform);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <PageHeader 
        title="Social Media Integration" 
        subtitle="Kelola semua akun media sosial firma dalam satu dashboard." 
      />

      {/* Top Section: Connected Accounts */}
      <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-4">Akun Terhubung</h3>
        <ConnectedAccountsView 
          accounts={accounts} 
          onToggleConnection={toggleConnection} 
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        {/* Left: Feed */}
        <div className="lg:col-span-2">
           <SocialFeedView posts={posts} />
        </div>

        {/* Right: Composer */}
        <div className="lg:col-span-1">
           <div className="sticky top-24">
             <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-4">Buat Postingan</h3>
             <PostComposer 
               onPost={createPost} 
               availablePlatforms={connectedPlatforms} 
             />
           </div>
        </div>
      </div>
    </div>
  );
}
