
import React from 'react';
import { Zap } from 'lucide-react';
import { QUICK_REPLIES } from '../data/chatConfig';

interface QuickReplyBarProps {
  onSelect: (text: string) => void;
}

export const QuickReplyBar: React.FC<QuickReplyBarProps> = ({ onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto p-3 no-scrollbar border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
       <div className="flex items-center gap-1 text-[10px] font-bold text-cbp-gold uppercase tracking-wider mr-2 flex-shrink-0">
         <Zap className="h-3 w-3" /> Quick:
       </div>
       {QUICK_REPLIES.map((reply, idx) => (
         <button 
           key={idx}
           onClick={() => onSelect(reply)}
           className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:border-cbp-navy dark:hover:border-cbp-gold hover:text-cbp-navy dark:hover:text-cbp-gold transition-colors shadow-sm"
         >
           {reply.length > 30 ? reply.substring(0, 30) + '...' : reply}
         </button>
       ))}
    </div>
  );
};
