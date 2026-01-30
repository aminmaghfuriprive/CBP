
"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button } from '@cbp/ui';
import { AttendanceRecord } from '@cbp/core';
import { LogIn, LogOut, Clock } from 'lucide-react';

interface ClockInCardProps {
  todayRecord: AttendanceRecord | undefined;
  onClockIn: () => void;
  onClockOut: () => void;
}

export const ClockInCard: React.FC<ClockInCardProps> = ({ todayRecord, onClockIn, onClockOut }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isCheckedIn = !!todayRecord;
  const isCheckedOut = !!todayRecord?.checkOut;

  return (
    <Card className="bg-cbp-navy dark:bg-slate-900 text-white relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cbp-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 text-center">
        <p className="text-slate-300 text-sm mb-2 font-medium tracking-wide uppercase">Waktu Server</p>
        <h2 className="text-5xl font-mono font-bold text-white mb-8 tracking-wider">{currentTime}</h2>
        
        {isCheckedOut ? (
          <div className="p-4 bg-white/10 rounded-xl border border-white/10">
            <p className="text-green-400 font-bold flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" /> Shift Selesai
            </p>
            <p className="text-xs text-slate-300 mt-1">Anda sudah absen pulang hari ini.</p>
          </div>
        ) : isCheckedIn ? (
          <Button onClick={onClockOut} className="w-full bg-red-600 hover:bg-red-700 text-white border-transparent py-4 text-lg shadow-lg shadow-red-900/20">
            <LogOut className="h-6 w-6 mr-2" /> Clock Out
          </Button>
        ) : (
          <Button onClick={onClockIn} className="w-full bg-cbp-gold text-cbp-navy hover:bg-white border-transparent py-4 text-lg shadow-lg shadow-cbp-gold/20 font-bold">
            <LogIn className="h-6 w-6 mr-2" /> Clock In
          </Button>
        )}

        {isCheckedIn && !isCheckedOut && (
          <p className="text-xs text-slate-400 mt-4">
            Masuk: {todayRecord.checkIn} WIB
          </p>
        )}
      </div>
    </Card>
  );
};
