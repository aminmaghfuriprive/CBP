
import React from 'react';
import Link from 'next/link';
import { Briefcase, Calendar } from 'lucide-react';

export const FieldQuickAccess: React.FC = () => {
  return (
    <div className="px-1 pt-2">
      <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
        <Briefcase className="h-4 w-4 text-cbp-gold" />
        Akses Cepat
      </h3>
      <div className="grid grid-cols-2 gap-4">
          <Link href="/app/agenda" className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:border-cbp-navy dark:hover:border-cbp-gold hover:shadow-md transition-all group">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Kalender Kerja</span>
          </Link>
          <Link href="/app/documents" className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:border-cbp-navy dark:hover:border-cbp-gold hover:shadow-md transition-all group">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 transition-colors">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Dokumen</span>
          </Link>
      </div>
    </div>
  );
};
