import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, Loan, Person } from '../types';

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
  onAddLoan: (l: Omit<Loan, 'id'>) => void;
  onAddPerson: (p: Omit<Person, 'id'>) => void;
}

export default function EntryModal({ isOpen, onClose, onAddTransaction, onAddLoan, onAddPerson }: EntryModalProps) {
  const [type, setType] = useState<'transaction' | 'loan' | 'person'>('transaction');

  // Transaction form state
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [transType, setTransType] = useState<'income' | 'expense'>('expense');

  // Loan form state
  const [loanTitle, setLoanTitle] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');

  // Person form state
  const [personName, setPersonName] = useState('');
  const [personType, setPersonType] = useState<'debtor' | 'creditor'>('debtor');
  const [personBalance, setPersonBalance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'transaction') {
      onAddTransaction({
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(amount),
        category,
        description,
        type: transType,
      });
    } else if (type === 'loan') {
      onAddLoan({
        title: loanTitle,
        amount: parseFloat(loanAmount),
        interestRate: parseFloat(loanRate),
        tenure: parseInt(loanTenure),
        startDate: new Date().toISOString().split('T')[0],
        type: 'borrowed',
        status: 'active',
      });
    } else if (type === 'person') {
      onAddPerson({
        name: personName,
        type: personType,
        balance: parseFloat(personBalance),
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">New Entry</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                {(['transaction', 'loan', 'person'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      type === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'transaction' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setTransType('expense')}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          transType === 'expense' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-100 text-slate-400'
                        }`}
                      >
                        Expense
                      </button>
                      <button
                        type="button"
                        onClick={() => setTransType('income')}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          transType === 'income' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-100 text-slate-400'
                        }`}
                      >
                        Income
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Amount</label>
                      <input
                        required
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Category</label>
                      <input
                        required
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Food, Rent, Salary"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional details..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                      />
                    </div>
                  </>
                )}

                {type === 'loan' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Loan Title</label>
                      <input
                        required
                        type="text"
                        value={loanTitle}
                        onChange={(e) => setLoanTitle(e.target.value)}
                        placeholder="e.g. Car Loan"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Amount</label>
                        <input
                          required
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Rate (%)</label>
                        <input
                          required
                          type="number"
                          value={loanRate}
                          onChange={(e) => setLoanRate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tenure (Months)</label>
                      <input
                        required
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                )}

                {type === 'person' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Name</label>
                      <input
                        required
                        type="text"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPersonType('debtor')}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          personType === 'debtor' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-slate-100 text-slate-400'
                        }`}
                      >
                        Debtor
                      </button>
                      <button
                        type="button"
                        onClick={() => setPersonType('creditor')}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${
                          personType === 'creditor' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-100 text-slate-400'
                        }`}
                      >
                        Creditor
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Balance</label>
                      <input
                        required
                        type="number"
                        value={personBalance}
                        onChange={(e) => setPersonBalance(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 mt-4"
                >
                  Save Entry
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
