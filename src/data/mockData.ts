// Mock data for the Finance ERP module

export const kpiData = {
  totalRevenue: 2847500,
  totalExpenses: 1623400,
  netProfit: 1224100,
  cashBalance: 3456789,
  revenueChange: 12.5,
  expensesChange: -3.2,
  profitChange: 18.7,
  cashChange: 8.4,
};

export const monthlyData = [
  { month: 'Jan', revenue: 186000, expenses: 120000, profit: 66000 },
  { month: 'Feb', revenue: 205000, expenses: 135000, profit: 70000 },
  { month: 'Mar', revenue: 237000, expenses: 142000, profit: 95000 },
  { month: 'Apr', revenue: 198000, expenses: 118000, profit: 80000 },
  { month: 'May', revenue: 254000, expenses: 155000, profit: 99000 },
  { month: 'Jun', revenue: 289000, expenses: 168000, profit: 121000 },
  { month: 'Jul', revenue: 312000, expenses: 185000, profit: 127000 },
  { month: 'Aug', revenue: 278000, expenses: 162000, profit: 116000 },
  { month: 'Sep', revenue: 301000, expenses: 175000, profit: 126000 },
  { month: 'Oct', revenue: 267000, expenses: 148000, profit: 119000 },
  { month: 'Nov', revenue: 324000, expenses: 192000, profit: 132000 },
  { month: 'Dec', revenue: 356000, expenses: 205000, profit: 151000 },
];

export const expensesByCategory = [
  { category: 'Salaries', amount: 650000, color: 'hsl(var(--chart-1))' },
  { category: 'Operations', amount: 320000, color: 'hsl(var(--chart-2))' },
  { category: 'Marketing', amount: 185000, color: 'hsl(var(--chart-3))' },
  { category: 'Technology', amount: 245000, color: 'hsl(var(--chart-4))' },
  { category: 'Facilities', amount: 142000, color: 'hsl(var(--chart-5))' },
  { category: 'Other', amount: 81400, color: 'hsl(var(--chart-6))' },
];

export const revenueDistribution = [
  { source: 'Product Sales', value: 45, amount: 1281375 },
  { source: 'Services', value: 30, amount: 854250 },
  { source: 'Subscriptions', value: 15, amount: 427125 },
  { source: 'Consulting', value: 10, amount: 284750 },
];

export interface AccountingEntry {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  account: string;
  status: 'validated' | 'pending' | 'rejected';
  reference: string;
}

export const accountingEntries: AccountingEntry[] = [
  { id: '1', date: '2024-01-15', description: 'Office Supplies Purchase', debit: 2500, credit: 0, account: 'Expenses', status: 'validated', reference: 'JE-2024-001' },
  { id: '2', date: '2024-01-16', description: 'Client Payment - Project Alpha', debit: 0, credit: 45000, account: 'Revenue', status: 'validated', reference: 'JE-2024-002' },
  { id: '3', date: '2024-01-18', description: 'Software License Renewal', debit: 12000, credit: 0, account: 'Technology', status: 'pending', reference: 'JE-2024-003' },
  { id: '4', date: '2024-01-20', description: 'Marketing Campaign Q1', debit: 35000, credit: 0, account: 'Marketing', status: 'pending', reference: 'JE-2024-004' },
  { id: '5', date: '2024-01-22', description: 'Employee Reimbursement', debit: 1800, credit: 0, account: 'Expenses', status: 'rejected', reference: 'JE-2024-005' },
  { id: '6', date: '2024-01-23', description: 'Consulting Revenue', debit: 0, credit: 28000, account: 'Revenue', status: 'validated', reference: 'JE-2024-006' },
  { id: '7', date: '2024-01-25', description: 'Equipment Purchase', debit: 75000, credit: 0, account: 'Assets', status: 'validated', reference: 'JE-2024-007' },
  { id: '8', date: '2024-01-26', description: 'Subscription Fees Collected', debit: 0, credit: 15600, account: 'Revenue', status: 'validated', reference: 'JE-2024-008' },
  { id: '9', date: '2024-01-28', description: 'Utility Bills Payment', debit: 4200, credit: 0, account: 'Facilities', status: 'pending', reference: 'JE-2024-009' },
  { id: '10', date: '2024-01-30', description: 'Client Retainer - Beta Corp', debit: 0, credit: 60000, account: 'Revenue', status: 'validated', reference: 'JE-2024-010' },
];

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  type: 'client' | 'supplier';
  items: number;
}

export const invoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', client: 'Acme Corporation', amount: 45000, issueDate: '2024-01-05', dueDate: '2024-02-05', status: 'paid', type: 'client', items: 3 },
  { id: '2', invoiceNumber: 'INV-2024-002', client: 'Tech Solutions Ltd', amount: 28500, issueDate: '2024-01-10', dueDate: '2024-02-10', status: 'paid', type: 'client', items: 2 },
  { id: '3', invoiceNumber: 'INV-2024-003', client: 'Global Enterprises', amount: 67200, issueDate: '2024-01-12', dueDate: '2024-02-12', status: 'unpaid', type: 'client', items: 5 },
  { id: '4', invoiceNumber: 'INV-2024-004', client: 'StartUp Innovate', amount: 15800, issueDate: '2024-01-15', dueDate: '2024-02-15', status: 'unpaid', type: 'client', items: 1 },
  { id: '5', invoiceNumber: 'INV-2024-005', client: 'Metro Supplies', amount: 8900, issueDate: '2023-12-01', dueDate: '2024-01-01', status: 'overdue', type: 'supplier', items: 4 },
  { id: '6', invoiceNumber: 'INV-2024-006', client: 'Cloud Services Inc', amount: 22400, issueDate: '2023-12-10', dueDate: '2024-01-10', status: 'overdue', type: 'supplier', items: 2 },
  { id: '7', invoiceNumber: 'INV-2024-007', client: 'Digital Marketing Pro', amount: 35000, issueDate: '2024-01-18', dueDate: '2024-02-18', status: 'unpaid', type: 'client', items: 3 },
  { id: '8', invoiceNumber: 'INV-2024-008', client: 'Office Depot', amount: 4500, issueDate: '2024-01-20', dueDate: '2024-02-20', status: 'paid', type: 'supplier', items: 8 },
];

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: 'on-track' | 'warning' | 'exceeded';
}

export const budgets: Budget[] = [
  { id: '1', category: 'Marketing', allocated: 200000, spent: 145000, remaining: 55000, period: 'Q1 2024', status: 'on-track' },
  { id: '2', category: 'Technology', allocated: 150000, spent: 142000, remaining: 8000, period: 'Q1 2024', status: 'warning' },
  { id: '3', category: 'Operations', allocated: 180000, spent: 195000, remaining: -15000, period: 'Q1 2024', status: 'exceeded' },
  { id: '4', category: 'Human Resources', allocated: 250000, spent: 180000, remaining: 70000, period: 'Q1 2024', status: 'on-track' },
  { id: '5', category: 'Facilities', allocated: 80000, spent: 72000, remaining: 8000, period: 'Q1 2024', status: 'warning' },
  { id: '6', category: 'Research & Development', allocated: 300000, spent: 210000, remaining: 90000, period: 'Q1 2024', status: 'on-track' },
];

export const paymentTimeline = [
  { id: '1', date: '2024-01-28', description: 'Payment received from Acme Corp', amount: 45000, type: 'incoming' },
  { id: '2', date: '2024-01-25', description: 'Supplier payment - Office Depot', amount: 4500, type: 'outgoing' },
  { id: '3', date: '2024-01-22', description: 'Payment received from Tech Solutions', amount: 28500, type: 'incoming' },
  { id: '4', date: '2024-01-18', description: 'Cloud services subscription', amount: 2400, type: 'outgoing' },
  { id: '5', date: '2024-01-15', description: 'Payroll processing', amount: 125000, type: 'outgoing' },
  { id: '6', date: '2024-01-10', description: 'Client retainer payment', amount: 15000, type: 'incoming' },
];
