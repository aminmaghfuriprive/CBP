
import React from 'react';
import { Button } from '@cbp/ui';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

interface FormNavigationProps {
  step: number;
  isNavigating: boolean;
  onNext: (e?: React.MouseEvent) => void;
  onPrev: (e?: React.MouseEvent) => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ 
  step, 
  isNavigating, 
  onNext, 
  onPrev 
}) => {
  return (
    <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-100 dark:border-slate-800">
      {step > 1 ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev} 
          className="flex items-center gap-2 border-slate-300 text-slate-600 hover:border-cbp-navy hover:text-cbp-navy dark:border-slate-600 dark:text-slate-300 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
      ) : (
        <div>{/* Spacer */}</div>
      )}
      
      {step < 3 ? (
        <Button 
          type="button" 
          onClick={onNext} 
          disabled={isNavigating} 
          className="bg-cbp-navy dark:bg-cbp-gold dark:text-cbp-navy flex items-center gap-2 px-6 shadow-md hover:shadow-lg transition-all"
        >
          Lanjut <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          disabled={isNavigating} 
          className="bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy shadow-lg shadow-cbp-gold/20 font-bold px-8 flex items-center gap-2"
        >
          Kirim Permintaan <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
