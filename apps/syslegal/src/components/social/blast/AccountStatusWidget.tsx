
import React from 'react';
import { SocialAccount } from '@cbp/core';
import { Card } from '@cbp/ui';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { AlertCircle } from 'lucide-react';

interface AccountStatusWidgetProps {
  accounts: SocialAccount[];
}

export const AccountStatusWidget: React.FC<AccountStatusWidgetProps> = ({ accounts }) => {
  const disconnectedCount = accounts.filter(a => !a.isConnected).length;

  return (
    <Card className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-cbp-navy dark:text-white text-sm uppercase tracking-wider">Status Koneksi</h4>
        {disconnectedCount > 0 && (
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <AlertCircle className="h-3 w-3" /> {disconnectedCount} Issue
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {accounts.map(acc => (
          <div key={acc.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <SocialPlatformIcon platform={acc.platform} className="h-4 w-4" />
              <span className={`font-medium ${acc.isConnected ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 line-through'}`}>
                {acc.handle}
              </span>
            </div>
            <div className={`h-2 w-2 rounded-full ${acc.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        ))}
      </div>
    </Card>
  );
};
