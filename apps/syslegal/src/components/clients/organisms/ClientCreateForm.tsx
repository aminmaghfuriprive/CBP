
import React from 'react';
import { Button } from '@cbp/ui';
import { Save, Loader2 } from 'lucide-react';
import { useClientForm } from '../hooks/useClientForm';
import { ClientTypeSelector } from '../molecules/form/ClientTypeSelector';
import { ClientBasicFields } from '../molecules/form/ClientBasicFields';
import { ClientCorporateFields } from '../molecules/form/ClientCorporateFields';
import { PortalAccessToggle } from '../molecules/form/PortalAccessToggle';

interface ClientCreateFormProps {
  onClose: () => void;
}

export const ClientCreateForm: React.FC<ClientCreateFormProps> = ({ onClose }) => {
  const {
    clientType,
    setClientType,
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting
  } = useClientForm(onClose);

  return (
    <>
      <form id="create-client-form" onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* 1. Tipe Klien Switcher */}
        <ClientTypeSelector 
          value={clientType} 
          onChange={setClientType} 
        />

        {/* 2. Identitas Utama */}
        <ClientBasicFields 
          formData={formData} 
          clientType={clientType} 
          onChange={handleInputChange} 
        />

        {/* 3. Field Khusus Perusahaan */}
        {clientType === 'CORPORATE' && (
          <ClientCorporateFields 
            formData={formData} 
            onChange={handleInputChange} 
          />
        )}

        {/* 4. Akses Portal */}
        <PortalAccessToggle 
          checked={formData.generatePortal} 
          onChange={(val) => handleInputChange('generatePortal', val)} 
        />
      </form>

      {/* Footer Action */}
      <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center mt-auto">
        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
        <Button 
          type="submit" 
          form="create-client-form" 
          disabled={isSubmitting}
          className="shadow-lg shadow-cbp-navy/10"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</span>
          ) : (
            <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Simpan Data</span>
          )}
        </Button>
      </div>
    </>
  );
};
