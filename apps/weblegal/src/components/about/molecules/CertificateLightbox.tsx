
import React, { useEffect, useCallback } from 'react';
import { CertificateItem } from '@cbp/core';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CertificateLightboxProps {
  item: CertificateItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  
  // Handle Keyboard Navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight' && onNext) onNext();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
        aria-label="Close"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Navigation Buttons */}
      {onPrev && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110 hidden md:block"
          aria-label="Previous"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {onNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110 hidden md:block"
          aria-label="Next"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300 pointer-events-none">
         <div className="relative w-full aspect-[4/3] max-h-[70vh] mb-6 rounded-lg overflow-hidden shadow-2xl bg-black pointer-events-auto">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-contain"
            />
         </div>
         
         <div className="text-center text-white max-w-2xl pointer-events-auto">
            <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
            <p className="text-lg text-slate-300">{item.issuer} • {item.year}</p>
         </div>

         {/* Mobile Navigation Controls (Visible only on small screens) */}
         <div className="flex gap-8 mt-6 md:hidden pointer-events-auto">
            {onPrev && (
              <button 
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="p-3 bg-white/10 text-white rounded-full active:bg-white/30"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {onNext && (
              <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="p-3 bg-white/10 text-white rounded-full active:bg-white/30"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
         </div>
      </div>
    </div>
  );
};
