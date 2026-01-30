
"use client";

import React, { useState } from 'react';
import { useData, RoleConfig } from '@cbp/core';
import { RoleCard } from '../molecules/RoleCard';
import { RoleEditModal } from './RoleEditModal';

export const RoleManagementView: React.FC = () => {
  const { roles, updateRolePermissions } = useData();
  const [editingRole, setEditingRole] = useState<RoleConfig | null>(null);

  // Filter out CLIENT role from management view usually, but keeping it for completeness
  const displayRoles = roles.filter(r => r.roleCode !== 'CLIENT');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
         <h3 className="font-bold text-lg text-cbp-navy dark:text-white">Role & Hak Akses</h3>
         <p className="text-slate-500 dark:text-slate-400 text-sm">
           Atur tingkat kewenangan setiap role pengguna dalam sistem. Perubahan akan berlaku real-time.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayRoles.map((role) => (
          <RoleCard 
            key={role.id} 
            role={role} 
            onEdit={setEditingRole} 
          />
        ))}
      </div>

      <RoleEditModal 
        isOpen={!!editingRole}
        onClose={() => setEditingRole(null)}
        role={editingRole}
        onSave={updateRolePermissions}
      />
    </div>
  );
};
