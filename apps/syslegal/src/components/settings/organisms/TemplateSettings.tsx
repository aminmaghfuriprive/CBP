
"use client";

import React, { useState, useEffect } from 'react';
import { useTemplateLogic, DocumentTemplate, HeaderLayout, COMPANY_NAME } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { Save, AlignLeft, AlignCenter, AlignRight, Columns, Loader2, LayoutTemplate, Layers } from 'lucide-react';
import { LetterheadPreview } from '../molecules/LetterheadPreview';
import { EnvelopePreview } from '../molecules/EnvelopePreview';

export const TemplateSettings: React.FC = () => {
  const { templates, updateTemplate } = useTemplateLogic();
  const [activeTab, setActiveTab] = useState<'LETTERHEAD' | 'ENVELOPE'>('LETTERHEAD');
  
  // Find current template based on tab, fallback to first available
  const currentTemplate = templates.find(t => t.type === activeTab);
  
  // Local state for editing to prevent excessive DB writes
  const [formData, setFormData] = useState<DocumentTemplate | null>(null);

  // Sync state when template changes
  useEffect(() => {
    if (currentTemplate) {
      setFormData(currentTemplate);
    } else if (templates.length > 0 && !currentTemplate) {
        // Fallback if specific type not found but templates exist
        // This creates a temporary default state to avoid UI locking
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

  const handleSave = () => {
    if (formData && currentTemplate) {
      updateTemplate(formData.id, formData);
    }
  };

  // Loading State
  if (!formData) {
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
          <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
             <button 
               onClick={() => setActiveTab('LETTERHEAD')}
               className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'LETTERHEAD' ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' : 'text-slate-500'}`}
             >
               Kop Surat
             </button>
             <button 
               onClick={() => setActiveTab('ENVELOPE')}
               className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${activeTab === 'ENVELOPE' ? 'bg-white dark:bg-slate-700 shadow text-cbp-navy dark:text-white' : 'text-slate-500'}`}
             >
               Kop Amplop
             </button>
          </div>

          <div className="space-y-4">
            {/* Style Selector */}
            {activeTab === 'LETTERHEAD' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Gaya Desain</label>
                <div className="grid grid-cols-2 gap-2">
                   <button 
                     onClick={() => handleChange('designStyle', 'SIMPLE')}
                     className={`p-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all ${formData.designStyle === 'SIMPLE' || !formData.designStyle ? 'bg-cbp-navy text-white border-cbp-navy' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                   >
                     <LayoutTemplate className="h-4 w-4" /> Klasik / Simple
                   </button>
                   <button 
                     onClick={() => handleChange('designStyle', 'GEOMETRIC')}
                     className={`p-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all ${formData.designStyle === 'GEOMETRIC' ? 'bg-cbp-navy text-white border-cbp-navy' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                   >
                     <Layers className="h-4 w-4" /> Modern Geometric
                   </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Nama Perusahaan</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Alamat Baris 1</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white"
                value={formData.addressLine1 || ''}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Alamat Baris 2</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white"
                value={formData.addressLine2 || ''}
                onChange={(e) => handleChange('addressLine2', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      className="h-9 w-full p-1 rounded cursor-pointer border border-slate-300 dark:border-slate-700 bg-white"
                      value={formData.accentColor || '#000000'}
                      onChange={(e) => handleChange('accentColor', e.target.value)}
                    />
                  </div>
               </div>
               
               {/* Layout Selector only for Simple Style */}
               {(formData.designStyle === 'SIMPLE' || !formData.designStyle) && (
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Tata Letak</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-md p-1">
                       <button onClick={() => handleChange('layout', 'left')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'left' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><AlignLeft className="h-4 w-4" /></button>
                       <button onClick={() => handleChange('layout', 'center')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'center' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><AlignCenter className="h-4 w-4" /></button>
                       <button onClick={() => handleChange('layout', 'right')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'right' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><AlignRight className="h-4 w-4" /></button>
                       <button onClick={() => handleChange('layout', 'split')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'split' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><Columns className="h-4 w-4" /></button>
                    </div>
                 </div>
               )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Kontak Info (Telp/Email)</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 dark:text-white"
                value={formData.contactInfo || ''}
                onChange={(e) => handleChange('contactInfo', e.target.value)}
              />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
             <Button onClick={handleSave} className="w-full gap-2">
               <Save className="h-4 w-4" /> Simpan Konfigurasi
             </Button>
          </div>
        </Card>
      </div>

      {/* Right Column: Live Preview */}
      <div className="lg:col-span-7">
         <div className="bg-slate-100 dark:bg-slate-950/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center items-center overflow-hidden relative">
            <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 uppercase tracking-widest pointer-events-none">Live Preview</div>
            
            {activeTab === 'LETTERHEAD' ? (
              <LetterheadPreview template={formData} />
            ) : (
              <EnvelopePreview template={formData} />
            )}
         </div>
      </div>
    </div>
  );
};
