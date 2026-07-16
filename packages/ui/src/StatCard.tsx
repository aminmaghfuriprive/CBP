
import React from 'react';
import { Card } from './Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  variant = 'primary',
  subtext
}) => {
  const styles = {
    primary: 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy', // Navy / Gold
    secondary: 'bg-cbp-gold text-cbp-navy dark:bg-slate-700 dark:text-cbp-gold', // Gold / Slate
    success: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    danger: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  };

  const iconColor = styles[variant];

  return (
    <Card className="flex items-center p-3 border-l-4 border-l-transparent transition-all hover:translate-y-[-2px]" padding={false}>
      <div className={`p-2 rounded-full mr-2 ml-3 shadow-sm ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="py-3 pr-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
        {subtext && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtext}</p>
        )}
      </div>
    </Card>
  );
};
