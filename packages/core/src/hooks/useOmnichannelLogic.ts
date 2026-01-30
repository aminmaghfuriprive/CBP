
"use client";

import { useState, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Conversation, Message, ClientData, CaseData } from '../types';
import { db } from '../db';

export const useOmnichannelLogic = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  // 1. Queries
  const conversations = useLiveQuery(() => 
    db.conversations.orderBy('timestamp').reverse().toArray()
  ) || [];

  const activeMessages = useLiveQuery(() => 
    selectedConversationId 
      ? db.messages.where('conversationId').equals(selectedConversationId).sortBy('timestamp')
      : []
  , [selectedConversationId]) || [];

  // 2. Context Resolver (CRM Intelligence)
  const currentContext = useLiveQuery(async () => {
    if (!selectedConversationId) return null;
    
    const conv = await db.conversations.get(selectedConversationId);
    if (!conv) return null;

    let client: ClientData | undefined;
    let activeCases: CaseData[] = [];

    // Jika conversation sudah di-link ke Client ID
    if (conv.relatedClientId) {
      client = await db.clients.get(conv.relatedClientId);
    } 
    // Jika belum, coba cari berdasarkan nama (simple matching)
    else {
      client = await db.clients.where('name').equalsIgnoreCase(conv.contactName).first();
    }

    if (client) {
      activeCases = await db.cases.where('clientName').equals(client.name).toArray();
    }

    return {
      client,
      activeCases,
      conversation: conv
    };
  }, [selectedConversationId]);

  // 3. Actions
  const sendMessage = async (text: string, isInternal: boolean = false) => {
    if (!selectedConversationId || !text.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId: selectedConversationId,
      text: text,
      sender: 'agent',
      timestamp: new Date().toISOString(),
      isRead: true,
      isInternal // Support Internal Notes
    };

    try {
      await db.messages.add(newMessage);
      
      // Hanya update 'lastMessage' jika bukan internal note, agar klien tidak bingung
      // Atau tetap update tapi kasih prefix [Note]
      if (!isInternal) {
        await db.conversations.update(selectedConversationId, {
          lastMessage: text,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const markAsRead = async (convId: string) => {
    try {
      await db.conversations.update(convId, { unreadCount: 0 });
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const selectConversation = (id: string) => {
    setSelectedConversationId(id);
    markAsRead(id);
  };

  return {
    conversations,
    activeMessages,
    selectedConversationId,
    currentContext, // New: Data CRM untuk Panel Kanan
    selectConversation,
    sendMessage
  };
};
