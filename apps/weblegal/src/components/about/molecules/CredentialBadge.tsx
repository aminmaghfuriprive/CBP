
import React from 'react';
import * as Icons from 'lucide-react';

interface CredentialBadgeProps {
  iconName: string;
  label: string;
}

export const CredentialBadge: React.FC<CredentialBadgeProps> = ({ iconName, label }) => {
  // Dinamis load icon dari string name
  const IconComponent = (Icons as any)[iconName] || Icons.Award;

  return (
    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-default">
      <IconComponent className="h-5 w-5 text-cbp-gold" />
      <span className="text-sm font-bold text-slate-100">{label}</span>
    </div>
  );
};
