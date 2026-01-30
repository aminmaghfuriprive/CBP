
"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { SearchInput } from '@cbp/ui';
import { ChatListItem } from '../molecules/ChatListItem';
import { Filter } from 'lucide-react';

export const ConversationList: React.FC = () => {
  const { conversations, selectedConversationId, selectConversation } = useData();
  const [search, setSearch] = useState('');
  const [filterChannel, setFilterChannel] = useState<'ALL' | 'WHATSAPP' | 'EMAIL'>('ALL');

  const filtered = conversations.filter(c => {
    const matchesSearch = c.contactName.toLowerCase().includes(search.toLowerCase());
    const matchesChannel = filterChannel === 'ALL' || c.channel === filterChannel;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-full md:w-80 lg:w-96">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <h2 className="font-bold text-cbp-navy dark:text-white text-lg">Pesan Masuk</h2>
        <SearchInput 
          placeholder="Cari kontak..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
           {['ALL', 'WHATSAPP', 'EMAIL'].map((f) => (
             <button
               key={f}
               onClick={() => setFilterChannel(f as any)}
               className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${
                 filterChannel === f 
                   ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold' 
                   : 'text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
               }`}
             >
               {f === 'ALL' ? 'Semua' : f}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map(c => (
            <ChatListItem 
              key={c.id} 
              conversation={c} 
              isActive={selectedConversationId === c.id}
              onClick={() => selectConversation(c.id)}
            />
          ))
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">
            Tidak ada percakapan.
          </div>
        )}
      </div>
    </div>
  );
};
