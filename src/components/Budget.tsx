export default function BudgetView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Monthly Budget</h3>
            <button className="text-indigo-600 text-sm font-medium">Edit</button>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Food & Dining</span>
                <span className="font-medium text-slate-900">$350 / $500</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Transport</span>
                <span className="font-medium text-slate-900">$120 / $200</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Entertainment</span>
                <span className="font-medium text-slate-900">$180 / $150</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-[10px] text-rose-600 font-medium mt-1">Over budget by $30</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full border-8 border-indigo-600 border-t-slate-100 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-slate-900">75%</span>
          </div>
          <h3 className="font-bold text-slate-900">Total Budget Used</h3>
          <p className="text-sm text-slate-500 mt-2">You have $450 remaining for the rest of the month.</p>
          <button className="mt-6 w-full bg-slate-50 border border-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-100 transition-colors">
            View Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
