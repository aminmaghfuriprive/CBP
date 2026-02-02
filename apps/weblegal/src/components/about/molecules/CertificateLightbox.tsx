
import React from 'react';
import { CertificateItem } from '@cbp/core';
import { X } from 'lucide-react';

interface CertificateLightboxProps {
  item: CertificateItem | null;
  onClose: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({ item, onClose }) => {
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
      >
        <X className="h-8 w-8" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
         <div className="relative w-full aspect-[4/3] max-h-[70vh] mb-6 rounded-lg overflow-hidden shadow-2xl bg-black">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-contain"
            />
         </div>
         
         <div className="text-center text-white max-w-2xl">
            <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
            <p className="text-lg text-slate-300">{item.issuer} • {item.year}</p>
         </div>
      </div>
    </div>
  );
};
