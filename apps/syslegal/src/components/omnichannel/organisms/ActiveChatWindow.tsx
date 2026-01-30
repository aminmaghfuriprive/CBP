
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Send, Phone, MoreVertical, Paperclip, Smile, Lock, MessageSquare, StickyNote, Zap, ArrowLeft } from 'lucide-react';
import { MessageBubble } from '../molecules/MessageBubble';
import { ChannelBadge } from '../atoms/ChannelBadge';

const QUICK_REPLIES = [
  "👋 Halo, selamat siang. Ada yang bisa kami bantu?",
  "📄 Mohon lampirkan dokumen KTP dan NPWP.",
  "📅 Kapan Bapak/Ibu bersedia untuk dijadwalkan meeting?",
  "💰 Untuk biaya layanan tersebut mulai dari Rp...",
  "✅ Baik, segera kami proses."
];

export const ActiveChatWindow: React.FC = () => {
  const { selectedConversationId, conversations, activeMessages, sendMessage, selectConversation } = useData();
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'reply' | 'note'>('reply'); 
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === selectedConversationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages, selectedConversationId]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText, mode === 'note');
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertQuickReply = (text: string) => {
    setInputText(prev => prev + text + " ");
  };

  // State: No Conversation Selected
  if (!selectedConversationId || !conversation) {
    return (
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-400">
        <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
           <MessageSquare className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">Belum ada percakapan dipilih</h3>
        <p className="text-sm">Pilih kontak dari daftar sebelah kiri untuk memulai.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative w-full">
      {/* Header */}
      <div className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Back Button (Mobile Only) */}
          <button 
            onClick={() => selectConversation('')} // Trick: select empty string to clear selection logic
            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-cbp-navy dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-cbp-navy dark:text-white ring-2 ring-slate-100 dark:ring-slate-700">
            {conversation.contactName.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-cbp-navy dark:text-white text-sm line-clamp-1">{conversation.contactName}</h3>
            <div className="flex items-center gap-2">
               <ChannelBadge type={conversation.channel} />
               <span className="text-xs text-slate-500 capitalize font-medium">{conversation.channel.toLowerCase()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-500 hover:text-cbp-navy dark:hover:text-white"><Phone className="h-4 w-4" /></Button>
           <Button variant="ghost" size="sm" className="text-slate-500 hover:text-cbp-navy dark:hover:text-white"><MoreVertical className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar" ref={scrollRef}>
        <div className="space-y-1">
           <div className="flex justify-center mb-6">
              <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">Hari Ini</span>
           </div>
           
           {activeMessages.map((msg) => (
             <MessageBubble key={msg.id} message={msg} />
           ))}
        </div>
      </div>

      {/* Input Area Wrapper */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-20">
        
        {/* Quick Replies (Only in Reply Mode) */}
        {mode === 'reply' && (
          <div className="flex gap-2 overflow-x-auto p-3 no-scrollbar border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
             <div className="flex items-center gap-1 text-[10px] font-bold text-cbp-gold uppercase tracking-wider mr-2 flex-shrink-0">
               <Zap className="h-3 w-3" /> Quick:
             </div>
             {QUICK_REPLIES.map((reply, idx) => (
               <button 
                 key={idx}
                 onClick={() => insertQuickReply(reply)}
                 className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:border-cbp-navy dark:hover:border-cbp-gold hover:text-cbp-navy dark:hover:text-cbp-gold transition-colors shadow-sm"
               >
                 {reply.length > 30 ? reply.substring(0, 30) + '...' : reply}
               </button>
             ))}
          </div>
        )}

        {/* Input Controls */}
        <div className={`p-4 transition-colors duration-300 ${mode === 'note' ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
          
          {/* Mode Switcher */}
          <div className="flex gap-4 mb-3">
             <button 
               onClick={() => setMode('reply')}
               className={`text-xs font-bold flex items-center gap-2 pb-1 transition-all ${mode === 'reply' ? 'text-cbp-navy dark:text-cbp-gold border-b-2 border-cbp-navy dark:border-cbp-gold' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <MessageSquare className="h-3 w-3" /> Reply to Client
             </button>
             <button 
               onClick={() => setMode('note')}
               className={`text-xs font-bold flex items-center gap-2 pb-1 transition-all ${mode === 'note' ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Lock className="h-3 w-3" /> Internal Note
             </button>
          </div>

          <div className={`flex items-end gap-2 p-2 rounded-xl border transition-all shadow-sm ${
            mode === 'note' 
              ? 'bg-amber-100/50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 focus-within:ring-2 focus-within:ring-amber-400/50' 
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-cbp-gold/50'
          }`}>
             <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors">
               <Paperclip className="h-5 w-5" />
             </button>
             
             <textarea 
               rows={1}
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder={mode === 'note' ? "Tulis catatan internal (tidak terlihat oleh klien)..." : "Ketik pesan balasan..."}
               className={`flex-1 bg-transparent border-none outline-none text-sm py-2 resize-none max-h-32 placeholder:text-slate-400 ${mode === 'note' ? 'text-amber-900 dark:text-amber-100' : 'text-slate-900 dark:text-white'}`}
               style={{ minHeight: '40px' }}
             />
             
             {mode === 'reply' && (
               <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors hidden sm:block">
                 <Smile className="h-5 w-5" />
               </button>
             )}

             <Button 
               onClick={handleSend} 
               disabled={!inputText.trim()} 
               className={`rounded-lg h-10 px-4 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-all font-bold ${
                 mode === 'note' 
                   ? 'bg-amber-500 hover:bg-amber-600 text-white border-transparent' 
                   : 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy'
               }`}
             >
               {mode === 'note' ? (
                 <span className="flex items-center gap-1 text-xs"><StickyNote className="h-4 w-4" /> Save</span>
               ) : (
                 <Send className="h-4 w-4 ml-0.5" />
               )}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
