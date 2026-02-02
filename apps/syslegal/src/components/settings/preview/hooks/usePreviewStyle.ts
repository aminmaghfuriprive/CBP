import { useMemo } from 'react';
import { DocumentTemplate } from '@cbp/core';

export const usePreviewStyle = (template: DocumentTemplate) => {
  return useMemo(() => {
    const { layout, accentColor, fontFamily, designStyle } = template;

    // 1. Resolve Fallback Color
    const resolvedColor = accentColor || '#d4af37'; // Default Gold

    // 2. Determine Flex Layout Classes based on alignment
    let containerClass = 'flex items-center gap-6'; // Base classes
    let textAlignClass = 'text-left';

    switch (layout) {
      case 'center':
        containerClass += ' flex-col text-center';
        textAlignClass = 'text-center';
        break;
      case 'right':
        containerClass += ' flex-row-reverse text-right';
        textAlignClass = 'text-right';
        break;
      case 'split':
        containerClass += ' flex-row justify-between';
        textAlignClass = 'text-left';
        break;
      case 'left':
      default:
        containerClass += ' flex-row text-left';
        textAlignClass = 'text-left';
        break;
    }

    // 3. Return computed values
    return {
      // Classes for the header container
      layoutClasses: {
        container: containerClass,
        text: textAlignClass,
      },
      // Inline styles for dynamic values (colors, fonts)
      styles: {
        borderBottom: { borderBottomColor: resolvedColor },
        background: { backgroundColor: resolvedColor },
        text: { color: resolvedColor },
        font: { fontFamily: fontFamily || 'serif' },
      },
      // Helpers
      resolvedColor,
      isGeometric: designStyle === 'GEOMETRIC',
    };
  }, [template]);
};