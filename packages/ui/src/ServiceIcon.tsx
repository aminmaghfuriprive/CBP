
import React from 'react';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface ServiceIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className, ...props }) => {
  // Casting Icons ke any untuk dynamic access berdasarkan string
  // Jika icon tidak ditemukan, fallback ke 'HelpCircle'
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;

  return <IconComponent className={className} {...props} />;
};
