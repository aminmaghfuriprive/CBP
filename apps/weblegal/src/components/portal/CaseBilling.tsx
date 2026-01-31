
import React, { useState } from 'react';
import { Invoice } from '@cbp/core';
import { DollarSign } from 'lucide-react';
import { InvoiceCard } from '@/components/portal/InvoiceCard';
import { PaymentConfirmationModal } from '@/components/portal/PaymentConfirmationModal';

interface CaseBillingProps {
  invoices: Invoice[];
}

export const CaseBilling: React.FC<CaseBillingProps> = ({ invoices }) => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayClick = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsModalOpen(true);
  };

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
        <DollarSign className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 dark:text-slate-400">Tidak ada tagihan untuk kasus ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((inv) => (
        <InvoiceCard 
          key={inv.id} 
          invoice={inv} 
          onPay={handlePayClick} 
        />
      ))}

      <PaymentConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
};
