
"use client";

import React, { useState, useEffect } from 'react';
import { RoleConfig } from '@cbp/core';
import { PERMISSION_GROUPS } from '@cbp/core/src/data/mock_roles';
import { Button } from '@cbp/ui';
import { X, ShieldCheck } from 'lucide-react';
import { PermissionToggle } from '../atoms/PermissionToggle';

interface RoleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: RoleConfig | null;
  onSave: (id: string, permissions: string[]) => void;
}

export const RoleEditModal: React.FC<RoleEditModalProps> = ({ 
  isOpen, onClose, role, onSave 
}) => {
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setSelectedPerms(role.permissions);
    }
  }, [role, isOpen]);

  if (!isOpen || !role) return null;

  const handleToggle = (key: string, checked: boolean) => {
    if (checked) {
      setSelectedPerms(prev => [...prev, key]);
    } else {
      setSelectedPerms(prev => prev.filter(k => k !== key));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cbp-navy dark:bg-cbp-gold rounded-lg text-white dark:text-cbp-navy">
               <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
               <h3 className="font-bold text-cbp-navy dark:text-white text-lg">Konfigurasi Hak Akses</h3>
               <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Role: {role.label}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Permission List */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-900">
           <div className="space-y-6">
             {PERMISSION_GROUPS.map((group) => (
               <div key={group.category}>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
                   {group.category}
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {group.items.map((perm) => (
                     <PermissionToggle 
                       key={perm.key}
                       label={perm.label}
                       isChecked={selectedPerms.includes(perm.key)}
                       onChange={(checked) => handleToggle(perm.key, checked)}
                       disabled={role.roleCode === 'ADMIN'} // Admin always full access
                     />
                   ))}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={() => { onSave(role.id, selectedPerms); onClose(); }}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
};
