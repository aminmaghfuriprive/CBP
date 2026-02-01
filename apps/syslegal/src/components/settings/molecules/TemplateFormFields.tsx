
import React from 'react';
import { DocumentTemplate } from '@cbp/core';

interface TemplateFormFieldsProps {
  formData: DocumentTemplate;
  onChange: (field: keyof DocumentTemplate, value: any) => void;
}

export const TemplateFormFields: React.FC<TemplateFormFieldsProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Nama Perusahaan</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
          value={formData.companyName || ''}
          onChange={(e) => onChange('companyName', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Alamat Baris 1</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
          value={formData.addressLine1 || ''}
          onChange={(e) => onChange('addressLine1', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Alamat Baris 2</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
          value={formData.addressLine2 || ''}
          onChange={(e) => onChange('addressLine2', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Kontak Info (Telp/Email)</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cbp-gold"
          value={formData.contactInfo || ''}
          onChange={(e) => onChange('contactInfo', e.target.value)}
        />
      </div>
    </div>
  );
};
