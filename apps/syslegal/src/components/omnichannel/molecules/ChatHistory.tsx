
import React, { forwardRef } from 'react';
import { Message } from '@cbp/core';
import { MessageBubble } from './MessageBubble';

interface ChatHistoryProps {
  messages: Message[];
}

export const ChatHistory = forwardRef<HTMLDivElement, ChatHistoryProps>(({ messages }, ref) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar" ref={ref}>
      <div className="space-y-1">
         <div className="flex justify-center mb-6">
            <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">
              Hari Ini
            </span>
         </div>
         
         {messages.map((msg) => (
           <MessageBubble key={msg.id} message={msg} />
         ))}
      </div>
    </div>
  );
});

ChatHistory.displayName = 'ChatHistory';
