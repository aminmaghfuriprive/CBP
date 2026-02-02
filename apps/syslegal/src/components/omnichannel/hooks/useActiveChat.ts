"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@cbp/core';

export const useActiveChat = () => {
  const { selectedConversationId, conversations, activeMessages, sendMessage, selectConversation } = useData();
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'reply' | 'note'>('reply');
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === selectedConversationId);

  // Auto-scroll to bottom when messages change
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

  const insertQuickReply = (text: string) => {
    setInputText(prev => prev + text + " ");
  };

  // Helper specific for UI event handling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    // State
    selectedConversationId,
    conversation,
    activeMessages,
    inputText,
    mode,
    scrollRef,
    
    // Setters
    setInputText,
    setMode,
    selectConversation,

    // Actions
    handleSend,
    handleKeyDown,
    insertQuickReply
  };
};