
"use client";

import React from 'react';
import { Card, Button } from '@cbp/ui';
import { Save, Loader2 } from 'lucide-react';
import { useTemplateEditor } from '../hooks/useTemplateEditor';
import { TemplateTypeSelector } from '../molecules/TemplateTypeSelector';
import { TemplateDesignControls } from '../molecules/TemplateDesignControls';
import { TemplateFormFields } from '../molecules/TemplateFormFields';
import { TemplatePreviewSection } from '../molecules/TemplatePreviewSection';

export const TemplateSettings: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    formData, 
    isLoading, 
    handleChange, 
    handleSave 
  } = useTemplateEditor();

  if (isLoading || !formData) {
      return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-cbp-gold" />
              <p>Memuat konfigurasi template...</p>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Column: Controls */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          
          <TemplateTypeSelector 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <TemplateDesignControls 
            formData={formData} 
            onChange={handleChange} 
            activeTab={activeTab}
          />

          <div className="my-4 border-t border-slate-100 dark:border-slate-800"></div>

          <TemplateFormFields 
            formData={formData} 
            onChange={handleChange} 
          />

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
             <Button onClick={handleSave} className="w-full gap-2">
               <Save className="h-4 w-4" /> Simpan Konfigurasi
             </Button>
          </div>
        </Card>
      </div>

      {/* Right Column: Live Preview */}
      <div className="lg:col-span-7">
         <TemplatePreviewSection 
            activeTab={activeTab} 
            formData={formData} 
         />
      </div>
    </div>
  );
};
