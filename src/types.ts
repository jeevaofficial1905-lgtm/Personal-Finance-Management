export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: TransactionType;
}

export interface Loan {
  id: string;
  title: string;
  amount: number;
  interestRate: number;
  tenure: number; // in months
  startDate: string;
  type: 'borrowed' | 'lent';
  status: 'active' | 'closed';
  emi?: number;
}

export interface EMI {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'yearly';
}

export interface Person {
  id: string;
  name: string;
  type: 'debtor' | 'creditor';
  balance: number;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
}
