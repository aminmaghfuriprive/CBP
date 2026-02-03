
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Comment } from '../hooks/useCommentLogic';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${comment.avatarColor}`}>
        {comment.name.charAt(0)}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          {comment.website ? (
            <a 
              href={comment.website} 
              target="_blank" 
              rel="nofollow ugc" 
              className="font-bold text-cbp-navy dark:text-cbp-gold hover:underline flex items-center gap-1 text-sm"
            >
              {comment.name} <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="font-bold text-slate-900 dark:text-white text-sm">{comment.name}</span>
          )}
          <span className="text-xs text-slate-400">• {comment.date}</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  );
};
