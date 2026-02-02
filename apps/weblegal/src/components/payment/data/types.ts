
import { Invoice } from '@cbp/core';

export type PaymentStep = 'SELECT_METHOD' | 'PAYMENT_DETAIL' | 'PROCESSING' | 'SUCCESS';

export type PaymentMethodType = 'VA' | 'QRIS';

export interface BankOption {
  name: string;
  color: string;
  type: PaymentMethodType;
}

export interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSuccess: () => void;
}
