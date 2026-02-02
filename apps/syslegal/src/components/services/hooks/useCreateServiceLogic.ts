
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceItem, ServiceStep, useServiceLogic } from '@cbp/core';

export const useCreateServiceLogic = () => {
  const router = useRouter();
  const { addService } = useServiceLogic();

  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    division: 'Legal Administratif & Korporasi',
    basePrice: 0,
    isActive: true,
    iconName: 'Scale'
  });
  
  const [sopSteps, setSopSteps] = useState<ServiceStep[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ServiceItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.title) {
        alert("Nama layanan wajib diisi");
        return;
    }
    
    setIsSubmitting(true);
    
    const newService: ServiceItem = {
      id: `svc_${Date.now()}`,
      title: formData.title || 'Layanan Baru',
      description: formData.description || '',
      division: formData.division as any,
      basePrice: Number(formData.basePrice) || 0,
      iconName: formData.iconName || 'Scale',
      isActive: formData.isActive ?? true,
      sop: sopSteps
    };

    await addService(newService);
    router.push('/app/services');
  };

  return {
    formData,
    sopSteps,
    setSopSteps,
    isSubmitting,
    handleChange,
    handleSave,
    router
  };
};
