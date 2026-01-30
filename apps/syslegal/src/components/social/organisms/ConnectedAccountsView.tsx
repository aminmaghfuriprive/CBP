
"use client";

import React from 'react';
import { SocialAccount } from '@cbp/core';
import { SocialAccountCard } from '../molecules/SocialAccountCard';

interface ConnectedAccountsViewProps {
  accounts: SocialAccount[];
  onToggleConnection: (id: string, status: boolean) => void;
}

export const ConnectedAccountsView: React.FC<ConnectedAccountsViewProps> = ({ accounts, onToggleConnection }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {accounts.map((account) => (
        <SocialAccountCard 
          key={account.id} 
          account={account} 
          onToggle={onToggleConnection} 
        />
      ))}
    </div>
  );
};
