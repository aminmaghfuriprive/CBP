
import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { LetterheadPreview } from './LetterheadPreview';
import { EnvelopePreview } from './EnvelopePreview';

interface TemplatePreviewSectionProps {
  activeTab: 'LETTERHEAD' | 'ENVELOPE';
  formData: DocumentTemplate;
}

export const TemplatePreviewSection: React.FC<TemplatePreviewSectionProps> = ({ activeTab, formData }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-950/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center items-center overflow-hidden relative">
      <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 uppercase tracking-widest pointer-events-none">Live Preview</div>
      
      {activeTab === 'LETTERHEAD' ? (
        <LetterheadPreview template={formData} />
      ) : (
        <EnvelopePreview template={formData} />
      )}
    </div>
  );
};
