
import React from 'react';
import { Message, formatDateID } from '@cbp/core';
import { Check, CheckCheck, Lock, EyeOff } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAgent = message.sender === 'agent';
  const isInternal = message.isInternal;
  const timeString = formatDateID(message.timestamp, { hour: '2-digit', minute: '2-digit' });

  // 1. Tampilan Khusus Internal Note
  if (isInternal) {
    return (
      <div className="flex justify-end mb-4 px-4 sm:px-12 opacity-90">
        <div className="max-w-[90%] sm:max-w-[80%] rounded-xl p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 shadow-sm relative text-sm">
          <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-amber-200/50 dark:border-amber-800/50">
             <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <Lock className="h-3 w-3" /> Internal Note
             </div>
             <span className="text-[10px] text-amber-600/60 dark:text-amber-500/60 ml-auto flex items-center gap-1">
                <EyeOff className="h-3 w-3" /> Hidden from client
             </span>
          </div>
          <p className="italic leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <div className="text-[9px] text-amber-600/50 dark:text-amber-500/50 text-right mt-1">
             {timeString} • {message.sender}
          </div>
        </div>
      </div>
    );
  }

  // 2. Tampilan Chat Standar (User vs Agent)
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm relative group transition-all ${
        isAgent 
          ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy rounded-br-none' 
          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isAgent ? 'text-slate-300 dark:text-slate-700' : 'text-slate-400'}`}>
          <span>{timeString}</span>
          {isAgent && (
             message.isRead ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />
          )}
        </div>
      </div>
    </div>
  );
};
