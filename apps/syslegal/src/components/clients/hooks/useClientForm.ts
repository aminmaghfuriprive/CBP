"use client";

import React, { useState } from 'react';
import { ClientData, User, useClientLogic, useEmployeeLogic } from '@cbp/core';

export interface ClientFormData {
  name: string;
  email: string;
  contact: string;
  address: string;
  industry: string;
  picName: string;
  occupation: string;
  generatePortal: boolean;
}

const INITIAL_DATA: ClientFormData = {
  name: '',
  email: '',
  contact: '',
  address: '',
  industry: 'Teknologi',
  picName: '',
  occupation: '',
  generatePortal: true
};

export const useClientForm = (onSuccess: () => void) => {
  const { addClient } = useClientLogic();
  const { addEmployee } = useEmployeeLogic();

  const [clientType, setClientType] = useState<'INDIVIDUAL' | 'CORPORATE'>('INDIVIDUAL');
  const [formData, setFormData] = useState<ClientFormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ClientFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(INITIAL_DATA);
    setClientType('INDIVIDUAL');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const industryValue = clientType === 'CORPORATE' ? formData.industry : 'Perorangan';
      
      // 1. Create Client Data
      const newClient: ClientData = {
        id: `cl_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        address: formData.address,
        industry: industryValue,
      };

      await addClient(newClient);

      // 2. Auto-Create Portal Account (Optional)
      if (formData.generatePortal && formData.email) {
        const newUser: User = {
          id: `u_${Date.now()}`, 
          name: formData.name,
          email: formData.email,
          role: 'CLIENT',
          division: null,
          // In real app, password would be generated/hashed or sent via invite link
        };
        await addEmployee(newUser); 
      }

      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Failed to create client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    clientType,
    setClientType,
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    resetForm
  };
};