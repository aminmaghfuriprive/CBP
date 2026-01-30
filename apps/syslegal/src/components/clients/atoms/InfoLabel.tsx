
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoLabelProps {
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export const InfoLabel: React.FC<InfoLabelProps> = ({ label, icon: Icon, className = '' }) => {
  return (
    <span className={`flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ${className}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
};
