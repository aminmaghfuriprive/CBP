
import React from 'react';
import { GBPLocation } from '@cbp/core';
import { Card } from '@cbp/ui';
import { Eye, Phone, MapPin, MousePointerClick } from 'lucide-react';

interface LocationPerformanceProps {
  location: GBPLocation;
}

export const LocationPerformance: React.FC<LocationPerformanceProps> = ({ location }) => {
  const stats = [
    { label: 'Search Views', value: location.stats.views, icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Panggilan', value: location.stats.calls, icon: Phone, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Permintaan Rute', value: location.stats.directions, icon: MapPin, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'Klik Website', value: location.stats.websiteClicks, icon: MousePointerClick, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800" padding={false}>
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
