
import React from 'react';
import { ChannelType } from '@cbp/core';
import { Mail, MessageCircle } from 'lucide-react';

interface ChannelBadgeProps {
  type: ChannelType;
}

export const ChannelBadge: React.FC<ChannelBadgeProps> = ({ type }) => {
  if (type === 'WHATSAPP') {
    return (
      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center border border-green-200" title="WhatsApp">
        <MessageCircle className="h-3 w-3 text-green-600" />
      </div>
    );
  }
  return (
    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200" title="Email">
      <Mail className="h-3 w-3 text-blue-600" />
    </div>
  );
};
