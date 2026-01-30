
import React from 'react';
import { Message, formatDateID } from '@cbp/core';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAgent = message.sender === 'agent';

  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm relative group ${
        isAgent 
          ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy rounded-br-none' 
          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isAgent ? 'text-slate-300 dark:text-slate-700' : 'text-slate-400'}`}>
          <span>{formatDateID(message.timestamp, { hour: '2-digit', minute: '2-digit' })}</span>
          {isAgent && (
             message.isRead ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />
          )}
        </div>
      </div>
    </div>
  );
};
