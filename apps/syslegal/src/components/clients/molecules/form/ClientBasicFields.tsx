
import React from 'react';
import { ClientFormData } from '../../hooks/useClientForm';

interface ClientBasicFieldsProps {
  formData: ClientFormData;
  clientType: 'INDIVIDUAL' | 'CORPORATE';
  onChange: (field: keyof ClientFormData, value: any) => void;
}

export const ClientBasicFields: React.FC<ClientBasicFieldsProps> = ({ formData, clientType, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          {clientType === 'CORPORATE' ? 'Nama Resmi Perusahaan (PT/CV)' : 'Nama Lengkap (Sesuai KTP)'} <span className="text-red-500">*</span>
        </label>
        <input 
          required
          type="text"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
          placeholder={clientType === 'CORPORATE' ? 'Contoh: PT. Maju Jaya Abadi' : 'Contoh: Budi Santoso, S.H.'}
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Resmi <span className="text-red-500">*</span></label>
            <input 
              required
              type="email"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
         </div>
         <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">No. WhatsApp / HP <span className="text-red-500">*</span></label>
            <input 
              required
              type="tel"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
              value={formData.contact}
              onChange={(e) => onChange('contact', e.target.value)}
            />
         </div>
      </div>

      {clientType === 'INDIVIDUAL' && (
        <div className="animate-in fade-in slide-in-from-top-2">
           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Pekerjaan</label>
           <input 
              type="text"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white"
              placeholder="Swasta / PNS / Wiraswasta"
              value={formData.occupation}
              onChange={(e) => onChange('occupation', e.target.value)}
            />
        </div>
      )}

      <div>
         <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Alamat Lengkap</label>
         <textarea 
            rows={3}
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-cbp-gold dark:text-white resize-none"
            placeholder="Jalan, Nomor, Kelurahan, Kecamatan..."
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
         />
      </div>
    </div>
  );
};
