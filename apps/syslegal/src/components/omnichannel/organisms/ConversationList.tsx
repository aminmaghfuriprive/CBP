
"use client";

import React, { useState } from 'react';
import { useData } from '@cbp/core';
import { SearchInput } from '@cbp/ui';
import { ChatListItem } from '../molecules/ChatListItem';
import { Filter, Inbox, Mail, MessageCircle, Instagram } from 'lucide-react';

export const ConversationList: React.FC = () => {
  const { conversations, selectedConversationId, selectConversation } = useData();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNREAD' | 'WHATSAPP' | 'EMAIL'>('ALL');

  // Filter Logic
  const filtered = conversations.filter(c => {
    const matchesSearch = c.contactName.toLowerCase().includes(search.toLowerCase()) || 
                          c.lastMessage.toLowerCase().includes(search.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === 'UNREAD') matchesTab = c.unreadCount > 0;
    else if (activeTab === 'WHATSAPP') matchesTab = c.channel === 'WHATSAPP';
    else if (activeTab === 'EMAIL') matchesTab = c.channel === 'EMAIL';

    return matchesSearch && matchesTab;
  });

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-full md:w-80 lg:w-96`}>
      
      {/* 1. Header & Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-3">
           <h2 className="font-bold text-cbp-navy dark:text-white text-lg flex items-center gap-2">
             <Inbox className="h-5 w-5" /> Inbox
           </h2>
           <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full font-bold text-slate-500">
             {conversations.length}
           </span>
        </div>
        <SearchInput 
          placeholder="Cari pesan atau kontak..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-sm"
        />
      </div>

      {/* 2. Filter Tabs (Horizontal Scroll) */}
      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
           {[
             { id: 'ALL', label: 'All', icon: Inbox },
             { id: 'UNREAD', label: 'Unread', icon: Filter },
             { id: 'WHATSAPP', label: 'WA', icon: MessageCircle },
             { id: 'EMAIL', label: 'Email', icon: Mail },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`
                 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border
                 ${activeTab === tab.id 
                   ? 'bg-cbp-navy text-white border-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy dark:border-cbp-gold shadow-sm' 
                   : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-cbp-navy/30'
                 }
               `}
             >
               <tab.icon className="h-3 w-3" /> {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* 3. Conversation List */}
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
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 p-6 text-center">
            <Inbox className="h-10 w-10 mb-3 opacity-20" />
            <p className="text-sm font-medium">Tidak ada pesan ditemukan.</p>
            <p className="text-xs mt-1">Coba ubah filter pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
