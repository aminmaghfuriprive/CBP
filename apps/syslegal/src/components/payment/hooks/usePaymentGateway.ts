
import { useState, useEffect } from 'react';
import { Invoice } from '@cbp/core';
import { PaymentStep, BankOption } from '../data/types';
import { MERCHANT_CODE_PREFIX } from '../data/constants';

interface UsePaymentGatewayProps {
  isOpen: boolean;
  invoice: Invoice | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const usePaymentGateway = ({ isOpen, invoice, onSuccess, onClose }: UsePaymentGatewayProps) => {
  const [step, setStep] = useState<PaymentStep>('SELECT_METHOD');
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [copied, setCopied] = useState(false);

  // Reset state saat modal dibuka/tutup
  useEffect(() => {
    if (isOpen) {
      setStep('SELECT_METHOD');
      setSelectedBank(null);
      setCopied(false);
    }
  }, [isOpen]);

  const handleSelectBank = (bank: BankOption) => {
    setSelectedBank(bank);
    setStep('PAYMENT_DETAIL');
  };

  const handleCopy = () => {
    if (!invoice) return;
    const vaNumber = `${MERCHANT_CODE_PREFIX}${invoice.id.replace(/\D/g, '')}`;
    navigator.clipboard.writeText(vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = () => {
    setStep('PROCESSING');
    
    // Simulasi network delay
    setTimeout(() => {
      setStep('SUCCESS');
      
      // Simulasi auto-redirect setelah sukses
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 2500);
  };

  const resetSelection = () => {
    setStep('SELECT_METHOD');
    setSelectedBank(null);
  };

  return {
    step,
    selectedBank,
    copied,
    handleSelectBank,
    handleCopy,
    simulatePayment,
    resetSelection
  };
};
