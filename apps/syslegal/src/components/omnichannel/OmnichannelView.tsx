
"use client";

import React from 'react';
import { ConversationList } from './organisms/ConversationList';
import { ActiveChatWindow } from './organisms/ActiveChatWindow';

export const OmnichannelView: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
      <ConversationList />
      <ActiveChatWindow />
    </div>
  );
};
