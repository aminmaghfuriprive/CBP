
"use client";

import React from 'react';
import { useFieldLogic } from '@cbp/core';
import { FieldHeader } from './FieldHeader';
import { FieldAgendaList } from './FieldAgendaList';
import { FieldQuickAccess } from './FieldQuickAccess';

export const FieldDashboardView: React.FC = () => {
  const { userName, todayEvents, taskCount, completedCount } = useFieldLogic();

  return (
    <div className="space-y-6 max-w-lg mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FieldHeader 
        userName={userName} 
        taskCount={taskCount} 
        completedCount={completedCount} 
      />
      
      <FieldAgendaList events={todayEvents} />
      
      <FieldQuickAccess />
    </div>
  );
};
