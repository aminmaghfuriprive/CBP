
import React from 'react';
import { QuickReplyBar } from './QuickReplyBar';
import { ChatModeSwitcher } from './ChatModeSwitcher';
import { ChatComposer } from './ChatComposer';

interface ChatInputSectionProps {
  mode: 'reply' | 'note';
  inputText: string;
  setMode: (mode: 'reply' | 'note') => void;
  setInputText: (text: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  insertQuickReply: (text: string) => void;
}

export const ChatInputSection: React.FC<ChatInputSectionProps> = ({
  mode,
  inputText,
  setMode,
  setInputText,
  handleSend,
  handleKeyDown,
  insertQuickReply
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-20">
        
      {/* 1. Quick Replies */}
      {mode === 'reply' && (
        <QuickReplyBar onSelect={insertQuickReply} />
      )}

      {/* 2. Main Input Container */}
      <div className={`p-4 transition-colors duration-300 ${mode === 'note' ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
        <ChatModeSwitcher mode={mode} onChange={setMode} />
        
        <ChatComposer 
          mode={mode}
          value={inputText}
          onChange={setInputText}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
