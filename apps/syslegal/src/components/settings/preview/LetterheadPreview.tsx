import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { PreviewPaper } from './atoms/PreviewPaper';
import { GeometricLayout } from './layouts/GeometricLayout';
import { SimpleLayout } from './layouts/SimpleLayout';

interface LetterheadPreviewProps {
  template: DocumentTemplate;
}

export const LetterheadPreview: React.FC<LetterheadPreviewProps> = ({ template }) => {
  // Dispatcher Logic: Pilih Layout berdasarkan designStyle
  const renderLayout = () => {
    if (template.designStyle === 'GEOMETRIC') {
      return <GeometricLayout template={template} />;
    }
    // Default fallback to Simple/Classic
    return <SimpleLayout template={template} />;
  };

  return (
    <PreviewPaper>
      {renderLayout()}
    </PreviewPaper>
  );
};