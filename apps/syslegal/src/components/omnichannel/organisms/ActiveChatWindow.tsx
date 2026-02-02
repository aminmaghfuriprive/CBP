
"use client";

import React from 'react';
import { useActiveChat } from '../hooks/useActiveChat';

// Molecules (Atomic Components)
import { ChatEmptyState } from '../molecules/ChatEmptyState';
import { ChatHeader } from '../molecules/ChatHeader';
import { ChatHistory } from '../molecules/ChatHistory';
import { ChatInputSection } from '../molecules/ChatInputSection';

export const ActiveChatWindow: React.FC = () => {
  // Logic Layer (Hook)
  const {
    selectedConversationId,
    conversation,
    activeMessages,
    inputText,
    mode,
    scrollRef,
    setInputText,
    setMode,
    selectConversation,
    handleSend,
    handleKeyDown,
    insertQuickReply
  } = useActiveChat();

  // 1. State: No Conversation Selected (Empty View)
  if (!selectedConversationId || !conversation) {
    return <ChatEmptyState />;
  }

  // 2. Main Chat Interface
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative w-full">
      {/* Header Section */}
      <ChatHeader 
        conversation={conversation} 
        onBack={() => selectConversation('')} 
      />

      {/* Scrollable Messages Area */}
      <ChatHistory 
        ref={scrollRef} 
        messages={activeMessages} 
      />

      {/* Interactive Input Section */}
      <ChatInputSection 
        mode={mode}
        inputText={inputText}
        setMode={setMode}
        setInputText={setInputText}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        insertQuickReply={insertQuickReply}
      />
    </div>
  );
};
