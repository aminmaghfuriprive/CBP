import { useState } from 'react';
import { SocialPlatform } from '@cbp/core';

export const usePreviewState = (initialTab: SocialPlatform = 'INSTAGRAM') => {
  const [activeTab, setActiveTab] = useState<SocialPlatform>(initialTab);

  return {
    activeTab,
    setActiveTab
  };
};
