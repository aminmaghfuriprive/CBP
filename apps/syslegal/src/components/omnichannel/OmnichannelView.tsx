
"use client";

import React from 'react';
import { ConversationList } from './organisms/ConversationList';
import { ActiveChatWindow } from './organisms/ActiveChatWindow';
import { ContextPanel } from './organisms/ContextPanel';

export const OmnichannelView: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
      {/* Panel 1: List */}
      <ConversationList />
      
      {/* Panel 2: Chat */}
      <ActiveChatWindow />
      
      {/* Panel 3: Context (Hidden on small screens) */}
      <ContextPanel />
    </div>
  );
};
