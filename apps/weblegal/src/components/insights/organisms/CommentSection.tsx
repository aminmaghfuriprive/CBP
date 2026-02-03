
"use client";

import React, { useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { useCommentLogic } from '../hooks/useCommentLogic';
import { CommentForm } from '../molecules/CommentForm';
import { CommentItem } from '../molecules/CommentItem';

export const CommentSection: React.FC = () => {
  const { comments, formData, handleInputChange, handleSubmit } = useCommentLogic();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-xl font-serif font-bold text-cbp-navy dark:text-white mb-6 flex items-center gap-3">
        <MessageSquare className="h-5 w-5 text-cbp-gold" /> Diskusi
      </h3>

      {/* Form Selalu Tampil */}
      <CommentForm 
        data={formData} 
        onChange={handleInputChange} 
        onSubmit={handleSubmit} 
      />

      {/* Accordion Toggle */}
      <div className="mt-8">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-cbp-navy dark:text-slate-400 dark:hover:text-cbp-gold transition-colors w-full pb-4 border-b border-slate-100 dark:border-slate-800"
        >
          <span>{isOpen ? 'Sembunyikan' : 'Lihat'} {comments.length} Komentar Terdahulu</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Comment List (Hidden by default) */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}
        >
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
