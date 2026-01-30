
import React from 'react';
import { Shield } from 'lucide-react';

interface QuoteCardProps {
  text: string;
  author: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ text, author }) => {
  return (
    <div className="relative group">
       <div className="absolute -inset-1 bg-gradient-to-r from-cbp-gold to-slate-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
       <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl max-w-md">
          <Shield className="h-12 w-12 text-cbp-gold mb-6" />
          <blockquote className="font-serif text-2xl text-slate-200 italic leading-relaxed mb-6" dangerouslySetInnerHTML={{__html: text}}>
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-slate-500"></div>
            <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">{author}</span>
          </div>
       </div>
    </div>
  );
};
