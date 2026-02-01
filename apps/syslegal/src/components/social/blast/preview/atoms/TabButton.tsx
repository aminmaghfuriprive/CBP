import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md transition-all flex items-center justify-center ${
        isActive 
          ? 'bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy shadow-sm' 
          : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );
};
