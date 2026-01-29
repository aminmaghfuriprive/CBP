
"use client";

import React from 'react';
import { CLIENTS } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { Mail, Phone, Building, User, Download, Plus } from 'lucide-react';

export default function ClientDatabasePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Database Klien</h1>
          <p className="text-slate-500 dark:text-slate-400">Daftar klien aktif dan arsip kontak.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            <Download className="h-4 w-4" /> Ekspor
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Klien
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLIENTS.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-cbp-gold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
                <Building className="h-6 w-6 text-cbp-navy dark:text-cbp-gold" />
              </div>
              <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                {client.industry}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-1">{client.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-mono">ID: {client.id.toUpperCase()}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                <User className="h-4 w-4 mr-3 text-cbp-gold" />
                {client.contact}
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                <Mail className="h-4 w-4 mr-3 text-cbp-gold" />
                <a href={`mailto:${client.email}`} className="hover:text-cbp-navy dark:hover:text-white hover:underline transition-colors">
                  {client.email}
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <Button variant="ghost" size="sm" className="w-full text-xs">Lihat Profil</Button>
              <Button variant="outline" size="sm" className="w-full text-xs border-slate-200 dark:border-slate-700">Riwayat</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
