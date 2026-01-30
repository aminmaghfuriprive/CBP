
"use client";

import React, { useEffect } from 'react';
import { useData } from '@cbp/core';
import { ConversationList } from './organisms/ConversationList';
import { ActiveChatWindow } from './organisms/ActiveChatWindow';
import { ContextPanel } from './organisms/ContextPanel';

export const OmnichannelView: React.FC = () => {
  const { selectedConversationId, selectConversation } = useData();

  // Hacky way to ensure we can 'deselect' conversation on mobile back button
  // Real implementation might use proper router query params or separate view state
  // But context state is fine for this demo.
  useEffect(() => {
    // Optional: Reset selection on mount if you want fresh start
    // selectConversation(''); 
  }, []);

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
      
      {/* Panel 1: List (Hidden on mobile if chat selected) */}
      <div className={`${selectedConversationId ? 'hidden md:flex' : 'flex'} w-full md:w-auto`}>
         <ConversationList />
      </div>
      
      {/* Panel 2: Chat (Hidden on mobile if NO chat selected) */}
      <div className={`${!selectedConversationId ? 'hidden md:flex' : 'flex'} flex-1 border-r border-slate-200 dark:border-slate-800 min-w-0`}>
         <ActiveChatWindow />
      </div>
      
      {/* Panel 3: Context (Hidden on small/medium screens) */}
      <ContextPanel />
    </div>
  );
};
