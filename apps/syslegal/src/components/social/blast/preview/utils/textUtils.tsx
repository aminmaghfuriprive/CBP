import React from 'react';

export const formatPreviewText = (text: string): React.ReactNode => {
  if (!text) {
    return <span className="text-slate-400 italic">Preview text akan muncul di sini...</span>;
  }
  return text;
};
