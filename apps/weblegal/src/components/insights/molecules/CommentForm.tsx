
"use client";

import React from 'react';
import { Button } from '@cbp/ui';
import { Send, Globe, User, MessageSquare } from 'lucide-react';
import { CommentFormData } from '../hooks/useCommentLogic';

interface CommentFormProps {
  data: CommentFormData;
  onChange: (field: keyof CommentFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ data, onChange, onSubmit }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl mb-10 border border-slate-100 dark:border-slate-800">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Anda</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" required
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-cbp-gold"
                placeholder="Masukkan nama..."
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Website (Opsional)</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="url"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-cbp-gold"
                placeholder="https://..."
                value={data.website}
                onChange={(e) => onChange('website', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Komentar</label>
          <div className="relative">
             <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
             <textarea 
               rows={3} required
               className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-cbp-gold resize-none"
               placeholder="Tulis pendapat atau pertanyaan Anda..."
               value={data.message}
               onChange={(e) => onChange('message', e.target.value)}
             />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={!data.name || !data.message} className="gap-2">
            <Send className="h-4 w-4" /> Kirim Komentar
          </Button>
        </div>
      </form>
    </div>
  );
};
