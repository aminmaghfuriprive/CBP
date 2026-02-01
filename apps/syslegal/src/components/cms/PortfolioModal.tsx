
"use client";

import React from 'react';
import { Briefcase, Target, Trophy, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@cbp/ui';
import { PortfolioItem } from '@cbp/core';
import { ModalWrapper, ModalHeader, ModalFooter } from '../common/modal';
import { FormInput, FormTextarea, FormSelect } from '../common/forms';
import { usePortfolioForm } from './hooks/usePortfolioForm';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
  initialData?: PortfolioItem | null;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = (props) => {
  const { formData, handleChange, handleManualChange, handleSubmit } = usePortfolioForm(props);

  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose} maxWidth="max-w-3xl">
      <ModalHeader 
        title={props.initialData ? 'Edit Studi Kasus' : 'Tambah Portofolio Baru'}
        icon={Briefcase}
        onClose={props.onClose}
      />
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="col-span-1 md:col-span-2">
               <FormInput 
                 label="Judul Kasus"
                 name="title"
                 value={formData.title || ''}
                 onChange={handleChange}
                 placeholder="Contoh: Sengketa Lahan Kawasan Industri"
                 required
               />
             </div>

             <FormSelect 
                label="Kategori Divisi"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  'Hukum Umum & Litigasi',
                  'Perizinan & Bisnis',
                  'Pertanahan & Agraria',
                  'Legal Administratif & Korporasi'
                ]}
             />

             <FormInput 
                label="Industri Klien"
                name="clientIndustry"
                value={formData.clientIndustry || ''}
                onChange={handleChange}
                placeholder="Contoh: Manufaktur, Mining"
             />
          </div>

          <FormTextarea 
             label="Tantangan (Challenge)"
             icon={Target}
             name="challenge"
             value={formData.challenge || ''}
             onChange={handleChange}
             placeholder="Jelaskan masalah hukum yang dihadapi klien..."
             rows={2}
          />

          <FormTextarea 
             label="Solusi Hukum (Solution)"
             icon={CheckCircle2}
             name="solution"
             value={formData.solution || ''}
             onChange={handleChange}
             placeholder="Jelaskan strategi dan langkah hukum yang diambil..."
             rows={3}
          />

          <FormTextarea 
             label="Hasil Akhir (Result)"
             icon={Trophy}
             name="result"
             value={formData.result || ''}
             onChange={handleChange}
             placeholder="Apa dampak positif bagi klien?"
             rows={2}
          />

          <FormInput 
             label="URL Gambar Cover"
             icon={ImageIcon}
             name="imageUrl"
             value={formData.imageUrl || ''}
             onChange={handleChange}
             placeholder="https://..."
          />

          <div className="flex items-center gap-2 pt-2">
            <input 
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured || false}
              onChange={(e) => handleManualChange('isFeatured', e.target.checked)}
              className="w-4 h-4 text-cbp-navy border-slate-300 rounded focus:ring-cbp-navy cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              Tampilkan di Halaman Depan (Featured)
            </label>
          </div>
        </div>

        <ModalFooter>
           <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={props.onClose}>Batal</Button>
           <Button type="submit" className="w-full sm:w-auto">Simpan Portofolio</Button>
        </ModalFooter>
      </form>
    </ModalWrapper>
  );
};
