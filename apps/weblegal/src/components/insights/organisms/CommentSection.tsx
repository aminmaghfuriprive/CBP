
"use client";

import React, { useState } from 'react';
import { Button } from '@cbp/ui';
import { MessageSquare, User, Send } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  date: string;
  content: string;
  avatarColor: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    name: 'Budi Santoso',
    date: '2 jam yang lalu',
    content: 'Artikel yang sangat insightful. Mengenai poin perlindungan HAKI untuk UMKM, apakah ada insentif khusus dari pemerintah saat ini?',
    avatarColor: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'c2',
    name: 'Sarah Wijaya',
    date: '5 jam yang lalu',
    content: 'Terima kasih penjelasannya Pak Christian. Sangat membantu untuk kami yang baru merintis startup.',
    avatarColor: 'bg-purple-100 text-purple-600'
  }
];

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;

    const newComment: Comment = {
      id: `new_${Date.now()}`,
      name: newName,
      date: 'Baru saja',
      content: newMessage,
      avatarColor: 'bg-green-100 text-green-600'
    };

    setComments([newComment, ...comments]);
    setNewName('');
    setNewMessage('');
  };

  return (
    <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-8 flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-cbp-gold" /> Diskusi ({comments.length})
      </h3>

      {/* Form */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl mb-10 border border-slate-100 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Anda</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-cbp-gold"
              placeholder="Masukkan nama..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Komentar</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-cbp-gold resize-none"
              placeholder="Tulis pendapat atau pertanyaan Anda..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!newName || !newMessage} className="gap-2">
              <Send className="h-4 w-4" /> Kirim Komentar
            </Button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${comment.avatarColor}`}>
              {comment.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{comment.name}</span>
                <span className="text-xs text-slate-400">• {comment.date}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
