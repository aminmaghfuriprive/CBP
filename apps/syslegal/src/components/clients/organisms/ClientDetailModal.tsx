
"use client";

import React from 'react';
import { ClientData } from '@cbp/core';
import { X, UserPlus, Building2 } from 'lucide-react';
import { ClientCreateForm } from './ClientCreateForm';
import { ClientProfileView } from './ClientProfileView';

interface ClientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientData | null;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ isOpen, onClose, client }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        
        {/* --- MODAL HEADER (Shared Wrapper) --- */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
                {client ? (
                  <Building2 className="h-5 w-5 text-cbp-navy dark:text-cbp-gold" />
                ) : (
                  <UserPlus className="h-5 w-5 text-cbp-gold" />
                )}
             </div>
             <div>
                <h3 className="font-bold text-lg text-cbp-navy dark:text-white leading-none">
                  {client ? 'Detail Profil Klien' : 'Registrasi Klien Baru'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {client ? `ID: ${client.id}` : 'Lengkapi data identitas & akses sistem'}
                </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* --- MODAL BODY (Delegated to Organisms) --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          {client ? (
            <ClientProfileView client={client} onClose={onClose} />
          ) : (
            <ClientCreateForm onClose={onClose} />
          )}
        </div>

      </div>
    </div>
  );
};
