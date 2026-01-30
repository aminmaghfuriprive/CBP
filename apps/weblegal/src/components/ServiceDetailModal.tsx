
"use client";

import React from 'react';
import { ServiceItem } from '@cbp/core';
import { Button } from '@cbp/ui';
import { X, Clock, CheckCircle2, ArrowRight, FileText, Briefcase } from 'lucide-react';
import * as Icons from 'lucide-react';
import Link from 'next/link';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;
  const totalDays = service.sop ? service.sop.reduce((acc, curr) => acc + curr.estimatedDays, 0) : 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-cbp-navy dark:bg-cbp-gold text-white dark:text-cbp-navy flex items-center justify-center flex-shrink-0">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-cbp-gold uppercase tracking-widest mb-1">{service.division}</p>
              <h3 className="text-xl font-serif font-bold text-cbp-navy dark:text-white leading-tight">{service.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" /> Deskripsi Layanan
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.description} Kami memastikan pendekatan hukum yang komprehensif, mulai dari analisis risiko awal hingga eksekusi dokumen legal yang presisi.
            </p>
          </div>

          {/* SOP Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-slate-400" /> Alur Pengerjaan (SOP)
              </h4>
              {totalDays > 0 && (
                <span className="text-xs font-medium px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Est. {totalDays} Hari Kerja
                </span>
              )}
            </div>

            <div className="relative pl-2 ml-2 border-l-2 border-slate-100 dark:border-slate-800 space-y-6">
              {service.sop && service.sop.length > 0 ? (
                service.sop.map((step, idx) => (
                  <div key={step.id} className="relative pl-6">
                    {/* Dot */}
                    <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-cbp-gold shadow-sm"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">{step.phase}</span>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{step.task}</p>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                        {step.estimatedDays} Hari
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pl-6 text-sm text-slate-500 italic">
                  Detail langkah pengerjaan akan disesuaikan setelah konsultasi awal dengan klien.
                </div>
              )}
            </div>
          </div>
          
          {/* Price Indication (Optional) */}
          {service.basePrice && service.basePrice > 0 && (
             <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Estimasi Biaya Mulai</span>
                <span className="text-lg font-bold text-cbp-navy dark:text-cbp-gold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(service.basePrice)}
                </span>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Tutup</Button>
          <Link href="/contact">
            <Button className="gap-2 shadow-lg shadow-cbp-navy/20 dark:shadow-cbp-gold/20">
              Konsultasi Sekarang <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
