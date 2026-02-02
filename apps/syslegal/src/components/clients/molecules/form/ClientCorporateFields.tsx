
import React from 'react';
import { ClientFormData } from '../../hooks/useClientForm';

interface ClientCorporateFieldsProps {
  formData: ClientFormData;
  onChange: (field: keyof ClientFormData, value: any) => void;
}

export const ClientCorporateFields: React.FC<ClientCorporateFieldsProps> = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
       <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sektor Industri</label>
          <select 
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white cursor-pointer"
            value={formData.industry}
            onChange={(e) => onChange('industry', e.target.value)}
          >
            <option>Teknologi</option>
            <option>Manufaktur</option>
            <option>F&B (Kuliner)</option>
            <option>Properti & Konstruksi</option>
            <option>Pertambangan & Energi</option>
            <option>Jasa Keuangan</option>
            <option>Lainnya</option>
          </select>
       </div>
       <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nama PIC</label>
          <input 
            type="text"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
            placeholder="Penanggung Jawab"
            value={formData.picName}
            onChange={(e) => onChange('picName', e.target.value)}
          />
       </div>
    </div>
  );
};
