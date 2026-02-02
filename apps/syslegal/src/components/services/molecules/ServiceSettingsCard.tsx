
import React from 'react';
import { Card } from '@cbp/ui';
import { DollarSign } from 'lucide-react';
import { ServiceItem } from '@cbp/core';

interface ServiceSettingsCardProps {
  division?: string;
  basePrice?: number;
  isActive?: boolean;
  onChange: (field: keyof ServiceItem, value: any) => void;
}

export const ServiceSettingsCard: React.FC<ServiceSettingsCardProps> = ({ 
  division, 
  basePrice, 
  isActive, 
  onChange 
}) => {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-cbp-navy dark:text-white mb-4">Pengaturan</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Divisi Penanggung Jawab</label>
          <select 
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm"
            value={division}
            onChange={(e) => onChange('division', e.target.value)}
          >
            <option value="Hukum Umum & Litigasi">Hukum Umum & Litigasi</option>
            <option value="Perizinan & Bisnis">Perizinan & Bisnis</option>
            <option value="Pertanahan & Agraria">Pertanahan & Agraria</option>
            <option value="Legal Administratif & Korporasi">Legal Administratif & Korporasi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Harga Dasar (Mulai Dari)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
                type="number"
                className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm"
                value={basePrice}
                onChange={(e) => onChange('basePrice', Number(e.target.value))}
                min={0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
           <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status Layanan</span>
           <button 
             onClick={() => onChange('isActive', !isActive)}
             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-700'}`}
           >
             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
           </button>
        </div>
      </div>
    </Card>
  );
};
