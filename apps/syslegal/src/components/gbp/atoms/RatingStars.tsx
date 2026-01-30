
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number; // 1-5
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 4 }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
          className={`h-${size} w-${size} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );
};
