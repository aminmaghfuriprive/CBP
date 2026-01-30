
import React from 'react';
import { Badge } from '@cbp/ui';

interface AttendanceBadgeProps {
  status: 'Present' | 'Late' | 'Absent' | 'Leave';
}

export const AttendanceBadge: React.FC<AttendanceBadgeProps> = ({ status }) => {
  const getVariant = () => {
    switch(status) {
      case 'Present': return 'success';
      case 'Late': return 'warning';
      case 'Absent': return 'danger';
      case 'Leave': return 'info';
      default: return 'neutral';
    }
  };

  const getLabel = () => {
    switch(status) {
      case 'Present': return 'Hadir';
      case 'Late': return 'Terlambat';
      case 'Absent': return 'Alpha';
      case 'Leave': return 'Cuti/Izin';
      default: return status;
    }
  };

  return <Badge variant={getVariant()}>{getLabel()}</Badge>;
};
