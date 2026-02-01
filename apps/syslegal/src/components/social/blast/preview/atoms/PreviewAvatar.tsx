import React from 'react';

interface PreviewAvatarProps {
  src?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PreviewAvatar: React.FC<PreviewAvatarProps> = ({ 
  src = '/favicon.ico', 
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-slate-200 overflow-hidden flex-shrink-0 ${className}`}>
      <img 
        src={src} 
        alt="Avatar" 
        className="w-full h-full object-cover" 
        onError={(e) => (e.currentTarget.src = '/favicon.ico')}
      />
    </div>
  );
};
