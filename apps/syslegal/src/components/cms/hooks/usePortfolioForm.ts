
import React, { useState, useEffect } from 'react';
import { PortfolioItem, ServiceDivision } from '@cbp/core';

interface UsePortfolioFormProps {
  initialData?: PortfolioItem | null;
  isOpen: boolean;
  onSave: (item: PortfolioItem) => void;
  onClose: () => void;
}

export const usePortfolioForm = ({ initialData, isOpen, onSave, onClose }: UsePortfolioFormProps) => {
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    category: 'Hukum Umum & Litigasi',
    clientIndustry: '',
    year: new Date().getFullYear().toString(),
    challenge: '',
    solution: '',
    result: '',
    imageUrl: '',
    isFeatured: false
  });

  // Reset or Populate form when modal opens or data changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          title: '',
          category: 'Hukum Umum & Litigasi',
          clientIndustry: '',
          year: new Date().getFullYear().toString(),
          challenge: '',
          solution: '',
          result: '',
          imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random()*1000)}?auto=format&fit=crop&q=80&w=1000`,
          isFeatured: false
        });
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleManualChange = (field: keyof PortfolioItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSave: PortfolioItem = {
      id: initialData?.id || `pf_${Date.now()}`,
      title: formData.title || '',
      category: (formData.category as ServiceDivision) || 'Hukum Umum & Litigasi',
      clientIndustry: formData.clientIndustry || '',
      year: formData.year || '',
      challenge: formData.challenge || '',
      solution: formData.solution || '',
      result: formData.result || '',
      imageUrl: formData.imageUrl || '',
      isFeatured: formData.isFeatured
    };
    onSave(itemToSave);
    onClose();
  };

  return {
    formData,
    handleChange,
    handleManualChange,
    handleSubmit
  };
};
