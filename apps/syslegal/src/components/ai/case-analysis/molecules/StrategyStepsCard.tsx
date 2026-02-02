import React from 'react';
import { Card } from '@cbp/ui';
import { Lightbulb } from 'lucide-react';

interface StrategyStepsCardProps {
  steps: string[];
}

export const StrategyStepsCard: React.FC<StrategyStepsCardProps> = ({ steps }) => {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full">
      <h4 className="font-bold text-cbp-navy dark:text-white flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-cbp-gold" /> Rekomendasi Strategi
      </h4>
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy flex items-center justify-center font-bold text-sm shadow-md">
              {idx + 1}
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 flex-1 hover:border-cbp-gold dark:hover:border-cbp-gold transition-colors">
              <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};