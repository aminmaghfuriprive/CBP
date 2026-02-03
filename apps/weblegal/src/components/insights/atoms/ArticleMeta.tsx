
import React from 'react';
import { Calendar, User } from 'lucide-react';

interface ArticleMetaProps {
  date: string;
  author?: string;
  className?: string;
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({ date, author = "Tim Riset Legal", className = '' }) => {
  return (
    <div className={`flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium ${className}`}>
      <span className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" /> {date}
      </span>
      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
      <span className="flex items-center gap-1.5">
        <User className="h-3.5 w-3.5" /> {author}
      </span>
    </div>
  );
};
