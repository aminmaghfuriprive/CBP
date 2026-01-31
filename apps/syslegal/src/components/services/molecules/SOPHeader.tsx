
import React from 'react';
import { Button } from '@cbp/ui';
import { Clock, Sparkles, Loader2 } from 'lucide-react';

interface SOPHeaderProps {
  totalDays: number;
  onGenerateAI: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
}

export const SOPHeader: React.FC<SOPHeaderProps> = ({ 
  totalDays, 
  onGenerateAI, 
  isGenerating, 
  canGenerate 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h3 className="text-lg font-bold text-cbp-navy dark:text-white">Standar Operasional Prosedur (SOP)</h3>
        <p className="text-sm text-slate-500">Definisikan alur kerja layanan ini.</p>
      </div>
      <div className="flex gap-2 items-center">
         <Button 
           variant="secondary" 
           size="sm" 
           onClick={onGenerateAI} 
           disabled={isGenerating || !canGenerate}
           className="gap-2 shadow-sm"
         >
           {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
           {isGenerating ? 'Sedang Berpikir...' : 'Generate AI'}
         </Button>
         <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold text-cbp-navy dark:text-cbp-gold flex items-center gap-2 border border-slate-200 dark:border-slate-700">
           <Clock className="h-4 w-4" /> {totalDays} Hari
         </div>
      </div>
    </div>
  );
};
