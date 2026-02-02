
import React from 'react';
import { CaseData } from '@cbp/core';
import { CaseTable } from '../../../cases/molecules/CaseTable';

interface WorkspaceCasesProps {
  cases: CaseData[];
  onView: (id: string) => void;
}

export const WorkspaceCases: React.FC<WorkspaceCasesProps> = ({ cases, onView }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-cbp-navy dark:text-white">Daftar Perkara</h3>
      </div>
      <CaseTable cases={cases} onView={onView} />
    </div>
  );
};
