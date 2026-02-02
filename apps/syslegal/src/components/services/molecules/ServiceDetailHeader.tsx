
import React from 'react';
import { Badge, Button } from '@cbp/ui';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

interface ServiceDetailHeaderProps {
  title?: string;
  division?: string;
  isActive?: boolean;
  isDirty: boolean;
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export const ServiceDetailHeader: React.FC<ServiceDetailHeaderProps> = ({
  title,
  division,
  isActive,
  isDirty,
  onBack,
  onSave,
  onDelete
}) => {
  return (
    <div className="flex flex-col gap-4">
      <button 
        onClick={onBack} 
        className="flex items-center text-sm text-slate-500 hover:text-cbp-navy dark:text-slate-400 dark:hover:text-cbp-gold mb-2 w-fit"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Daftar Layanan
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">
                {title || 'Memuat...'}
              </h1>
              <Badge variant={isActive ? 'success' : 'neutral'}>
                {isActive ? 'Active' : 'Draft'}
              </Badge>
           </div>
           <p className="text-slate-500 dark:text-slate-400">{division}</p>
        </div>
        
        <div className="flex gap-2">
           <Button 
             variant="outline" 
             className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20" 
             onClick={onDelete}
           >
             <Trash2 className="h-4 w-4 mr-2" /> Hapus
           </Button>
           
           {isDirty && (
             <Button onClick={onSave} className="animate-in fade-in zoom-in duration-300">
               <Save className="h-4 w-4 mr-2" /> Simpan Perubahan
             </Button>
           )}
        </div>
      </div>
    </div>
  );
};
