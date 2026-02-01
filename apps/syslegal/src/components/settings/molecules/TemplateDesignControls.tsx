
import React from 'react';
import { DocumentTemplate } from '@cbp/core';
import { LayoutTemplate, Layers, AlignLeft, AlignCenter, AlignRight, Columns } from 'lucide-react';

interface TemplateDesignControlsProps {
  formData: DocumentTemplate;
  onChange: (field: keyof DocumentTemplate, value: any) => void;
  activeTab: 'LETTERHEAD' | 'ENVELOPE';
}

export const TemplateDesignControls: React.FC<TemplateDesignControlsProps> = ({ formData, onChange, activeTab }) => {
  return (
    <div className="space-y-4">
      {activeTab === 'LETTERHEAD' && (
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Gaya Desain</label>
          <div className="grid grid-cols-2 gap-2">
             <button 
               onClick={() => onChange('designStyle', 'SIMPLE')}
               className={`p-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all ${formData.designStyle === 'SIMPLE' || !formData.designStyle ? 'bg-cbp-navy text-white border-cbp-navy' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
             >
               <LayoutTemplate className="h-4 w-4" /> Klasik / Simple
             </button>
             <button 
               onClick={() => onChange('designStyle', 'GEOMETRIC')}
               className={`p-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all ${formData.designStyle === 'GEOMETRIC' ? 'bg-cbp-navy text-white border-cbp-navy' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
             >
               <Layers className="h-4 w-4" /> Modern Geometric
             </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
         <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Accent Color</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                className="h-9 w-full p-1 rounded cursor-pointer border border-slate-300 dark:border-slate-700 bg-white"
                value={formData.accentColor || '#000000'}
                onChange={(e) => onChange('accentColor', e.target.value)}
              />
            </div>
         </div>
         
         {(formData.designStyle === 'SIMPLE' || !formData.designStyle) && (
           <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Tata Letak</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-md p-1">
                 <button onClick={() => onChange('layout', 'left')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'left' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><AlignLeft className="h-4 w-4" /></button>
                 <button onClick={() => onChange('layout', 'center')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'center' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><AlignCenter className="h-4 w-4" /></button>
                 <button onClick={() => onChange('layout', 'right')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'right' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><AlignRight className="h-4 w-4" /></button>
                 <button onClick={() => onChange('layout', 'split')} className={`flex-1 flex justify-center p-1.5 rounded ${formData.layout === 'split' ? 'bg-white dark:bg-slate-600 shadow' : ''}`}><Columns className="h-4 w-4" /></button>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};
