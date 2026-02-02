
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, ServiceItem, useServiceLogic } from '@cbp/core';

export const useServiceDetail = (serviceId: string) => {
  const router = useRouter();
  const { updateService, deleteService } = useServiceLogic();

  // 1. Fetching Data Real-time
  const service = useLiveQuery(() => db.services.get(serviceId), [serviceId]);

  // 2. Local State Management (Draft Mode)
  const [formData, setFormData] = useState<Partial<ServiceItem>>({});
  const [isDirty, setIsDirty] = useState(false);

  // 3. Sync Database to Local State
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        division: service.division,
        basePrice: service.basePrice,
        description: service.description,
        isActive: service.isActive
      });
    }
  }, [service]);

  // 4. Handlers
  const handleChange = (field: keyof ServiceItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (service && serviceId) {
      await updateService(serviceId, formData);
      setIsDirty(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus layanan ini beserta seluruh SOP-nya?')) {
      await deleteService(serviceId);
      router.push('/app/services');
    }
  };

  const handleSopChange = (newSteps: any[]) => {
    if (service && serviceId) {
       updateService(serviceId, { sop: newSteps });
    }
  };

  return {
    service,
    formData,
    isDirty,
    isLoading: !service,
    handleChange,
    handleSave,
    handleDelete,
    handleSopChange,
    router
  };
};
