
export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue' | 'Verifying' | 'Rejected'; 
  issueDate: string;
  dueDate: string;
  description: string;
  paymentProofUrl?: string;
  rejectionReason?: string; 
}

export interface PayrollSlip {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Draft' | 'Paid';
  paymentDate?: string;
}
