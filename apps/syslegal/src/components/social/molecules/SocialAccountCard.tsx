
import React from 'react';
import { SocialAccount } from '@cbp/core';
import { SocialPlatformIcon } from '../atoms/SocialPlatformIcon';
import { Card, Button } from '@cbp/ui';
import { Users, RefreshCw } from 'lucide-react';

interface SocialAccountCardProps {
  account: SocialAccount;
  onToggle: (id: string, currentStatus: boolean) => void;
}

export const SocialAccountCard: React.FC<SocialAccountCardProps> = ({ account, onToggle }) => {
  return (
    <Card className={`border transition-all ${account.isConnected ? 'border-l-4 border-l-green-500' : 'border-slate-200 dark:border-slate-800 border-l-4 border-l-slate-300'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <SocialPlatformIcon platform={account.platform} className="h-6 w-6" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${account.isConnected ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
          {account.isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-cbp-navy dark:text-white">{account.handle}</h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
          <Users className="h-3.5 w-3.5" />
          <span>{new Intl.NumberFormat('id-ID').format(account.followers)} Followers</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="text-[10px] text-slate-400">
          Sync: {account.isConnected ? new Date(account.lastSync).toLocaleDateString() : '-'}
        </div>
        <Button 
          size="sm" 
          variant={account.isConnected ? 'outline' : 'primary'}
          onClick={() => onToggle(account.id, account.isConnected)}
          className={`h-8 text-xs ${account.isConnected ? 'text-red-600 border-red-200 hover:bg-red-50' : ''}`}
        >
          {account.isConnected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
    </Card>
  );
};
