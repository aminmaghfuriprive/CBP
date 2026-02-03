
"use client";

import React, { useState } from 'react';

export interface Comment {
  id: string;
  name: string;
  website?: string;
  date: string;
  content: string;
  avatarColor: string;
}

export interface CommentFormData {
  name: string;
  website: string;
  message: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    name: 'Budi Santoso',
    date: '2 jam yang lalu',
    content: 'Artikel yang sangat insightful. Mengenai poin perlindungan HAKI untuk UMKM, apakah ada insentif khusus?',
    avatarColor: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'c2',
    name: 'Sarah Wijaya',
    website: 'https://sarahstartups.id',
    date: '5 jam yang lalu',
    content: 'Terima kasih penjelasannya Pak Christian. Sangat membantu startup kami.',
    avatarColor: 'bg-purple-100 text-purple-600'
  }
];

export const useCommentLogic = () => {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [formData, setFormData] = useState<CommentFormData>({ name: '', website: '', message: '' });

  const handleInputChange = (field: keyof CommentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    const newComment: Comment = {
      id: `new_${Date.now()}`,
      name: formData.name,
      website: formData.website,
      date: 'Baru saja',
      content: formData.message,
      avatarColor: 'bg-green-100 text-green-600'
    };

    setComments([newComment, ...comments]);
    setFormData({ name: '', website: '', message: '' });
  };

  return { comments, formData, handleInputChange, handleSubmit };
};
