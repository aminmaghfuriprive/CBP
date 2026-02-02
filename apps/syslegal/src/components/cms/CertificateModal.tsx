
"use client";

import React from 'react';
import { Award, Image as ImageIcon } from 'lucide-react';
import { Button } from '@cbp/ui';
import { CertificateItem } from '@cbp/core';
import { ModalWrapper, ModalHeader, ModalFooter } from '../common/modal';
import { FormInput } from '../common/forms';
import { useCertificateForm } from './hooks/useCertificateForm';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: CertificateItem) => void;
  initialData?: CertificateItem | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = (props) => {
  const { formData, handleChange, handleSubmit } = useCertificateForm(props);

  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose} maxWidth="max-w-md">
      <ModalHeader 
        title={props.initialData ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}
        icon={Award}
        onClose={props.onClose}
      />
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          <FormInput 
            label="Nama Sertifikat / Penghargaan"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Contoh: Certified Legal Auditor"
            required
          />

          <FormInput 
            label="Institusi Penerbit"
            name="issuer"
            value={formData.issuer || ''}
            onChange={handleChange}
            placeholder="Contoh: BNSP"
            required
          />

          <FormInput 
            label="Tahun Perolehan"
            name="year"
            value={formData.year || ''}
            onChange={handleChange}
            placeholder="YYYY"
            type="number"
            required
          />

          <div>
            <FormInput 
               label="URL Gambar Scan/Foto"
               icon={ImageIcon}
               name="imageUrl"
               value={formData.imageUrl || ''}
               onChange={handleChange}
               placeholder="https://..."
            />
            {formData.imageUrl && (
                <div className="mt-3 h-40 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative bg-slate-100 dark:bg-slate-800">
                   <img 
                     src={formData.imageUrl} 
                     alt="Preview" 
                     className="w-full h-full object-cover" 
                     onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Error+Image')} 
                   />
                </div>
             )}
          </div>
        </div>

        <ModalFooter>
           <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={props.onClose}>Batal</Button>
           <Button type="submit" className="w-full sm:w-auto">Simpan</Button>
        </ModalFooter>
      </form>
    </ModalWrapper>
  );
};
