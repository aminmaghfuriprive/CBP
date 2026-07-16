import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cbp-gold/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    // Primary: Navy in light, Gold in dark (for high visibility)
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm dark:bg-cbp-gold dark:text-slate-900 dark:hover:bg-cbp-goldlight border border-transparent",
    
    // Secondary: Gold in light, Slate-700 in dark
    secondary: "bg-cbp-gold text-white hover:bg-cbp-golddark shadow-sm dark:bg-slate-800 dark:text-cbp-gold dark:hover:bg-slate-700 dark:border-slate-700 border border-transparent",
    
    // Outline: Slate border
    outline: "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
    
    // Ghost: Subtle hover
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
  };

  const sizes = {
    sm: "h-8 px-2 text-xs",
    md: "h-9 px-3 py-1.5 text-xs",
    lg: "h-10 px-4 text-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};