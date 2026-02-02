
"use client";

import React from 'react';
import { Card } from '@cbp/ui';
import { useContactForm } from '@/hooks/useContactForm';

// Organisms & Molecules
import { ContactHero } from '@/components/contact/organisms/ContactHero';
import { FAQSection } from '@/components/contact/organisms/FAQSection';
import { OfficeInfoSidebar } from '@/components/contact/organisms/OfficeInfoSidebar';
import { ContactStepIndicator } from '@/components/contact/molecules/ContactStepIndicator';
import { StepPersonalData } from '@/components/contact/molecules/form/StepPersonalData';
import { StepSchedule } from '@/components/contact/molecules/form/StepSchedule';
import { StepConfirmation } from '@/components/contact/molecules/form/StepConfirmation';
import { ContactSuccessView } from '@/components/contact/molecules/form/ContactSuccessView';
import { FormNavigation } from '@/components/contact/molecules/form/FormNavigation';

export default function ContactPage() {
  const {
    step, submitted, isNavigating, formData,
    handleChange, nextStep, prevStep, handleSubmit, resetForm
  } = useContactForm();

  // Prevent accidental submit on Enter key for non-textarea inputs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step < 3 && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <ContactHero />

      {/* Inserted FAQ Section here as requested */}
      <FAQSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <OfficeInfoSidebar />

          <div className="lg:col-span-2">
            <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-xl flex flex-col justify-between">
              {submitted ? (
                <ContactSuccessView onReset={resetForm} />
              ) : (
                <>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-2">Buat Janji Temu</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Lengkapi data diri dan preferensi jadwal konsultasi Anda.</p>
                    <ContactStepIndicator currentStep={step} />
                  </div>

                  <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="flex-1 flex flex-col justify-between">
                    <div className="min-h-[300px]">
                      {step === 1 && <StepPersonalData formData={formData} onChange={handleChange} />}
                      {step === 2 && <StepSchedule formData={formData} onChange={handleChange} />}
                      {step === 3 && <StepConfirmation formData={formData} />}
                    </div>

                    <FormNavigation
                      step={step}
                      isNavigating={isNavigating}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
