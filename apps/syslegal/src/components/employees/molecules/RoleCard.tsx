
import React from 'react';
import { RoleConfig } from '@cbp/core';
import { Card, Button } from '@cbp/ui';
import { Shield, Users, Lock, Settings } from 'lucide-react';

interface RoleCardProps {
  role: RoleConfig;
  onEdit: (role: RoleConfig) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onEdit }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <Shield className="h-6 w-6 text-cbp-navy dark:text-cbp-gold" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-1 rounded-full">
          <Users className="h-3 w-3" /> {role.memberCount || 0}
        </div>
      </div>

      <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-2">{role.label}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow line-clamp-2">
        {role.description}
      </p>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
        <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
           <span className="flex items-center gap-1">
             <Lock className="h-3 w-3" /> {role.permissions.length} Akses Aktif
           </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-center group"
          onClick={() => onEdit(role)}
        >
          <Settings className="h-3.5 w-3.5 mr-2 text-slate-400 group-hover:text-cbp-navy dark:group-hover:text-white transition-colors" />
          Konfigurasi Akses
        </Button>
      </div>
    </Card>
  );
};
