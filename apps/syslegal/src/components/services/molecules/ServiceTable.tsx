
import React from 'react';
import { ServiceItem, formatCurrencyIDR } from '@cbp/core';
import { Button, Badge, DivisionTag } from '@cbp/ui';
import { Edit, Trash2, ArrowUpDown, ExternalLink, FileText } from 'lucide-react';

interface ServiceTableProps {
  services: ServiceItem[];
  onSort: (key: keyof ServiceItem) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({ 
  services, onSort, sortConfig, onView, onDelete 
}) => {
  const SortIcon = ({ column }: { column: string }) => (
    <ArrowUpDown className={`h-3 w-3 inline ml-1 ${sortConfig.key === column ? 'text-cbp-gold' : 'text-slate-400'}`} />
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('title')}>
                Nama Layanan <SortIcon column="title" />
              </th>
              <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('division')}>
                Divisi <SortIcon column="division" />
              </th>
              <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('basePrice')}>
                Harga Dasar <SortIcon column="basePrice" />
              </th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-center">SOP</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {services.length > 0 ? (
              services.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-cbp-navy dark:text-white cursor-pointer hover:text-cbp-gold transition-colors" onClick={() => onView(svc.id)}>
                      {svc.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 max-w-[200px] truncate">{svc.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <DivisionTag division={svc.division} />
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700 dark:text-slate-300">
                    {svc.basePrice > 0 ? formatCurrencyIDR(svc.basePrice) : <span className="text-slate-400 italic">By Request</span>}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={svc.isActive ? 'success' : 'neutral'} className="text-[10px] uppercase">
                      {svc.isActive ? 'Active' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300">
                      <FileText className="h-3 w-3" /> {(svc.sop || []).length}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" onClick={() => onView(svc.id)} className="h-8 w-8 p-0" title="Detail">
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onView(svc.id)} className="h-8 w-8 p-0" title="Edit">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onDelete(svc.id)} className="h-8 w-8 p-0" title="Hapus">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500 bg-slate-50/50 dark:bg-slate-800/20">
                  Tidak ada layanan ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
