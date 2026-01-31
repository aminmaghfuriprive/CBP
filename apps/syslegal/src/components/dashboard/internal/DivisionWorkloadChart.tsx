
import React from 'react';
import { useTheme } from '@cbp/core';
import { Card, CardHeader } from '@cbp/ui';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DivisionWorkloadChartProps {
  data: { name: string; kasus: number }[];
}

export const DivisionWorkloadChart: React.FC<DivisionWorkloadChartProps> = ({ data }) => {
  const { theme } = useTheme();
  
  // Theme colors
  const barColor = theme === 'dark' ? '#d4af37' : '#0f172a';
  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const tooltipBg = theme === 'dark' ? '#1e293b' : '#fff';

  return (
    <Card className="lg:col-span-2 h-full">
      <CardHeader title="Distribusi Divisi" subtitle="Beban kerja perkara per divisi" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={120} 
              stroke={axisColor} 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              cursor={{fill: 'transparent'}} 
              contentStyle={{
                backgroundColor: tooltipBg, 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }} 
            />
            <Bar dataKey="kasus" barSize={20} radius={[0, 4, 4, 0]}>
              {data.map((_, index) => <Cell key={index} fill={barColor} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
