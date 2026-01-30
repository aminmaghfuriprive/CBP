
import React from 'react';
import { User, Division } from '@cbp/core';
import { Card, Badge, DivisionTag } from '@cbp/ui';
import { Edit2, Trash2, Mail, Shield } from 'lucide-react';

interface EmployeeTableProps {
  employees: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  
  const getRoleColor = (role: string) => {
    switch(role) {
      case 'ADMIN': return 'primary'; // Navy/Gold
      case 'PRODUCTION': return 'info';
      case 'FINANCE': return 'success';
      case 'IT': return 'neutral';
      case 'FIELD_OPS': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 font-bold">Pegawai</th>
              <th className="px-6 py-4 font-bold">Role & Akses</th>
              <th className="px-6 py-4 font-bold">Divisi</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-cbp-navy dark:text-white">{emp.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <Mail className="h-3 w-3" /> {emp.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-mono text-xs font-medium text-slate-700 dark:text-slate-300">
                      {emp.role.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {emp.division ? (
                    <DivisionTag division={emp.division} />
                  ) : (
                    <span className="text-slate-400 text-xs italic">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(emp)}
                      className="p-1.5 text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(emp.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
