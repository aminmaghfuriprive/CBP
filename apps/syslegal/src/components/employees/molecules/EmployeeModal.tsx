
import React, { useState, useEffect } from 'react';
import { User, UserRole, Division } from '@cbp/core';
import { Button } from '@cbp/ui';
import { X, UserPlus, Save, Briefcase, Mail } from 'lucide-react';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (emp: User) => void;
  initialData?: User | null;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'PRODUCTION',
    division: 'Hukum Umum & Litigasi'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'PRODUCTION',
        division: 'Hukum Umum & Litigasi'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeToSave: User = {
      id: initialData?.id || `u_${Date.now()}`,
      name: formData.name || '',
      email: formData.email || '',
      role: formData.role as UserRole,
      division: formData.division as Division,
      avatarUrl: initialData?.avatarUrl
    };
    onSave(employeeToSave);
    onClose();
  };

  const isDivisionRequired = (role: string) => {
    return ['PRODUCTION'].includes(role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="font-bold text-cbp-navy dark:text-white text-lg flex items-center gap-2">
            {initialData ? <Save className="h-5 w-5 text-cbp-gold" /> : <UserPlus className="h-5 w-5 text-cbp-gold" />}
            {initialData ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nama Lengkap</label>
            <input 
              required
              className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nama Pegawai"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Login</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                required
                type="email"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@cbp.id"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Role System</label>
              <select 
                className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
              >
                <option value="PRODUCTION">Produksi (Lawyer)</option>
                <option value="ADMIN">Administrator</option>
                <option value="FINANCE">Finance</option>
                <option value="FIELD_OPS">Lapangan</option>
                <option value="IT">IT Support</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Divisi</label>
              <select 
                className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-cbp-navy dark:text-white text-sm disabled:opacity-50"
                value={formData.division || ''}
                onChange={(e) => setFormData({...formData, division: e.target.value as Division})}
                disabled={!isDivisionRequired(formData.role || '') && formData.role !== 'FIELD_OPS'}
              >
                <option value="">- Non Divisi -</option>
                <option value="Hukum Umum & Litigasi">Litigasi</option>
                <option value="Perizinan & Bisnis">Perizinan</option>
                <option value="Pertanahan & Agraria">Pertanahan</option>
                <option value="Legal Administratif & Korporasi">Korporasi</option>
                <option value="FIELD">Lapangan</option>
                <option value="FINANCE">Finance</option>
                <option value="IT">IT</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
             <Button type="button" variant="outline" className="w-full" onClick={onClose}>Batal</Button>
             <Button type="submit" className="w-full">Simpan Data</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
