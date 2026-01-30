
"use client";

import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Conversation, Message } from '../types';
import { db } from '../db';

export const useOmnichannelLogic = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  // Queries
  const conversations = useLiveQuery(() => 
    db.conversations.orderBy('timestamp').reverse().toArray()
  ) || [];

  const activeMessages = useLiveQuery(() => 
    selectedConversationId 
      ? db.messages.where('conversationId').equals(selectedConversationId).sortBy('timestamp')
      : []
  , [selectedConversationId]) || [];

  // Actions
  const sendMessage = async (text: string) => {
    if (!selectedConversationId || !text.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId: selectedConversationId,
      text: text,
      sender: 'agent',
      timestamp: new Date().toISOString(),
      isRead: true
    };

    try {
      await db.messages.add(newMessage);
      // Update parent conversation
      await db.conversations.update(selectedConversationId, {
        lastMessage: text,
        timestamp: new Date().toISOString() // Bump to top
      });
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
    selectConversation,
    sendMessage
  };
};
