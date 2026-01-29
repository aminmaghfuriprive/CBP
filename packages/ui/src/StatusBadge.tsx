import React from 'react';
import { Badge } from './Badge';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  // Logic pemetaan warna otomatis biar ga kotor di page level
  const getVariant = (s: string) => {
    const lower = s.toLowerCase();
    
    if (['paid', 'aktif', 'selesai', 'confirmed', 'success', 'lunas'].includes(lower)) return 'success';
    if (['pending', 'menunggu', 'unpaid', 'warning', 'proses'].includes(lower)) return 'warning';
    if (['overdue', 'rejected', 'error', 'danger', 'batal'].includes(lower)) return 'danger';
    if (['info', 'meeting', 'sidang'].includes(lower)) return 'info';
    
    return 'neutral';
  };

  return (
    <Badge variant={getVariant(status)} className={className}>
      {status}
    </Badge>
  );
};