
import { BankOption } from './types';

export const MERCHANT_CODE_PREFIX = '70070';

export const VIRTUAL_ACCOUNT_BANKS: BankOption[] = [
  { name: 'BCA', color: 'bg-blue-600', type: 'VA' },
  { name: 'Mandiri', color: 'bg-yellow-500', type: 'VA' },
  { name: 'BNI', color: 'bg-orange-500', type: 'VA' },
  { name: 'BRI', color: 'bg-blue-800', type: 'VA' }
];

export const QRIS_OPTION: BankOption = {
  name: 'GoPay / QRIS',
  color: 'bg-slate-800',
  type: 'QRIS'
};
