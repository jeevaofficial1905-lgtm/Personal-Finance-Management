import { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Calculator, 
  PieChart, 
  Plus,
  Menu,
  X,
  Settings,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, calculateEMI } from './lib/utils';
import { 
  Transaction, 
  Loan, 
  Person
} from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

// Components
import DashboardView from './components/Dashboard';
import TransactionsView from './components/Transactions';
import LoansView from './components/Loans';
import BudgetView from './components/Budget';
import DebtorsView from './components/Debtors';
import PortfolioView from './components/Portfolio';
import CalculatorView from './components/Calculator';
import ReportsView from './components/Reports';
import EntryModal from './components/EntryModal';

// Initial Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-03-25', amount: 5000, category: 'Salary', description: 'Monthly Salary', type: 'income' },
  { id: '2', date: '2026-03-26', amount: 120, category: 'Food', description: 'Grocery shopping', type: 'expense' },
];

const INITIAL_LOANS: Loan[] = [
  { id: '1', title: 'Home Loan', amount: 250000, interestRate: 7.5, tenure: 240, startDate: '2025-01-01', type: 'borrowed', status: 'active', emi: 2014 },
];

const INITIAL_PEOPLE: Person[] = [
  { id: '1', name: 'John Doe', type: 'debtor', balance: 500 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);

  // State with Local Storage
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('fintrack_transactions', INITIAL_TRANSACTIONS);
  const [loans, setLoans] = useLocalStorage<Loan[]>('fintrack_loans', INITIAL_LOANS);
  const [people, setPeople] = useLocalStorage<Person[]>('fintrack_people', INITIAL_PEOPLE);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Entries', icon: Wallet },
    { id: 'loans', label: 'Loans & EMI', icon: CreditCard },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'debtors', label: 'Debtors/Creditors', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
  ];

  const handleAddTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { ...t, id: crypto.randomUUID() };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleAddLoan = (l: Omit<Loan, 'id'>) => {
    const emi = calculateEMI(l.amount, l.interestRate, l.tenure);
    const newLoan: Loan = { ...l, id: crypto.randomUUID(), emi };
    setLoans([newLoan, ...loans]);
  };

  const handleAddPerson = (p: Omit<Person, 'id'>) => {
    const newPerson: Person = { ...p, id: crypto.randomUUID() };
    setPeople([newPerson, ...people]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Wallet className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900">FinTrack</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  activeTab === tab.id 
                    ? "bg-indigo-50 text-indigo-600 font-medium" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                JO
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Jeeva Official</p>
                <p className="text-xs text-slate-500 truncate">jeeva@example.com</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-lg font-semibold text-slate-900 capitalize">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Clock className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsEntryModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView transactions={transactions} balance={balance} income={totalIncome} expense={totalExpense} />}
              {activeTab === 'transactions' && <TransactionsView transactions={transactions} />}
              {activeTab === 'loans' && <LoansView loans={loans} />}
              {activeTab === 'budget' && <BudgetView />}
              {activeTab === 'debtors' && <DebtorsView people={people} />}
              {activeTab === 'portfolio' && <PortfolioView />}
              {activeTab === 'calculator' && <CalculatorView />}
              {activeTab === 'reports' && <ReportsView transactions={transactions} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Nav for Mobile */}
        <nav className="md:hidden h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 shrink-0">
          {tabs.slice(0, 4).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                activeTab === tab.id ? "text-indigo-600" : "text-slate-500"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center gap-1 p-2 text-slate-500"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </nav>
      </main>

      <EntryModal 
        isOpen={isEntryModalOpen} 
        onClose={() => setIsEntryModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        onAddLoan={handleAddLoan}
        onAddPerson={handleAddPerson}
      />
    </div>
  );
}
