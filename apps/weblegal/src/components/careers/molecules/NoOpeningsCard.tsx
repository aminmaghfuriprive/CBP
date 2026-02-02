
import React from 'react';
import { Mail, SearchX, Briefcase } from 'lucide-react';
import { Card, Button } from '@cbp/ui';
import { NO_OPENINGS_STATE } from '@/data/career-content';

export const NoOpeningsCard: React.FC = () => {
  return (
    <Card className="text-center py-16 px-8 max-w-3xl mx-auto bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800">
      {/* Icon: Red Theme */}
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <SearchX className="h-10 w-10 text-red-500" />
      </div>
      
      {/* Title: Red Theme */}
      <h3 className="text-2xl font-serif font-bold text-red-600 dark:text-red-400 mb-4">
        {NO_OPENINGS_STATE.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
        {NO_OPENINGS_STATE.description}
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 mb-8">
        <div className="flex items-center justify-center gap-2 mb-2 text-blue-700 dark:text-blue-400 font-bold text-sm uppercase tracking-wide">
           <Briefcase className="h-4 w-4" /> Program Magang
        </div>
        <p className="text-sm text-blue-800/80 dark:text-blue-300">
          {NO_OPENINGS_STATE.internshipNote}
        </p>
      </div>

      <a href={`mailto:${NO_OPENINGS_STATE.ctaEmail}`}>
        {/* Button: Gold Theme */}
        <Button className="gap-2 bg-cbp-gold text-cbp-navy hover:bg-cbp-navy hover:text-cbp-gold dark:hover:bg-white transition-all font-bold border-transparent shadow-md hover:shadow-lg">
          <Mail className="h-4 w-4" /> {NO_OPENINGS_STATE.ctaText}
        </Button>
      </a>
    </Card>
  );
};
