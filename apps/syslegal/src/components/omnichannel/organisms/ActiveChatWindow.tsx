
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Send, Phone, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { MessageBubble } from '../molecules/MessageBubble';
import { ChannelBadge } from '../atoms/ChannelBadge';

export const ActiveChatWindow: React.FC = () => {
  const { selectedConversationId, conversations, activeMessages, sendMessage } = useData();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === selectedConversationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages, selectedConversationId]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedConversationId || !conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-400">
        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
           <Send className="h-8 w-8 text-slate-400" />
        </div>
        <p>Pilih percakapan untuk mulai merespons.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-cbp-navy dark:text-white">
            {conversation.contactName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-cbp-navy dark:text-white text-sm">{conversation.contactName}</h3>
            <div className="flex items-center gap-2">
               <ChannelBadge type={conversation.channel} />
               <span className="text-xs text-slate-500 capitalize">{conversation.channel.toLowerCase()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-500 hover:text-cbp-navy dark:hover:text-white"><Phone className="h-4 w-4" /></Button>
           <Button variant="ghost" size="sm" className="text-slate-500 hover:text-cbp-navy dark:hover:text-white"><MoreVertical className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
        <div className="space-y-2">
           {/* Date Separator Example */}
           <div className="flex justify-center mb-6">
              <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">Hari Ini</span>
           </div>
           
           {activeMessages.map((msg) => (
             <MessageBubble key={msg.id} message={msg} />
           ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-cbp-gold/50 transition-all">
           <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors">
             <Paperclip className="h-5 w-5" />
           </button>
           <textarea 
             rows={1}
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder="Ketik pesan..."
             className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-slate-900 dark:text-white resize-none max-h-32"
             style={{ minHeight: '40px' }}
           />
           <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors hidden sm:block">
             <Smile className="h-5 w-5" />
           </button>
           <Button 
             onClick={handleSend} 
             disabled={!inputText.trim()} 
             className="rounded-lg h-10 w-10 p-0 flex items-center justify-center bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
           >
             <Send className="h-4 w-4 ml-0.5" />
           </Button>
        </div>
        <div className="text-center mt-2">
           <span className="text-[10px] text-slate-400">Tekan Enter untuk mengirim, Shift+Enter untuk baris baru.</span>
        </div>
      </div>
    </div>
  );
};
