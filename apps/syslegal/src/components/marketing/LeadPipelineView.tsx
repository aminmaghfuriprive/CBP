
"use client";

import React, { useState } from 'react';
import { useLeadLogic, Lead, LeadStatus } from '@cbp/core';
import { Card, Button, Badge } from '@cbp/ui';
import { UserPlus, Trash2, Phone, Mail, CheckCircle, MessageSquare } from 'lucide-react';

export const LeadPipelineView: React.FC = () => {
  const { leads, updateLeadStatus, convertLeadToClient, deleteLead } = useLeadLogic();
  const [draggedLead, setDraggedLead] = useState<string | null>(null);

  // Kanban Columns
  const columns: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'New', label: 'Baru Masuk', color: 'border-t-blue-500' },
    { id: 'Contacted', label: 'Dihubungi', color: 'border-t-yellow-500' },
    { id: 'Qualified', label: 'Potensial', color: 'border-t-green-500' },
    { id: 'Converted', label: 'Dikonversi', color: 'border-t-purple-500' },
    { id: 'Lost', label: 'Gagal / Batal', color: 'border-t-slate-500' },
  ];

  const handleDragStart = (id: string) => setDraggedLead(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (status: LeadStatus) => {
    if (draggedLead) {
      updateLeadStatus(draggedLead, status);
      setDraggedLead(null);
    }
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-250px)] overflow-x-auto pb-4 items-start min-w-full">
      {columns.map((col) => (
        <div 
          key={col.id} 
          className={`flex-shrink-0 w-72 flex flex-col h-full rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border-t-4 ${col.color}`}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(col.id)}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-200 uppercase tracking-wide">
              {col.label}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 shadow-sm text-slate-600 dark:text-slate-400">
              {leads.filter(l => l.status === col.id).length}
            </span>
          </div>

          {/* Cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {leads.filter(l => l.status === col.id).map((lead) => (
              <div 
                key={lead.id}
                draggable
                onDragStart={() => handleDragStart(lead.id)}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-move hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-sm text-cbp-navy dark:text-white truncate pr-2">{lead.name}</h4>
                   <span className="text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">{lead.source}</span>
                </div>
                
                <p className="text-xs text-cbp-gold font-bold mb-2">{lead.interest}</p>
                
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                   <Phone className="h-3 w-3" /> {lead.contact}
                </div>
                {lead.notes && (
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded text-[10px] text-slate-500 italic mb-3">
                    "{lead.notes.substring(0, 50)}..."
                  </div>
                )}

                <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-700 pt-3">
                   {lead.status !== 'Converted' && (
                     <button 
                       onClick={() => convertLeadToClient(lead)}
                       className="p-1.5 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                       title="Convert to Client"
                     >
                       <UserPlus className="h-4 w-4" />
                     </button>
                   )}
                   <button className="p-1.5 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300" title="Hubungi">
                      <MessageSquare className="h-4 w-4" />
                   </button>
                   <button 
                     onClick={() => deleteLead(lead.id)}
                     className="p-1.5 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                   >
                      <Trash2 className="h-4 w-4" />
                   </button>
                </div>
              </div>
            ))}
            
            {leads.filter(l => l.status === col.id).length === 0 && (
              <div className="h-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                Kosong
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
