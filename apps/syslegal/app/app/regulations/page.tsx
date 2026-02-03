
"use client";

import React from 'react';
import { PageHeader } from '@cbp/ui';
import { RegulationManager } from '../../../src/components/regulations/RegulationManager';

export default function RegulationPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Pustaka Regulasi (JDIH)" 
        subtitle="Manajemen database peraturan perundang-undangan dan dokumen hukum referensi." 
      />
      
      <div className="flex-1 min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <RegulationManager />
      </div>
    </div>
  );
}
