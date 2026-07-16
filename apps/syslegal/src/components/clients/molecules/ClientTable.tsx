
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
              <th className="px-4 py-2 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('name')}>
                Nama Klien <SortIcon column="name" />
              </th>
              <th className="px-4 py-2 font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" onClick={() => onSort('industry')}>
                Industri <SortIcon column="industry" />
              </th>
              <th className="px-4 py-2 font-bold">PIC & Kontak</th>
              <th className="px-4 py-2 font-bold">Email</th>
              <th className="px-4 py-2 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-cbp-navy dark:text-cbp-gold border border-slate-200 dark:border-slate-700">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-cbp-navy dark:hover:text-cbp-gold text-sm" onClick={() => onView(client)}>
                          {client.name}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">ID: {client.id.substring(0, 6)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="neutral" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      {client.industry}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-slate-700 dark:text-slate-300 font-medium text-sm">{client.contact}</div>
                    <div className="flex items-center gap-0.5 text-[10px] text-slate-500 mt-0.5">
                      <Phone className="h-2.5 w-2.5" /> {client.contact}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-slate-600 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-slate-400" />
                      {client.email || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" onClick={() => onView(client)} className="h-7 w-7 p-0" title="Detail">
                        <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Edit">
                        <Edit className="h-3.5 w-3.5 text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onDelete(client.id)} className="h-7 w-7 p-0" title="Hapus">
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500 bg-slate-50/50 dark:bg-slate-800/20 text-sm">
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
