
"use client";

import React from 'react';
import { PageHeader } from '@cbp/ui';
import { OmnichannelView } from '../../../src/components/omnichannel/OmnichannelView';

export default function OmnichannelPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Omnichannel Communication" 
        subtitle="Pusat pesan terpadu (WhatsApp & Email)." 
      />
      <div className="flex-1 min-h-0 animate-in fade-in zoom-in duration-300">
        <OmnichannelView />
      </div>
    </div>
  );
}
