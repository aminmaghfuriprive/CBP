
"use client";

import React from 'react';
import { Card } from '@cbp/ui';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useTheme } from '@cbp/core';

interface ClientChartsProps {
  industryData: { name: string; value: number }[];
  caseStatusData: { name: string; value: number }[];
}

const COLORS = ['#0f172a', '#d4af37', '#64748b', '#94a3b8', '#cbd5e1']; // Navy, Gold, Slates
const DARK_COLORS = ['#d4af37', '#3b82f6', '#ef4444', '#10b981', '#6366f1'];

export const ClientCharts: React.FC<ClientChartsProps> = ({ industryData, caseStatusData }) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? DARK_COLORS : COLORS;
  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* 1. Industry Distribution (Pie) */}
      <Card className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">Sebaran Industri Klien</h4>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: theme === 'dark' ? '#fff' : '#0f172a', fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
           {industryData.slice(0, 4).map((entry, index) => (
             <div key={index} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></div>
                <span className="truncate">{entry.name}</span>
             </div>
           ))}
        </div>
      </Card>

      {/* 2. Case Status (Bar) */}
      <Card className="flex flex-col h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">Status Kasus Aktif</h4>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={caseStatusData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80} 
                tick={{ fill: textColor, fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" barSize={15} radius={[0, 4, 4, 0]}>
                {caseStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? (theme === 'dark' ? '#d4af37' : '#0f172a') : (theme === 'dark' ? '#334155' : '#cbd5e1')} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
