import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@cbp/core';
import { Button, Card, Badge } from '@cbp/ui';
import { ArrowLeft, Check, Circle } from 'lucide-react';

export const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases } = useData();
  const caseData = cases.find(c => c.id === id);

  if (!caseData) return <div>Kasus tidak ditemukan</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/app/cases')} className="flex items-center text-sm text-slate-500 hover:text-cbp-navy">
        <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
      </button>
      
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">{caseData.clientName}</h1>
            <p className="text-slate-500">{caseData.caseType}</p>
          </div>
          <Badge variant="success">{caseData.status}</Badge>
        </div>
        
        <div className="mt-8">
          <h3 className="font-bold mb-4">Status Workflow</h3>
          <div className="flex items-center gap-2">
             <Check className="h-5 w-5 text-green-500" />
             <span className="text-sm font-bold">{caseData.currentStage.replace(/_/g, ' ').toUpperCase()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};