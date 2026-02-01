
"use client";

import { useState, useEffect } from 'react';
import { useTemplateLogic, DocumentTemplate, COMPANY_NAME } from '@cbp/core';

export const useTemplateEditor = () => {
  const { templates, updateTemplate } = useTemplateLogic();
  const [activeTab, setActiveTab] = useState<'LETTERHEAD' | 'ENVELOPE'>('LETTERHEAD');
  
  // Local state for editing to prevent excessive DB writes
  const [formData, setFormData] = useState<DocumentTemplate | null>(null);

  // Find current template based on tab
  const currentTemplate = templates.find(t => t.type === activeTab);

  // Sync state when template changes or initializes
  useEffect(() => {
    if (currentTemplate) {
      setFormData(currentTemplate);
    } else if (templates.length > 0 && !currentTemplate) {
        // Fallback logic: Create temporary default state if specific type not found
        setFormData({
            id: `temp_${Date.now()}`,
            type: activeTab,
            name: 'New Template',
            companyName: COMPANY_NAME,
            addressLine1: '',
            contactInfo: '',
            website: '',
            layout: 'center',
            designStyle: 'SIMPLE',
            isActive: false
        });
    }
  }, [currentTemplate, templates, activeTab]);

  const handleChange = (field: keyof DocumentTemplate, value: any) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSave = async () => {
    if (formData && currentTemplate) {
      await updateTemplate(formData.id, formData);
    }
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    isLoading: !formData,
    handleChange,
    handleSave
  };
};
