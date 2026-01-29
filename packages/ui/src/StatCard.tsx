import React from 'react';
import { Card } from './Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
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
  };

  const iconColor = styles[variant];

  return (
    <Card className="flex items-center p-6 border-l-4 border-l-transparent transition-all hover:translate-y-[-2px]" padding={false}>
      <div className={`p-4 rounded-full mr-4 ml-6 shadow-sm ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="py-6 pr-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
        {subtext && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtext}</p>
        )}
      </div>
    </Card>
  );
};