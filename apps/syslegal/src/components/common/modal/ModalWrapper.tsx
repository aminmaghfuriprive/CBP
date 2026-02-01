
import React, { ReactNode, useEffect } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string; // e.g., 'max-w-md', 'max-w-2xl', 'max-w-4xl'
  className?: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = 'max-w-2xl',
  className = ''
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Container */}
      <div className={`
        relative w-full ${maxWidth} bg-white dark:bg-slate-900 
        rounded-xl shadow-2xl overflow-hidden 
        border border-slate-200 dark:border-slate-800 
        flex flex-col max-h-[90vh]
        animate-in zoom-in-95 duration-200
        ${className}
      `}>
        {children}
      </div>
    </div>
  );
};
