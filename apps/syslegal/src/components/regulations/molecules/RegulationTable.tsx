
import React from 'react';
import { RegulationItem } from '@cbp/core';
import { Badge, Button } from '@cbp/ui';
import { Edit2, Trash2, Download, FileText, ExternalLink } from 'lucide-react';

interface RegulationTableProps {
  regulations: RegulationItem[];
  onEdit: (item: RegulationItem) => void;
  onDelete: (id: string) => void;
}

export const RegulationTable: React.FC<RegulationTableProps> = ({ regulations, onEdit, onDelete }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Berlaku': return 'success';
      case 'Dicabut': return 'danger';
      case 'Diubah': return 'warning';
      default: return 'neutral';
    }
  };

  if (regulations.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Belum ada dokumen regulasi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Judul Regulasi</th>
              <th className="px-6 py-4 font-bold">Nomor/Tahun</th>
              <th className="px-6 py-4 font-bold">Kategori</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-right">Downloads</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {regulations.map((reg) => (
              <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4 max-w-sm">
                  <div className="font-bold text-cbp-navy dark:text-white line-clamp-2" title={reg.title}>
                    {reg.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                     <span className="bg-slate-100 dark:bg-slate-800 px-1.5 rounded">{reg.type}</span>
                     <span>Updated: {new Date(reg.uploadedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  No. {reg.number} / {reg.year}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-800 font-medium">
                    {reg.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge variant={getStatusVariant(reg.status)}>{reg.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right text-slate-500 font-mono">
                  {reg.downloadCount}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Lihat File">
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onEdit(reg)} className="h-8 w-8 p-0" title="Edit">
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDelete(reg.id)} className="h-8 w-8 p-0" title="Hapus">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
