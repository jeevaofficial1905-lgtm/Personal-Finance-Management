import { Briefcase } from 'lucide-react';

export default function PortfolioView() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Investment Portfolio</h3>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Connect your Google account to sync your investment portfolio from Google Sheets or Finance.
        </p>
        <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-3 mx-auto hover:bg-slate-50 transition-colors">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          Connect with Google
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Portfolio Value</p>
          <h4 className="text-2xl font-bold text-slate-900">$12,450.00</h4>
          <p className="text-xs text-emerald-600 font-medium mt-1">+4.2% today</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total Profit/Loss</p>
          <h4 className="text-2xl font-bold text-emerald-600">+$2,100.00</h4>
          <p className="text-xs text-slate-500 mt-1">Overall performance</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Top Performer</p>
          <h4 className="text-2xl font-bold text-slate-900">AAPL</h4>
          <p className="text-xs text-emerald-600 font-medium mt-1">+15.4% total</p>
        </div>
      </div>
    </div>
  );
}
