
import React, { useState, useEffect } from 'react';
import { CertificateItem } from '@cbp/core';

interface UseCertificateFormProps {
  initialData?: CertificateItem | null;
  isOpen: boolean;
  onSave: (item: CertificateItem) => void;
  onClose: () => void;
}

export const useCertificateForm = ({ initialData, isOpen, onSave, onClose }: UseCertificateFormProps) => {
  const [formData, setFormData] = useState<Partial<CertificateItem>>({
    title: '',
    issuer: '',
    year: new Date().getFullYear().toString(),
    imageUrl: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          title: '',
          issuer: '',
          year: new Date().getFullYear().toString(),
          imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random()*1000)}?auto=format&fit=crop&q=80&w=800`
        });
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave: CertificateItem = {
      id: initialData?.id || `cert_${Date.now()}`,
      title: formData.title || '',
      issuer: formData.issuer || '',
      year: formData.year || '',
      imageUrl: formData.imageUrl || '',
      displayOrder: initialData?.displayOrder || 0
    };
    onSave(itemToSave);
    onClose();
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};
