
import React from 'react';
import { Mail, SearchX, Briefcase } from 'lucide-react';
import { Card, Button } from '@cbp/ui';
import { NO_OPENINGS_STATE } from '@/data/career-content';

export const NoOpeningsCard: React.FC = () => {
  return (
    <Card className="text-center py-16 px-8 max-w-3xl mx-auto bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800">
      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <SearchX className="h-10 w-10 text-slate-400" />
      </div>
      
      <h3 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white mb-4">
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
        <Button variant="outline" className="gap-2 border-slate-300 text-slate-700 hover:border-cbp-navy hover:text-cbp-navy dark:border-slate-600 dark:text-slate-300 dark:hover:text-white transition-all">
          <Mail className="h-4 w-4" /> {NO_OPENINGS_STATE.ctaText}
        </Button>
      </a>
    </Card>
  );
};
