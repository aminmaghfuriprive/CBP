
import React from 'react';
import { LogOut } from 'lucide-react';

interface SidebarFooterProps {
  onLogout: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ onLogout }) => {
  return (
    <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
      <button 
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Keluar
      </button>
    </div>
  );
};
