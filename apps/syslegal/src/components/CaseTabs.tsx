import React from 'react';
import { CaseData, CalendarEvent, DocumentFile } from '@cbp/core';
import { Card, CardHeader } from '@cbp/ui';
import { FileText, Download, MapPin } from 'lucide-react';

// --- Tab: Overview ---
export const OverviewTab: React.FC<{ caseData: CaseData }> = ({ caseData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <CardHeader title="Informasi Perkara" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <p className="text-slate-500 dark:text-slate-400 mb-1">Klien</p>
            <p className="font-bold text-cbp-navy dark:text-slate-200">{caseData.clientName}</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 mb-1">Tipe Kasus</p>
            <p className="font-bold text-cbp-navy dark:text-slate-200">{caseData.caseType}</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 mb-1">Tanggal Mulai</p>
            <p className="font-bold text-cbp-navy dark:text-slate-200">12 Sep 2023</p>
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 mb-1">Estimasi Selesai</p>
            <p className="font-bold text-cbp-navy dark:text-slate-200">-</p>
          </div>
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 mb-2">Deskripsi Singkat</p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{caseData.description}. Penanganan kasus ini memerlukan atensi khusus pada aspek regulasi terbaru dan mitigasi risiko sengketa di kemudian hari.</p>
        </div>
      </div>
    </Card>
    
    <Card>
      <CardHeader title="Tim Kuasa Hukum" />
      <div className="flex items-center gap-4 mb-4">
        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" className="h-12 w-12 rounded-full object-cover" alt="Lead" />
        <div>
          <p className="font-bold text-cbp-navy dark:text-white">Chandra B. Prakoso, S.H.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Lead Attorney</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs">RS</div>
        <div>
          <p className="font-bold text-cbp-navy dark:text-white">Robert Gunawan, S.H.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Associate</p>
        </div>
      </div>
    </Card>
  </div>
);

// --- Tab: Timeline ---
export const TimelineTab: React.FC<{ events: CalendarEvent[] }> = ({ events }) => (
  <Card>
    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-8 py-2">
      {events.length > 0 ? events.map((event) => (
        <div key={event.id} className="relative pl-8">
          <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-cbp-gold border-4 border-white dark:border-slate-900 shadow-sm"></div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
            <h4 className="text-sm font-bold text-cbp-navy dark:text-white">{event.title}</h4>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{event.date} • {event.time}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 bg-slate-50 dark:bg-slate-800 p-2 rounded inline-block">
            <MapPin className="h-3 w-3 inline mr-1" /> {event.type === 'Sidang' ? 'Pengadilan Negeri Jaksel' : 'Kantor CBP Corp'}
          </p>
        </div>
      )) : (
        <div className="pl-8 text-slate-500 dark:text-slate-500 text-sm">Belum ada agenda tercatat.</div>
      )}
    </div>
  </Card>
);

// --- Tab: Documents ---
export const DocumentsTab: React.FC<{ docs: DocumentFile[] }> = ({ docs }) => (
  <Card padding={false}>
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {docs.map((doc) => (
        <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${doc.type === 'PDF' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-cbp-navy dark:text-white">{doc.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{doc.category} • {doc.lastModified}</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-cbp-navy dark:hover:text-white p-2">
            <Download className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  </Card>
);