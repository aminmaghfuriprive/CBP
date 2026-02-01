
"use client";

import React from 'react';
import { AlignLeft, Type, Tag, Calendar, Image as ImageIcon } from 'lucide-react';
import { Button } from '@cbp/ui';
import { Article } from '@cbp/core';
import { ModalWrapper, ModalHeader, ModalFooter } from '../common/modal';
import { FormInput, FormTextarea, FormSelect } from '../common/forms';
import { useArticleForm } from './hooks/useArticleForm';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Article) => void;
  initialData?: Article | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = (props) => {
  const { formData, handleChange, handleSubmit } = useArticleForm(props);

  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose} maxWidth="max-w-2xl">
      <ModalHeader 
        title={props.initialData ? 'Edit Artikel' : 'Tulis Artikel Baru'}
        icon={AlignLeft}
        onClose={props.onClose}
      />
      
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          <FormInput 
            label="Judul Artikel"
            icon={Type}
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Masukkan judul yang menarik..."
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect 
               label="Kategori"
               icon={Tag}
               name="category"
               value={formData.category}
               onChange={handleChange}
               options={[
                 'Wawasan Hukum',
                 'Perizinan',
                 'Pertanahan',
                 'HAKI',
                 'Berita Firma'
               ]}
            />

            <FormInput 
               label="Tanggal Publikasi"
               icon={Calendar}
               type="date"
               name="date"
               value={formData.date || ''}
               onChange={handleChange}
            />
          </div>

          <div>
            <FormInput 
               label="URL Gambar (Cover)"
               icon={ImageIcon}
               name="imageUrl"
               value={formData.imageUrl || ''}
               onChange={handleChange}
               placeholder="https://..."
            />
            {formData.imageUrl && (
                <div className="mt-3 h-32 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative bg-slate-100 dark:bg-slate-800">
                   <img 
                     src={formData.imageUrl} 
                     alt="Preview" 
                     className="w-full h-full object-cover" 
                     onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Error+Image')} 
                   />
                </div>
             )}
          </div>

          <FormTextarea 
             label="Konten / Ringkasan"
             name="excerpt"
             value={formData.excerpt || ''}
             onChange={handleChange}
             placeholder="Tulis ringkasan artikel di sini..."
             rows={6}
          />
        </div>

        <ModalFooter>
           <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={props.onClose}>Batal</Button>
           <Button type="submit" className="w-full sm:w-auto">Publikasikan</Button>
        </ModalFooter>
      </form>
    </ModalWrapper>
  );
};
