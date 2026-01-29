
"use client";

import React, { useState } from 'react';
import { useAuth, useNotifications } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      addNotification('Berhasil', 'Profil Anda telah diperbarui.', 'success');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    }, 1000);
  };

  return (
    <Card className="bg-white dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center sm:flex-row gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="relative group cursor-pointer">
            <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-4 ring-slate-50 dark:ring-slate-900">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 text-2xl font-bold">
                  {user?.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Foto Profil</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">JPG, GIF atau PNG. Maks 1MB.</p>
            <Button type="button" size="sm" variant="outline">Ganti Foto</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                name="name" type="text" value={formData.name} onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                name="email" type="email" value={formData.email} onChange={handleChange} disabled
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password Baru</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                name="password" type="password" value={formData.password} onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
                placeholder="Kosongkan jika tidak ubah"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Konfirmasi Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cbp-gold outline-none dark:text-white"
                placeholder="Ulangi password baru"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" /> {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
