import { cn } from '../lib/utils';
import { Transaction } from '../types';

interface ReportsProps {
  transactions: Transaction[];
}

export default function ReportsView({ transactions }: ReportsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Income vs Expense Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2 px-4">
          {[40, 60, 35, 80, 55, 90, 45].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="flex-1 bg-indigo-600 rounded-t-sm" style={{ height: `${h}%` }}></div>
                <div className="flex-1 bg-rose-400 rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Day {i + 1}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            <span className="text-xs text-slate-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
            <span className="text-xs text-slate-600">Expense</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Expense by Category</h3>
          <div className="space-y-4">
            {[
              { cat: 'Housing', val: 45, color: 'bg-indigo-600' },
              { cat: 'Food', val: 20, color: 'bg-emerald-500' },
              { cat: 'Transport', val: 15, color: 'bg-amber-500' },
              { cat: 'Entertainment', val: 10, color: 'bg-rose-500' },
              { cat: 'Others', val: 10, color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{item.cat}</span>
                  <span className="font-bold text-slate-900">{item.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Monthly Summary</h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs text-emerald-600 font-medium">Highest Income</p>
              <p className="text-lg font-bold text-emerald-700">$5,000.00</p>
              <p className="text-[10px] text-emerald-600 mt-1">Source: Salary</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl">
              <p className="text-xs text-rose-600 font-medium">Highest Expense</p>
              <p className="text-lg font-bold text-rose-700">$1,500.00</p>
              <p className="text-[10px] text-rose-600 mt-1">Category: Rent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
