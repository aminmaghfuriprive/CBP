
import React from 'react';
import { Card } from '@cbp/ui';
import { FileText } from 'lucide-react';
import { ServiceItem } from '@cbp/core';

interface ServiceBasicInfoProps {
  title?: string;
  description?: string;
  onChange: (field: keyof ServiceItem, value: any) => void;
}

export const ServiceBasicInfo: React.FC<ServiceBasicInfoProps> = ({ title, description, onChange }) => {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5 text-cbp-gold" /> Informasi Dasar
      </h3>
      
      <div className="space-y-4">
        <div>
           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nama Layanan</label>
           <input 
             className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white transition-all"
             value={title || ''}
             onChange={(e) => onChange('title', e.target.value)}
             placeholder="Masukkan nama layanan..."
           />
        </div>
        
        <div>
           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Deskripsi Publik</label>
           <textarea 
             rows={3}
             className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white transition-all resize-none"
             value={description || ''}
             onChange={(e) => onChange('description', e.target.value)}
             placeholder="Jelaskan cakupan layanan ini..."
           />
        </div>
      </div>
    </Card>
  );
};
