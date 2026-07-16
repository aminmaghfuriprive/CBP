
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  width, 
  height, 
  variant = 'rounded',
  style,
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular': return 'rounded-full';
      case 'rounded': return 'rounded-sm';
      default: return 'rounded-none';
    }
  };

  return (
    <div
      className={`
        animate-pulse bg-slate-200 dark:bg-slate-800 
        ${getVariantClasses()} 
        ${className}
      `}
      style={{
        width: width,
        height: height,
        ...style
      }}
      {...props}
    />
  );
};
