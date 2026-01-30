
"use client";

import React, { useState } from 'react';
import { useServiceLogic, ServiceItem } from '@cbp/core';
import { Card, Button, SearchInput, Badge } from '@cbp/ui';
import { Plus, Edit2, Trash2, Tag, Building2 } from 'lucide-react';
import { ServiceModal } from './ServiceModal';

export const ServiceListView: React.FC = () => {
  const { services, addService, updateService, deleteService } = useServiceLogic();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (service: ServiceItem) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'By Request';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="w-full sm:w-72">
           <SearchInput 
             placeholder="Cari nama layanan..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
         </div>
         <Button onClick={handleAddNew} className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Tambah Layanan
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="flex flex-col relative group overflow-hidden border-slate-200 dark:border-slate-800">
             <div className="absolute top-0 left-0 w-1 h-full bg-cbp-navy dark:bg-cbp-gold"></div>
             
             <div className="flex justify-between items-start mb-3 pl-3">
               <Badge variant={service.division === 'Christian Law Firm' ? 'info' : service.division === 'Sahabat Ijinku' ? 'warning' : 'success'}>
                  {service.division}
               </Badge>
               <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                 {service.isActive ? 'Active' : 'Draft'}
               </span>
             </div>

             <h3 className="text-lg font-bold text-cbp-navy dark:text-white mb-2 pl-3">{service.title}</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow pl-3 line-clamp-2">
               {service.description}
             </p>

             <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 pl-3 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Harga Mulai</span>
                  <span className="font-bold text-cbp-navy dark:text-white">{formatCurrency(service.basePrice)}</span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => handleEdit(service)}
                     className="p-2 text-slate-400 hover:text-cbp-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                   >
                     <Edit2 className="h-4 w-4" />
                   </button>
                   <button 
                     onClick={() => deleteService(service.id)}
                     className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                   >
                     <Trash2 className="h-4 w-4" />
                   </button>
                </div>
             </div>
          </Card>
        ))}
      </div>

      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingService) {
            updateService(data.id, data);
          } else {
            addService(data);
          }
        }}
        initialData={editingService}
      />
    </div>
  );
};
