
"use client";

import React from 'react';
import { useData } from '@cbp/core';
import { ClockInCard } from '../molecules/ClockInCard';
import { AttendanceStats } from '../molecules/AttendanceStats';
import { AttendanceLogTable } from './AttendanceLogTable';

export const AttendanceView: React.FC = () => {
  const { attendanceHistory, todayRecord, clockIn, clockOut } = useData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Action Clock In */}
        <div className="lg:col-span-1 h-64">
           <ClockInCard 
             todayRecord={todayRecord} 
             onClockIn={clockIn} 
             onClockOut={clockOut} 
           />
        </div>

        {/* Kolom Kanan: Stats & History Preview */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <AttendanceStats history={attendanceHistory} />
           
           <div className="flex-1">
             <h3 className="font-bold text-lg text-cbp-navy dark:text-white mb-3">Log Aktivitas Terbaru</h3>
             <AttendanceLogTable logs={attendanceHistory.slice(0, 5)} />
           </div>
        </div>
      </div>
    </div>
  );
};
