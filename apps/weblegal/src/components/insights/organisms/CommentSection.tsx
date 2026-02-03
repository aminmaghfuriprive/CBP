
"use client";

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useCommentLogic } from '../hooks/useCommentLogic';
import { CommentForm } from '../molecules/CommentForm';
import { CommentItem } from '../molecules/CommentItem';

export const CommentSection: React.FC = () => {
  const { comments, formData, handleInputChange, handleSubmit } = useCommentLogic();

  return (
    <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-8 flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-cbp-gold" /> Diskusi ({comments.length})
      </h3>

      <CommentForm 
        data={formData} 
        onChange={handleInputChange} 
        onSubmit={handleSubmit} 
      />

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
