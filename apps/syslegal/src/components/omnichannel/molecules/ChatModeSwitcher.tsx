
import React from 'react';
import { MessageSquare, Lock } from 'lucide-react';

interface ChatModeSwitcherProps {
  mode: 'reply' | 'note';
  onChange: (mode: 'reply' | 'note') => void;
}

export const ChatModeSwitcher: React.FC<ChatModeSwitcherProps> = ({ mode, onChange }) => {
  return (
    <div className="flex gap-4 mb-3">
       <button 
         onClick={() => onChange('reply')}
         className={`text-xs font-bold flex items-center gap-2 pb-1 transition-all ${mode === 'reply' ? 'text-cbp-navy dark:text-cbp-gold border-b-2 border-cbp-navy dark:border-cbp-gold' : 'text-slate-400 hover:text-slate-600'}`}
       >
         <MessageSquare className="h-3 w-3" /> Reply to Client
       </button>
       <button 
         onClick={() => onChange('note')}
         className={`text-xs font-bold flex items-center gap-2 pb-1 transition-all ${mode === 'note' ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
       >
         <Lock className="h-3 w-3" /> Internal Note
       </button>
    </div>
  );
};
