
import React from 'react';
import { Conversation, formatDateID } from '@cbp/core';
import { ChannelBadge } from '../atoms/ChannelBadge';

interface ChatListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ conversation, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
        isActive ? 'bg-slate-50 dark:bg-slate-800 border-l-4 border-l-cbp-navy dark:border-l-cbp-gold' : 'border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="font-bold text-sm text-cbp-navy dark:text-white truncate max-w-[140px]">
          {conversation.contactName}
        </div>
        <span className="text-[10px] text-slate-400 whitespace-nowrap">
          {formatDateID(conversation.timestamp, { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <div className="flex justify-between items-end">
        <p className={`text-xs truncate max-w-[180px] ${conversation.unreadCount > 0 ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
          {conversation.lastMessage}
        </p>
        <div className="flex items-center gap-2">
          {conversation.unreadCount > 0 && (
            <span className="h-4 min-w-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
          <ChannelBadge type={conversation.channel} />
        </div>
      </div>
    </div>
  );
};
