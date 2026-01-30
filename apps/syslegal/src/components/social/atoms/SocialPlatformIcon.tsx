
import React from 'react';
import { SocialPlatform } from '@cbp/core';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface SocialPlatformIconProps {
  platform: SocialPlatform;
  className?: string;
}

export const SocialPlatformIcon: React.FC<SocialPlatformIconProps> = ({ platform, className = "h-5 w-5" }) => {
  switch (platform) {
    case 'FACEBOOK':
      return <Facebook className={`${className} text-blue-600`} />;
    case 'INSTAGRAM':
      return <Instagram className={`${className} text-pink-600`} />;
    case 'LINKEDIN':
      return <Linkedin className={`${className} text-blue-700`} />;
    case 'TWITTER':
      return <Twitter className={`${className} text-sky-500`} />;
    default:
      return null;
  }
};
