import React from 'react';
import { SocialPlatform } from '@cbp/core';
import { SocialPlatformIcon } from '../../../atoms/SocialPlatformIcon';
import { TabButton } from '../atoms/TabButton';

interface PlatformSelectorProps {
  activeTab: SocialPlatform;
  onTabChange: (platform: SocialPlatform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ activeTab, onTabChange }) => {
  const platforms: SocialPlatform[] = ['INSTAGRAM', 'LINKEDIN', 'FACEBOOK'];

  return (
    <div className="bg-white dark:bg-slate-800 p-1 rounded-lg inline-flex shadow-sm border border-slate-200 dark:border-slate-700">
      {platforms.map((p) => (
        <TabButton
          key={p}
          isActive={activeTab === p}
          onClick={() => onTabChange(p)}
        >
          <SocialPlatformIcon platform={p} className="h-4 w-4" />
        </TabButton>
      ))}
    </div>
  );
};
