
import React from 'react';
import { ClientData } from '@cbp/core';
import { ChevronDown, LayoutGrid, FileText, FolderOpen, DollarSign, Calendar } from 'lucide-react';

export type ClientViewMode = 'overview' | 'cases' | 'documents' | 'billing' | 'agenda';

interface ClientDirectoryCardProps {
  client: ClientData;
  isActive: boolean;
  activeView?: ClientViewMode;
  onSelect: () => void;
  onViewChange: (view: ClientViewMode) => void;
}

export const ClientDirectoryCard: React.FC<ClientDirectoryCardProps> = ({ 
  client, 
  isActive, 
  activeView = 'overview',
  onSelect, 
  onViewChange 
}) => {
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'cases', label: 'Riwayat Kasus', icon: FileText },
    { id: 'agenda', label: 'Agenda & Jadwal', icon: Calendar },
    { id: 'documents', label: 'Dokumen', icon: FolderOpen },
    { id: 'billing', label: 'Keuangan', icon: DollarSign },
  ];

  return (
    <div className={`border-b border-slate-100 dark:border-slate-800 transition-all duration-300 ${isActive ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
      
      {/* 1. Main Card Area (Click to Expand/Select) */}
      <div 
        onClick={onSelect}
        className={`p-4 cursor-pointer relative flex items-center gap-3 ${isActive ? '' : ''}`}
      >
        {/* Active Indicator Line */}
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cbp-navy dark:bg-cbp-gold"></div>}

        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-colors
          ${isActive 
            ? 'bg-cbp-navy text-white dark:bg-cbp-gold dark:text-cbp-navy border-transparent' 
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }
        `}>
          {client.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm truncate font-bold ${isActive ? 'text-cbp-navy dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
            {client.name}
          </h4>
          <div className="flex flex-col gap-0.5">
             <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 truncate">
               {client.industry}
             </span>
          </div>
        </div>

        {/* Chevron */}
        <div className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-cbp-navy dark:text-cbp-gold' : 'text-slate-400'}`}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {/* 2. Accordion Menu (Only visible when active) */}
      {isActive && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
           <div className="flex flex-col gap-1 pl-12 border-l-2 border-slate-200 dark:border-slate-700 ml-5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => { e.stopPropagation(); onViewChange(item.id as ClientViewMode); }}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-left transition-colors
                    ${activeView === item.id 
                      ? 'bg-cbp-navy/10 text-cbp-navy dark:bg-cbp-gold/20 dark:text-cbp-gold font-bold' 
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};
