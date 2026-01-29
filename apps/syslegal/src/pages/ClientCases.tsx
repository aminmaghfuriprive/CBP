import React from 'react';
import { useData, useAuth } from '@cbp/core';
import { Card, Badge } from '@cbp/ui';
import { Briefcase, Calendar, FileText } from 'lucide-react';

export const ClientCases: React.FC = () => {
  const { user } = useAuth();
  const { cases, documents } = useData();

  // Filter cases for logged-in client
  const myCases = cases.filter(c => 
    c.clientName.includes(user?.name || '') || (user?.name || '').includes(c.clientName)
  );

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Aktif': return 'success';
      case 'Menunggu': return 'warning';
      case 'Selesai': return 'neutral';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-cbp-navy dark:text-white">Kasus Saya</h1>
        <p className="text-slate-500 dark:text-slate-400">Daftar perkara hukum yang sedang ditangani oleh CBP Corp.</p>
      </div>

      {myCases.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {myCases.map((c) => {
             // Mock filtering docs for this case
             const caseDocs = documents.slice(0, 2); 
             
             return (
              <Card key={c.id} className="border-l-4 border-l-cbp-gold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-cbp-navy dark:text-white">{c.caseType}</h3>
                      <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">ID: {c.id.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Update Terakhir</p>
                    <p className="text-sm font-medium text-cbp-navy dark:text-slate-200 flex items-center gap-1 justify-end">
                      <Calendar className="h-3 w-3" /> {c.lastUpdate}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mb-4 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-cbp-navy dark:text-white mb-2">Status Terkini</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{c.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-cbp-navy dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" /> Dokumen Terkait
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {caseDocs.map(d => (
                      <span key={d.id} className="inline-flex items-center px-3 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                        {d.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
          <Briefcase className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">Belum Ada Kasus</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Anda belum memiliki kasus aktif yang terdaftar. Silakan buat janji temu untuk konsultasi awal.
          </p>
        </div>
      )}
    </div>
  );
};