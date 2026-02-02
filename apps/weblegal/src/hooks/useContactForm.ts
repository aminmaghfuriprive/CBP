"use client";

import React, { useState } from 'react';
import { SERVICES, useLeadLogic, Lead } from '@cbp/core';

export interface ContactFormData {
  name: string;
  whatsapp: string;
  email: string;
  address: string;
  district: string;
  city: string;
  province: string;
  country: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const INITIAL_DATA: ContactFormData = {
  name: '',
  whatsapp: '',
  email: '',
  address: '',
  district: '',
  city: '',
  province: '',
  country: 'Indonesia',
  service: SERVICES[0]?.title || 'Konsultasi Umum',
  date: '',
  time: '09:00',
  notes: ''
};

export const useContactForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Logic Integrasi Core (Menyimpan ke database Leads)
  const { addLead } = useLeadLogic();

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isNavigating) return;

    // Validasi per Step
    if (step === 1) {
        if (!formData.name || !formData.whatsapp) {
            alert("Mohon lengkapi Nama dan Nomor WhatsApp.");
            return;
        }
    }
    if (step === 2) {
        if (!formData.date) {
            alert("Mohon pilih tanggal konsultasi.");
            return;
        }
    }

    setIsNavigating(true);
    setStep(s => s + 1);
    setTimeout(() => setIsNavigating(false), 500); // Debounce visual
  };
  
  const prevStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (step > 1) setStep(s => s - 1);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isNavigating) return;

    // Mapping ke format Lead Core
    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      name: formData.name,
      contact: formData.whatsapp,
      email: formData.email,
      interest: formData.service,
      source: 'Website',
      status: 'New',
      address: `${formData.address}, ${formData.district}, ${formData.city}`,
      notes: `Req Tanggal: ${formData.date} Jam ${formData.time}. Ket: ${formData.notes}`,
      createdAt: new Date().toISOString()
    };

    addLead(newLead);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setFormData(INITIAL_DATA);
  };

  return {
    step,
    submitted,
    isNavigating,
    formData,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
    resetForm
  };
};