
import React from 'react';
import { SocialPlatform, SocialAccount } from '@cbp/core';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface PlatformSelectorProps {
  accounts: SocialAccount[];
  selected: SocialPlatform[];
  onToggle: (p: SocialPlatform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ accounts, selected, onToggle }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {accounts.map((acc) => {
        const isSelected = selected.includes(acc.platform);
        const isDisabled = !acc.isConnected;

        return (
          <button
            key={acc.id}
            onClick={() => !isDisabled && onToggle(acc.platform)}
            disabled={isDisabled}
            className={`
              relative flex items-center p-3 rounded-xl border-2 transition-all duration-200
              ${isDisabled 
                ? 'bg-slate-100 dark:bg-slate-800 border-transparent opacity-60 cursor-not-allowed' 
                : isSelected 
                  ? 'bg-white dark:bg-slate-900 border-cbp-navy dark:border-cbp-gold shadow-md transform scale-[1.02]' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }
            `}
          >
            {/* Status Indicator Icon */}
            <div className="absolute -top-2 -right-2">
              {isSelected ? (
                <div className="bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy rounded-full p-0.5 shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              ) : isDisabled && (
                <div className="bg-slate-300 dark:bg-slate-700 text-slate-500 rounded-full p-0.5">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className={`p-2 rounded-lg mr-3 ${isDisabled ? 'grayscale' : ''} bg-slate-50 dark:bg-slate-800`}>
              <SocialPlatformIcon platform={acc.platform} className="h-6 w-6" />
            </div>
            
            <div className="text-left overflow-hidden">
              <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-cbp-navy dark:text-cbp-gold' : 'text-slate-500 dark:text-slate-400'}`}>
                {acc.platform}
              </p>
              <p className="text-[10px] text-slate-400 truncate w-full">
                {isDisabled ? 'Not Connected' : acc.handle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
