
import React from 'react';
import { AyrshareProfile } from '@cbp/core';
import { Card } from '@cbp/ui';
import { ExternalLink } from 'lucide-react';

interface AyrshareProfileCardProps {
  profile: AyrshareProfile;
}

export const AyrshareProfileCard: React.FC<AyrshareProfileCardProps> = ({ profile }) => {
  return (
    <Card className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow group" padding={false}>
      <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700 flex-shrink-0 p-1">
        <img src={profile.avatarUrl} alt={profile.platform} className="h-full w-full object-contain" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-cbp-navy dark:text-white truncate">{profile.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-mono">{profile.username}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">
          {profile.platform}
        </span>
        <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-cbp-gold transition-colors" />
      </div>
    </Card>
  );
};
