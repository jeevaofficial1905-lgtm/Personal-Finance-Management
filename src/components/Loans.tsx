import { CreditCard, Plus } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { Loan } from '../types';

interface LoansProps {
  loans: Loan[];
}

export default function LoansView({ loans }: LoansProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loans.map((loan) => (
          <div key={loan.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{loan.title}</h3>
                  <p className="text-xs text-slate-500">Interest: {loan.interestRate}% | Tenure: {loan.tenure} months</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                {loan.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Principal Amount</span>
                <span className="font-semibold text-slate-900">{formatCurrency(loan.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Monthly EMI</span>
                <span className="font-bold text-indigo-600">{formatCurrency(loan.emi || 0)}</span>
              </div>
              
              <div className="pt-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-900 font-medium">45% Paid</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Pay EMI
              </button>
              <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-100 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
        
        <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all group">
          <div className="p-3 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-medium">Add New Loan</span>
        </button>
      </div>
    </div>
  );
}
