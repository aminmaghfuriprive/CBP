
import React, { useState } from 'react';
import { GBPReview, formatDateID } from '@cbp/core';
import { RatingStars } from '../atoms/RatingStars';
import { Button } from '@cbp/ui';
import { Reply, User } from 'lucide-react';

interface ReviewItemProps {
  review: GBPReview;
  onReply: (id: string, text: string) => void;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (!replyText.trim()) return;
    onReply(review.id, replyText);
    setIsReplying(false);
  };

  return (
    <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 mb-4">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{review.reviewer}</h4>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={review.rating} size={3} />
                <span className="text-xs text-slate-400">{formatDateID(review.date, { dateStyle: 'medium' })}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
            {review.comment}
          </p>

          {review.reply ? (
            <div className="mt-4 pl-4 border-l-2 border-cbp-gold bg-slate-50 dark:bg-slate-800/50 p-3 rounded-r-lg">
              <p className="text-xs font-bold text-cbp-navy dark:text-white mb-1">Balasan dari Pemilik</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{review.reply}"</p>
            </div>
          ) : (
            <div className="mt-3">
              {!isReplying ? (
                <button 
                  onClick={() => setIsReplying(true)}
                  className="text-xs font-bold text-cbp-navy dark:text-cbp-gold flex items-center gap-1 hover:underline"
                >
                  <Reply className="h-3 w-3" /> Balas Ulasan
                </button>
              ) : (
                <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2">
                  <textarea 
                    className="w-full p-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cbp-gold"
                    rows={2}
                    placeholder="Tulis balasan..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="ghost" onClick={() => setIsReplying(false)}>Batal</Button>
                    <Button size="sm" onClick={handleSubmit}>Kirim Balasan</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
