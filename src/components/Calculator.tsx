import { useState } from 'react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';

export default function CalculatorView() {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState('10');
  const [tenure, setTenure] = useState('12');
  const [emi, setEmi] = useState(0);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / (12 * 100);
    const n = parseFloat(tenure);
    if (isNaN(p) || isNaN(r) || isNaN(n) || r === 0) {
      setEmi(0);
      return;
    }
    const result = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(result);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6">EMI Calculator</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Interest Rate (%)</label>
            <input 
              type="number" 
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tenure (Months)</label>
            <input 
              type="number" 
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button 
          onClick={calculate}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
        >
          Calculate EMI
        </button>

        {emi > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-indigo-50 rounded-2xl text-center"
          >
            <p className="text-indigo-600 text-sm font-medium mb-1">Monthly EMI</p>
            <h4 className="text-4xl font-bold text-indigo-900">{formatCurrency(emi)}</h4>
            <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-indigo-100">
              <div>
                <p className="text-[10px] text-indigo-400 uppercase font-bold">Total Interest</p>
                <p className="text-sm font-bold text-indigo-900">{formatCurrency(emi * parseFloat(tenure) - parseFloat(amount))}</p>
              </div>
              <div>
                <p className="text-[10px] text-indigo-400 uppercase font-bold">Total Payment</p>
                <p className="text-sm font-bold text-indigo-900">{formatCurrency(emi * parseFloat(tenure))}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
