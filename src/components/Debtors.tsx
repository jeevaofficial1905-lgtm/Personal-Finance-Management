import { ChevronRight } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { Person } from '../types';

interface DebtorsProps {
  people: Person[];
}

export default function DebtorsView({ people }: DebtorsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {people.map((person) => (
        <div key={person.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
              person.type === 'debtor' ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
            )}>
              {person.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{person.name}</h3>
              <p className="text-xs text-slate-500 capitalize">{person.type}</p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-xl mb-6">
            <p className="text-xs text-slate-500 mb-1">Current Balance</p>
            <p className={cn(
              "text-2xl font-bold",
              person.type === 'debtor' ? "text-rose-600" : "text-emerald-600"
            )}>
              {formatCurrency(person.balance)}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              {person.type === 'debtor' ? 'Collect' : 'Pay'}
            </button>
            <button className="p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
