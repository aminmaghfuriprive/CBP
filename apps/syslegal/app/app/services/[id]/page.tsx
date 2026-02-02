
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ServiceSOPManager } from '@/components/services/ServiceSOPManager';
import { useServiceDetail } from '@/components/services/hooks/useServiceDetail';
import { ServiceDetailHeader } from '@/components/services/molecules/ServiceDetailHeader';
import { ServiceBasicInfo } from '@/components/services/molecules/ServiceBasicInfo';
import { ServiceSettingsCard } from '@/components/services/molecules/ServiceSettingsCard';
import { ServiceWebPreview } from '@/components/services/molecules/ServiceWebPreview';

export default function ServiceDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  // Logic Layer
  const { 
    service, formData, isDirty, isLoading, 
    handleChange, handleSave, handleDelete, handleSopChange, router 
  } = useServiceDetail(id);

  if (isLoading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-cbp-navy" /></div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Molecule */}
      <ServiceDetailHeader 
        title={service?.title}
        division={service?.division}
        isActive={service?.isActive}
        isDirty={isDirty}
        onBack={() => router.push('/app/services')}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-8">
           <ServiceBasicInfo 
             title={formData.title}
             description={formData.description}
             onChange={handleChange}
           />
           <ServiceSOPManager 
             steps={service?.sop || []} 
             onStepsChange={handleSopChange} 
             serviceTitle={formData.title}
             serviceDescription={formData.description}
           />
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
           <ServiceSettingsCard 
             division={formData.division}
             basePrice={formData.basePrice}
             isActive={formData.isActive}
             onChange={handleChange}
           />
           <ServiceWebPreview />
        </div>
      </div>
    </div>
  );
}
