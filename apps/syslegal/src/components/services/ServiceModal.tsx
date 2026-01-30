
"use client";

import React, { useState, useEffect } from 'react';
import { X, Briefcase, DollarSign, FileText } from 'lucide-react';
import { Button } from '@cbp/ui';
import { ServiceItem } from '@cbp/core';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: ServiceItem) => void;
  initialData?: ServiceItem | null;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    division: 'Christian Law Firm',
    basePrice: 0,
    description: '',
    isActive: true,
    iconName: 'Scale'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        division: 'Christian Law Firm',
        basePrice: 0,
        description: '',
        isActive: true,
        iconName: 'Scale'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceToSave: ServiceItem = {
      id: initialData?.id || `svc_${Date.now()}`,
      title: formData.title || '',
      description: formData.description || '',
      division: formData.division as any,
      basePrice: Number(formData.basePrice) || 0,
      iconName: formData.iconName || 'Scale',
      isActive: formData.isActive
    };
    onSave(serviceToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-cbp-navy dark:text-white text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-cbp-gold" />
            {initialData ? 'Edit Layanan' : 'Tambah Layanan Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nama Layanan</label>
            <input 
              required
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Contoh: Pendirian PT Perorangan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Divisi</label>
              <select 
                className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                value={formData.division}
                onChange={(e) => setFormData({...formData, division: e.target.value as any})}
              >
                <option value="Christian Law Firm">Law Firm</option>
                <option value="Sahabat Ijinku">Sahabat Ijinku</option>
                <option value="CBP Legal Service">Legal Service</option>
              </select>
            </div>
            <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Harga Dasar (IDR)</label>
               <div className="relative">
                 <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <input 
                    type="number"
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: Number(e.target.value)})}
                 />
               </div>
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Deskripsi</label>
             <div className="relative">
               <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
               <textarea 
                 rows={3}
                 className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:focus:ring-cbp-gold dark:text-white"
                 value={formData.description}
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
               />
             </div>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="w-4 h-4 text-cbp-navy border-slate-300 rounded focus:ring-cbp-navy"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Layanan Aktif (Dapat dibooking)
            </label>
          </div>

          <div className="pt-2 flex gap-3">
             <Button type="button" variant="outline" className="w-full" onClick={onClose}>Batal</Button>
             <Button type="submit" className="w-full">Simpan Layanan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
