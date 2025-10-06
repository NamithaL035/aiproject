

import React, { useState, useEffect } from 'react';
import { 
    PlanIcon, AssistantIcon, PlusIcon, SpinnerIcon,
    GroceriesIcon, UtilitiesIcon, RentIcon, EntertainmentIcon, 
    TransportIcon, HealthcareIcon, ShoppingIcon, OtherIcon, IncomeIcon
} from './icons';
import { Transaction, SavedPlan } from '../types';
import { getRecommendations, PersonalizationInput } from '../services/personalizationService';
import BudgetOverview from './BudgetOverview';

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

const categoryIcons: { [key: string]: React.ReactNode } = {
    'Groceries': <GroceriesIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Utilities': <UtilitiesIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Rent': <RentIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Entertainment': <EntertainmentIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Transport': <TransportIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Healthcare': <HealthcareIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Shopping': <ShoppingIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
    'Income': <IncomeIcon className="w-5 h-5 text-green-400" />,
    'Other': <OtherIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />,
};
const getCategoryIcon = (category: string) => categoryIcons[category] || <OtherIcon className="w-5 h-5 text-gray-400" />;

const DonutChart: React.FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <div className="text-center text-[var(--color-text-secondary)] p-8">No expense data for this month.</div>;

    let accumulated = 0;
    const chartData = data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const itemData = { ...item, percentage, color: CATEGORY_COLORS[index % CATEGORY_COLORS.length], offset: accumulated };
        accumulated += percentage;
        return itemData;
    });

    const radius = 35;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48 flex-shrink-0">
                 <div className="absolute inset-0 rounded-full neumorphic-inset p-2">
                    <svg viewBox="0 0 100 100" className="-rotate-90">
                        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="var(--shadow-dark)" strokeOpacity="0.5" strokeWidth="15" />
                        {chartData.map((item) => (
                            <circle
                                key={item.name}
                                cx="50" cy="50" r={radius}
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="15"
                                strokeDasharray={`${(item.percentage / 100) * circumference} ${circumference}`}
                                strokeDashoffset={-(item.offset / 100) * circumference}
                            />
                        ))}
                    </svg>
                 </div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-[var(--color-text-secondary)]">Total Spend</span>
                    <span className="text-xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(total)}</span>
                </div>
            </div>
            <ul className="space-y-2 text-sm w-full">
                {chartData.map(item => (
                    <li key={item.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-[var(--color-text-primary)]">{item.name}</span>
                        </div>
                        <span className="font-semibold text-[var(--color-text-secondary)]">{item.percentage.toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MonthlyTrendChart: React.FC<{ data: { month: string; income: number; expense: number }[] }> = ({ data }) => {
    const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]));
    if (maxVal === 0) return <div className="text-center text-[var(--color-text-secondary)] p-8">Not enough data for a monthly trend.</div>;

    return (
        <div className="flex items-end h-64 gap-4 pl-4 pb-2">
            {data.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex-1 flex items-end w-full gap-1 justify-center">
                        <div className="w-1/2 rounded-t-sm transition-all neumorphic-convex" style={{ height: `${(d.income / maxVal) * 100}%`, backgroundColor: '#10B981' }} title={`Income: ${currencyFormatter.format(d.income)}`}></div>
                        <div className="w-1/2 rounded-t-sm transition-all neumorphic-convex" style={{ height: `${(d.expense / maxVal) * 100}%`, backgroundColor: '#EF4444' }} title={`Expense: ${currencyFormatter.format(d.expense)}`}></div>
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{d.month}</span>
                </div>
            ))}
        </div>
    );
};


interface DashboardViewProps {
    setActiveView: (view: string) => void;
    transactions: Transaction[];
    plans: SavedPlan[];
    isFamilyMode: boolean;
}

const SavingsTipCard: React.FC = () => {
    const [recommendations, setRecommendations] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const dummyInput: PersonalizationInput = { user_id: 'user123', past_6_months: [], brands_preference: [], pantry: [], budget: 8000 };
            const result = await getRecommendations(dummyInput);
            setRecommendations(result.recommendations);
        } catch (e) {
            console.error("Failed to fetch recommendations", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <div className="card h-full flex flex-col">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Smart Savings Tips</h3>
            {loading && <div className="flex-1 flex items-center justify-center"><SpinnerIcon /></div>}
            {!loading && recommendations && (
                <div className="space-y-4 flex-1">
                    {recommendations.slice(0, 2).map((rec, index) => (
                        <div key={index} className="neumorphic-inset p-3 rounded-lg">
                            <p className="font-semibold text-sm text-[var(--color-text-primary)]">{rec.suggestion}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{rec.why}</p>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={fetchRecommendations} className="text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity mt-4 text-left">
                Get New Tips &rarr;
            </button>
        </div>
    );
};

const RecentPlansCard: React.FC<{ plans: SavedPlan[], setActiveView: (view: string) => void }> = ({ plans, setActiveView }) => {
    // FIX: Use getTime() for sorting dates to avoid arithmetic errors on Date objects.
    const sortedPlans = [...plans].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return (
        <div className="card">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Recent Grocery Plans</h3>
            <div className="space-y-3">
                {sortedPlans.slice(0, 3).map(plan => (
                    <div key={plan.id} className="flex justify-between items-center neumorphic-inset p-3 rounded-lg">
                        <div>
                            <p className="font-semibold text-[var(--color-text-primary)]">{plan.title}</p>
                            <p className="text-xs text-[var(--color-text-secondary)]">{plan.date}</p>
                        </div>
                        <span className="font-bold text-[var(--color-text-primary)]">₹{plan.estimated_total}</span>
                    </div>
                ))}
            </div>
            <button onClick={() => setActiveView('My Plans')} className="text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 transition-opacity mt-4">
                View All Plans &rarr;
            </button>
        </div>
    );
};


const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView, transactions, plans, isFamilyMode }) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = transactions.filter(t => {
        const d = new Date(t.date);
        return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const categoryDataMap = monthlyExpenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as { [key: string]: number });

    const categoryData = Object.entries(categoryDataMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const monthLabels = Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1).toLocaleString('default', { month: 'short' }));
    const monthlyData = monthLabels.map(label => ({ month: label, income: 0, expense: 0 }));

    transactions.forEach(t => {
        const transactionDate = new Date(t.date);
        if (transactionDate.getTime() >= sixMonthsAgo.getTime()) {
            const monthIndex = (transactionDate.getFullYear() - sixMonthsAgo.getFullYear()) * 12 + (transactionDate.getMonth() - sixMonthsAgo.getMonth());
            if (monthIndex >= 0 && monthIndex < 6) {
                if (t.type === 'income') monthlyData[monthIndex].income += t.amount;
                else monthlyData[monthIndex].expense += t.amount;
            }
        }
    });
    
    // FIX: Use getTime() for sorting dates to avoid arithmetic errors on Date objects and create a copy to avoid mutating props.
    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    
  return (
      <div className="space-y-8 relative">
           <section className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight mb-2">
                  Welcome back, Admin!
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-[var(--color-text-secondary)]">
                  Here's a complete overview of your household's financial health and planning.
              </p>
          </section>

          <BudgetOverview transactions={transactions} />

          <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 card">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">This Month's Expense Breakdown</h3>
                  <DonutChart data={categoryData} />
              </div>
              <div className="lg:col-span-3 card">
                   <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Income vs Expense (Last 6 Months)</h3>
                   <MonthlyTrendChart data={monthlyData} />
              </div>
          </section>
          
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentPlansCard plans={plans} setActiveView={setActiveView} />
              <SavingsTipCard />
          </section>

          <section className="card">
                 <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Recent Transactions</h3>
                 <ul className="divide-y divide-[var(--shadow-dark)]">
                    {recentTransactions.length > 0 ? recentTransactions.map(t => (
                        <li key={t.id} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full neumorphic-inset">{getCategoryIcon(t.category)}</div>
                                <div>
                                    <p className="font-semibold text-[var(--color-text-primary)]">{t.description}</p>
                                    <p className="text-sm text-[var(--color-text-secondary)]">{new Date(t.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                {t.type === 'income' ? '+' : '-'} {currencyFormatter.format(t.amount)}
                            </p>
                        </li>
                    )) : (
                        <li className="text-center py-4 text-[var(--color-text-secondary)]">
                            No transactions yet.
                        </li>
                    )}
                 </ul>
            </section>

          {!isFamilyMode && (
            <section className="card text-center">
                    <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Need Help?</h2>
                    <p className="max-w-2xl mx-auto mb-6 text-[var(--color-text-secondary)]">
                        Use our AI Assistant to get recipe ideas from your grocery list, compare prices, or get quick savings tips.
                    </p>
                    <button onClick={() => setActiveView('AI Assistant')} className="btn-primary inline-block">
                        Ask AI Assistant
                    </button>
            </section>
          )}
          
          {!isFamilyMode && (
             <button 
              title="Add New Transaction"
              onClick={() => setActiveView('Configuration')}
              className="btn-primary fixed bottom-8 right-8 !rounded-full !p-4 w-16 h-16"
          >
              <PlusIcon />
          </button>
          )}
      </div>
  );
};

export default DashboardView;