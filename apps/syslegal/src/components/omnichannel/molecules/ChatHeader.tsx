
import React from 'react';
import { Conversation } from '@cbp/core';
import { Button } from '@cbp/ui';
import { Phone, MoreVertical, ArrowLeft } from 'lucide-react';
import { ChannelBadge } from '../atoms/ChannelBadge';

interface ChatHeaderProps {
  conversation: Conversation;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ conversation, onBack }) => {
  return (
    <div className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shadow-sm z-10 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Back Button (Mobile Only) */}
        <button 
          onClick={onBack} 
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
         <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-500 hover:text-cbp-navy dark:hover:text-white">
            <Phone className="h-4 w-4" />
         </Button>
         <Button variant="ghost" size="sm" className="text-slate-500 hover:text-cbp-navy dark:hover:text-white">
            <MoreVertical className="h-4 w-4" />
         </Button>
      </div>
    </div>
  );
};
