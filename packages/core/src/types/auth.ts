
export type UserRole = 'ADMIN' | 'PRODUCTION' | 'FINANCE' | 'IT' | 'FIELD_OPS' | 'CLIENT';

export type Division = 
  | 'Hukum Umum & Litigasi' 
  | 'Perizinan & Bisnis' 
  | 'Pertanahan & Agraria' 
  | 'Legal Administratif & Korporasi' 
  | 'FIELD' 
  | 'FINANCE' 
  | 'IT' 
  | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  division?: Division | null;
  avatarUrl?: string;
}

export interface RoleConfig {
  id: string;
  roleCode: UserRole;
  label: string;
  description: string;
  permissions: string[];
  memberCount?: number;
}

export interface PermissionGroup {
  category: string;
  items: { key: string; label: string }[];
}
