
"use client";

import React from 'react';
import { useData } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { Mail, User, Building, Download, Plus, ArrowRight } from 'lucide-react';

export const ClientListView: React.FC = () => {
  const { clients } = useData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Direktori Klien</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700">
            <Download className="h-4 w-4" /> Ekspor
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Klien
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-cbp-gold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
                <Building className="h-6 w-6 text-cbp-navy dark:text-cbp-gold" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                {client.industry}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1">{client.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-mono">ID: {client.id.substring(0, 8).toUpperCase()}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 group cursor-pointer">
                <User className="h-4 w-4 mr-3 text-cbp-gold group-hover:text-cbp-navy transition-colors" />
                <span className="group-hover:underline decoration-slate-300 underline-offset-4">{client.contact}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 group cursor-pointer">
                <Mail className="h-4 w-4 mr-3 text-cbp-gold group-hover:text-cbp-navy transition-colors" />
                <span className="group-hover:text-cbp-navy dark:group-hover:text-white transition-colors truncate">
                  {client.email || '-'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <Button variant="ghost" size="sm" className="w-full text-xs hover:bg-slate-50 dark:hover:bg-slate-800">Lihat Profil</Button>
              <Button variant="outline" size="sm" className="w-full text-xs border-slate-200 dark:border-slate-700 group">
                Detail <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
