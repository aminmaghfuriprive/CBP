
import React from 'react';
import { CaseData, ServiceStep } from '@cbp/core';
import { Card } from '@cbp/ui';
import { CaseTimeline } from '../../../CaseTimeline';

interface CaseProgressViewProps {
  caseData: CaseData;
  serviceSOP?: ServiceStep[];
}

export const CaseProgressView: React.FC<CaseProgressViewProps> = ({ caseData, serviceSOP }) => {
  return (
    <Card className="animate-in fade-in zoom-in duration-300">
      <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-6">Timeline Pengerjaan</h3>
      <CaseTimeline caseData={caseData} serviceSOP={serviceSOP} />
    </Card>
  );
};
