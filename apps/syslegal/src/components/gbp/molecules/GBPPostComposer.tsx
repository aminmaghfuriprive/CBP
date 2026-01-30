
import React, { useState } from 'react';
import { Card, Button } from '@cbp/ui';
import { Image as ImageIcon, Send } from 'lucide-react';

interface GBPPostComposerProps {
  onPost: (content: string, type: 'UPDATE' | 'EVENT' | 'OFFER') => void;
}

export const GBPPostComposer: React.FC<GBPPostComposerProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<'UPDATE' | 'EVENT' | 'OFFER'>('UPDATE');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onPost(content, type);
    setContent('');
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex gap-2 mb-4">
        {['UPDATE', 'EVENT', 'OFFER'].map((t) => (
          <button
            key={t}
            onClick={() => setType(t as any)}
            className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
              type === t 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <textarea 
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm mb-4 min-h-[100px] text-slate-900 dark:text-white placeholder:text-slate-400"
        placeholder={`Apa yang baru di kantor CBP? (${type})`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600">
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button onClick={handleSubmit} disabled={!content.trim()} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-transparent">
          <Send className="h-4 w-4" /> Post to Google
        </Button>
      </div>
    </Card>
  );
};
