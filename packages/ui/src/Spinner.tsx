
import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'primary' | 'secondary' | 'white';
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className = '',
  variant = 'primary'
}) => {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const colors = {
    primary: 'text-cbp-navy dark:text-cbp-gold',
    secondary: 'text-slate-400',
    white: 'text-white'
  };

  return (
    <Loader2 
      className={`animate-spin ${sizes[size]} ${colors[variant]} ${className}`} 
    />
  );
};
