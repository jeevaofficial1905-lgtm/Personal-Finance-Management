import { 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  CreditCard 
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { Transaction } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  balance: number;
  income: number;
  expense: number;
}

export default function DashboardView({ transactions, balance, income, expense }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Total Balance</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(balance)}</h3>
          <p className="text-sm text-slate-500 mt-1">Available across all accounts</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowUpCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12% from last month</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(income)}</h3>
          <p className="text-sm text-slate-500 mt-1">Total Income this month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <ArrowDownCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">-5% from last month</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(expense)}</h3>
          <p className="text-sm text-slate-500 mt-1">Total Expense this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent Transactions</h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    t.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {t.type === 'income' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.category}</p>
                    <p className="text-xs text-slate-500">{t.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-semibold",
                    t.type === 'income' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </p>
                  <p className="text-[10px] text-slate-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <h3 className="text-lg font-semibold mb-2">Smart Budgeting</h3>
            <p className="text-indigo-100 text-sm mb-4">You've spent 65% of your food budget this month. Try to save more!</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
              Adjust Budget
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Upcoming EMIs</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Home Loan EMI</p>
                    <p className="text-xs text-slate-500">Due in 5 days</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-900">$2,014</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
