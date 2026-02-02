
import React from 'react';
import { Button } from '@cbp/ui';
import { Paperclip, Smile, Send, StickyNote } from 'lucide-react';

interface ChatComposerProps {
  mode: 'reply' | 'note';
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({ 
  mode, 
  value, 
  onChange, 
  onSend, 
  onKeyDown 
}) => {
  const containerClass = mode === 'note' 
    ? 'bg-amber-100/50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 focus-within:ring-2 focus-within:ring-amber-400/50' 
    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-cbp-gold/50';

  const textAreaColor = mode === 'note' 
    ? 'text-amber-900 dark:text-amber-100' 
    : 'text-slate-900 dark:text-white';

  const placeholder = mode === 'note' 
    ? "Tulis catatan internal (tidak terlihat oleh klien)..." 
    : "Ketik pesan balasan...";

  const btnClass = mode === 'note' 
    ? 'bg-amber-500 hover:bg-amber-600 text-white border-transparent' 
    : 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy';

  return (
    <div className={`flex items-end gap-2 p-2 rounded-xl border transition-all shadow-sm ${containerClass}`}>
       <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors">
         <Paperclip className="h-5 w-5" />
       </button>
       
       <textarea 
         rows={1}
         value={value}
         onChange={(e) => onChange(e.target.value)}
         onKeyDown={onKeyDown}
         placeholder={placeholder}
         className={`flex-1 bg-transparent border-none outline-none text-sm py-2 resize-none max-h-32 placeholder:text-slate-400 ${textAreaColor}`}
         style={{ minHeight: '40px' }}
       />
       
       {mode === 'reply' && (
         <button className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white transition-colors hidden sm:block">
           <Smile className="h-5 w-5" />
         </button>
       )}

       <Button 
         onClick={onSend} 
         disabled={!value.trim()} 
         className={`rounded-lg h-10 px-4 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition-all font-bold ${btnClass}`}
       >
         {mode === 'note' ? (
           <span className="flex items-center gap-1 text-xs"><StickyNote className="h-4 w-4" /> Save</span>
         ) : (
           <Send className="h-4 w-4 ml-0.5" />
         )}
       </Button>
    </div>
  );
};
