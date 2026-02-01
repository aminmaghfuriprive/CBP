
import React, { useState, useEffect } from 'react';
import { Article } from '@cbp/core';

interface UseArticleFormProps {
  initialData?: Article | null;
  isOpen: boolean;
  onSave: (article: Article) => void;
  onClose: () => void;
}

export const useArticleForm = ({ initialData, isOpen, onSave, onClose }: UseArticleFormProps) => {
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: 'Wawasan Hukum',
    excerpt: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          title: '',
          category: 'Wawasan Hukum',
          excerpt: '',
          imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random()*1000)}?auto=format&fit=crop&q=80&w=600`,
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const articleToSave: Article = {
      id: initialData?.id || `art_${Date.now()}`,
      title: formData.title || '',
      category: formData.category || 'Umum',
      excerpt: formData.excerpt || '',
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/600x400',
      date: formData.date || new Date().toISOString().split('T')[0]
    };
    onSave(articleToSave);
    onClose();
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};
