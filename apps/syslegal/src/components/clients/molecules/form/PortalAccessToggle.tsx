
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PortalAccessToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PortalAccessToggle: React.FC<PortalAccessToggleProps> = ({ checked, onChange }) => {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-xl flex items-start gap-3">
      <div className="mt-0.5 text-blue-600 dark:text-blue-400">
         <CheckCircle className="h-5 w-5" />
      </div>
      <div>
         <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Akses Portal Klien</h4>
         <p className="text-xs text-blue-600 dark:text-blue-400/80 mb-3 leading-relaxed">
            Akun login akan dibuat otomatis menggunakan email di atas. Klien dapat memantau status kasus dan tagihan melalui portal.
         </p>
         <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">
               Aktifkan Akun Portal (Default)
            </span>
         </label>
      </div>
    </div>
  );
};
