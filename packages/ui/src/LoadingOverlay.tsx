
import React from 'react';
import { Spinner } from './Spinner';

interface LoadingOverlayProps {
  message?: string;
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Memuat...', isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center">
        <Spinner size="lg" />
        {message && (
          <p className="mt-4 text-sm font-bold text-slate-600 dark:text-slate-300 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
