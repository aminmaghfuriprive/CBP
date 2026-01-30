
import React from 'react';
import { Card } from '@cbp/ui';

export const MiniCalendarWidget: React.FC = () => {
  const now = new Date();
  const monthYear = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const currentDay = now.getDate();

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Logic sederhana untuk visualisasi grid tanggal
  const generateCalendarGrid = () => {
    const dates = [];
    // Mocking start of month offset for demo visualization
    for (let i = 0; i < 3; i++) dates.push({ d: 29 + i, muted: true });
    
    for (let i = 1; i <= 30; i++) {
        dates.push({ 
            d: i, 
            active: i === currentDay,
            alert: i === currentDay + 3 // Simulasi event 3 hari lagi
        });
    }
    return dates;
  };

  const dates = generateCalendarGrid();

  return (
    <Card padding={false} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-4 bg-cbp-navy dark:bg-slate-950 text-white text-center font-bold border-b border-white/10 dark:border-slate-800 capitalize">
        {monthYear}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 dark:text-slate-500 mb-3">
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 text-center text-sm gap-y-4 text-slate-700 dark:text-slate-300">
          {dates.map((date, idx) => (
            <div 
              key={idx}
              className={`
                flex items-center justify-center w-8 h-8 mx-auto rounded-full cursor-pointer transition-colors relative
                ${date.muted ? 'text-slate-300 dark:text-slate-700' : ''}
                ${date.active ? 'font-bold text-cbp-navy bg-cbp-gold shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}
                ${date.alert && !date.active ? 'text-red-500 font-bold' : ''}
              `}
            >
              {date.d}
              {date.alert && !date.active && (
                  <div className="absolute bottom-0.5 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
