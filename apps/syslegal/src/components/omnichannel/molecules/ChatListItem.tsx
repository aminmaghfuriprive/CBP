
import React from 'react';
import { Conversation, formatDateID } from '@cbp/core';
import { ChannelBadge } from '../atoms/ChannelBadge';
import { User } from 'lucide-react';

interface ChatListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ conversation, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer transition-all duration-200 group
        ${isActive 
          ? 'bg-blue-50/50 dark:bg-slate-800/80' 
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-white dark:bg-slate-900'
        }
      `}
    >
      {/* Active Indicator Strip */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cbp-navy dark:bg-cbp-gold rounded-r-md"></div>
      )}

      <div className="flex gap-3">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold border-2 
            ${isActive ? 'border-cbp-navy dark:border-cbp-gold text-cbp-navy dark:text-cbp-gold bg-white dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500'}
          `}>
            {conversation.contactName.charAt(0).toUpperCase()}
          </div>
          {/* Channel Icon overlaid on Avatar */}
          <div className="absolute -bottom-1 -right-1 shadow-sm rounded-full bg-white dark:bg-slate-900 p-0.5">
             <ChannelBadge type={conversation.channel} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-1">
            <h4 className={`text-sm truncate pr-2 ${conversation.unreadCount > 0 ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
              {conversation.contactName}
            </h4>
            <span className={`text-[10px] whitespace-nowrap ${conversation.unreadCount > 0 ? 'text-cbp-gold font-bold' : 'text-slate-400'}`}>
              {formatDateID(conversation.timestamp, { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <p className={`text-xs truncate pr-4 max-w-[180px] leading-relaxed ${conversation.unreadCount > 0 ? 'font-semibold text-slate-800 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
              {conversation.lastMessage}
            </p>
            
            {conversation.unreadCount > 0 && (
              <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-in zoom-in duration-300">
                {conversation.unreadCount}
              </span>
            )}
          </div>
          
          {/* Tags Row (Optional) */}
          {conversation.tags.length > 0 && (
             <div className="flex gap-1 mt-2 overflow-hidden">
                {conversation.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                     #{tag}
                   </span>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
