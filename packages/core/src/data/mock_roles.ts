
import { RoleConfig, PermissionGroup } from '../types';

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    category: 'Manajemen Kasus',
    items: [
      { key: 'case.view', label: 'Lihat Daftar Kasus' },
      { key: 'case.create', label: 'Buat Kasus Baru' },
      { key: 'case.edit', label: 'Edit & Update Status' },
      { key: 'case.delete', label: 'Hapus Kasus' },
    ]
  },
  {
    category: 'Keuangan & Invoice',
    items: [
      { key: 'finance.view', label: 'Lihat Laporan Keuangan' },
      { key: 'finance.create_invoice', label: 'Buat Invoice' },
      { key: 'finance.approve', label: 'Approve Pembayaran' },
    ]
  },
  {
    category: 'Kepegawaian (HR)',
    items: [
      { key: 'hr.view', label: 'Lihat Direktori Pegawai' },
      { key: 'hr.manage', label: 'Kelola Data Pegawai' },
      { key: 'hr.payroll', label: 'Akses Payroll & Gaji' },
    ]
  },
  {
    category: 'Sistem & Konfigurasi',
    items: [
      { key: 'system.settings', label: 'Akses Pengaturan Global' },
      { key: 'system.roles', label: 'Kelola Role & Akses' },
    ]
  }
];

export const MOCK_ROLES: RoleConfig[] = [
  {
    id: 'role_admin',
    roleCode: 'ADMIN',
    label: 'Administrator',
    description: 'Akses penuh ke seluruh modul sistem dan konfigurasi.',
    permissions: [
        'case.view', 'case.create', 'case.edit', 'case.delete',
        'finance.view', 'finance.create_invoice', 'finance.approve',
        'hr.view', 'hr.manage', 'hr.payroll',
        'system.settings', 'system.roles'
    ]
  },
  {
    id: 'role_prod',
    roleCode: 'PRODUCTION',
    label: 'Tim Produksi (Lawyer)',
    description: 'Fokus pada manajemen perkara, dokumen, dan agenda sidang.',
    permissions: [
        'case.view', 'case.create', 'case.edit',
        'hr.view'
    ]
  },
  {
    id: 'role_field',
    roleCode: 'FIELD_OPS',
    label: 'Tim Lapangan',
    description: 'Akses terbatas untuk agenda kerja dan pelaporan lapangan.',
    permissions: [
        'case.view'
    ]
  },
  {
    id: 'role_fin',
    roleCode: 'FINANCE',
    label: 'Finance & Accounting',
    description: 'Manajemen tagihan, arus kas, dan penggajian.',
    permissions: [
        'finance.view', 'finance.create_invoice', 'finance.approve',
        'hr.view', 'hr.payroll'
    ]
  },
  {
    id: 'role_it',
    roleCode: 'IT',
    label: 'IT Support',
    description: 'Pemeliharaan teknis sistem dan konten website.',
    permissions: [
        'system.settings', 'hr.view'
    ]
  },
  {
    id: 'role_client',
    roleCode: 'CLIENT',
    label: 'Klien Eksternal',
    description: 'Role khusus untuk akun klien portal.',
    permissions: []
  }
];
