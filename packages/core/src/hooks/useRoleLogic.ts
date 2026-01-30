
"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { RoleConfig } from '../types';
import { useNotifications } from '../context/NotificationContext';

export const useRoleLogic = () => {
  const { addNotification } = useNotifications();

  // Fail-safe query for roles
  const roles = useLiveQuery(() => {
    if (!db.roles) return [];
    return db.roles.toArray();
  }) || [];

  // Hitung jumlah user per role (untuk visualisasi)
  const users = useLiveQuery(() => {
    if (!db.users) return [];
    return db.users.toArray();
  }) || [];

  const rolesWithCount = roles.map(role => ({
    ...role,
    memberCount: users.filter(u => u.role === role.roleCode).length
  }));

  const updateRolePermissions = async (id: string, newPermissions: string[]) => {
    try {
      await db.roles.update(id, { permissions: newPermissions });
      addNotification('Sukses', 'Hak akses role diperbarui.', 'success');
    } catch (error) {
      addNotification('Gagal', 'Gagal update hak akses.', 'warning');
    }
  };

  return { roles: rolesWithCount, updateRolePermissions };
};
