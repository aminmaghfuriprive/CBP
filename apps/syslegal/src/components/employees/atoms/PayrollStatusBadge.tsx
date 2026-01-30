
import React from 'react';
import { Badge } from '@cbp/ui';

interface PayrollStatusBadgeProps {
  status: 'Draft' | 'Paid';
}

export const PayrollStatusBadge: React.FC<PayrollStatusBadgeProps> = ({ status }) => {
  return (
    <Badge variant={status === 'Paid' ? 'success' : 'neutral'}>
      {status === 'Paid' ? 'Lunas' : 'Draft'}
    </Badge>
  );
};
