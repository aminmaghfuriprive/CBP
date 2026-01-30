
import React from 'react';
import { ClientData } from '@cbp/core';
import { Button, Badge } from '@cbp/ui';
import { Edit, Trash2, ArrowUpDown, ExternalLink, Mail, Phone } from 'lucide-react';

interface ClientTableProps {
  clients: ClientData[];
  onSort: (key: keyof ClientData) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onView: (client: ClientData) => void;
  onDelete: (id: string) => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({ 
  clients, onSort, sortConfig, onView, onDelete 
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
              <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('name')}>
                Nama Klien <SortIcon column="name" />
              </th>
              <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('industry')}>
                Industri <SortIcon column="industry" />
              </th>
              <th className="px-6 py-4 font-bold">PIC & Kontak</th>
              <th className="px-6 py-4 font-bold">Email</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-cbp-navy dark:text-cbp-gold border border-slate-200 dark:border-slate-700">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-cbp-navy dark:hover:text-cbp-gold" onClick={() => onView(client)}>
                          {client.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {client.id.substring(0, 6)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="neutral" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      {client.industry}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700 dark:text-slate-300 font-medium">{client.contact}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Phone className="h-3 w-3" /> {client.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {client.email || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" onClick={() => onView(client)} className="h-8 w-8 p-0" title="Detail">
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Edit">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onDelete(client.id)} className="h-8 w-8 p-0" title="Hapus">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 bg-slate-50/50 dark:bg-slate-800/20">
                  Tidak ada data klien yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
