
import { PayrollSlip } from '../types';

export const MOCK_PAYROLL: PayrollSlip[] = [
  {
    id: 'pay_001',
    employeeId: 'u_prod',
    employeeName: 'Saumita Ngesti R., S.H.',
    period: 'Oktober 2023',
    basicSalary: 8000000,
    allowances: 1500000,
    deductions: 200000,
    netSalary: 9300000,
    status: 'Paid',
    paymentDate: '2023-10-28'
  },
  {
    id: 'pay_002',
    employeeId: 'u_field',
    employeeName: 'Imam Nurrohman',
    period: 'Oktober 2023',
    basicSalary: 6000000,
    allowances: 2000000, // Tunjangan lapangan
    deductions: 150000,
    netSalary: 7850000,
    status: 'Paid',
    paymentDate: '2023-10-28'
  },
  {
    id: 'pay_003',
    employeeId: 'u_finance',
    employeeName: 'Clara Septia M.',
    period: 'Oktober 2023',
    basicSalary: 7000000,
    allowances: 1000000,
    deductions: 180000,
    netSalary: 7820000,
    status: 'Paid',
    paymentDate: '2023-10-28'
  },
  {
    id: 'pay_004',
    employeeId: 'u_it',
    employeeName: 'Jamiun Mukromin',
    period: 'November 2023',
    basicSalary: 9000000,
    allowances: 500000,
    deductions: 0,
    netSalary: 9500000,
    status: 'Draft'
  }
];
