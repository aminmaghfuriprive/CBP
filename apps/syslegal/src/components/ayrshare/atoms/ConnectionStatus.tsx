
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${
      isConnected 
        ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
    }`}>
      {isConnected ? (
        <>
          <CheckCircle2 className="h-4 w-4" /> Connected
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4" /> Disconnected
        </>
      )}
    </div>
  );
};
