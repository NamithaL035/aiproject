

import React from 'react';
import { Transaction } from '../types';
import { GroceriesIcon, UtilitiesIcon, RentIcon, EntertainmentIcon, TransportIcon, HealthcareIcon, ShoppingIcon, OtherIcon, IncomeIcon } from './icons';

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

const categoryIcons: { [key: string]: React.ReactNode } = {
    'Groceries': <GroceriesIcon className="w-5 h-5 text-text-secondary" />,
    'Utilities': <UtilitiesIcon className="w-5 h-5 text-text-secondary" />,
    'Rent': <RentIcon className="w-5 h-5 text-text-secondary" />,
    'Entertainment': <EntertainmentIcon className="w-5 h-5 text-text-secondary" />,
    'Transport': <TransportIcon className="w-5 h-5 text-text-secondary" />,
    'Healthcare': <HealthcareIcon className="w-5 h-5 text-text-secondary" />,
    'Shopping': <ShoppingIcon className="w-5 h-5 text-text-secondary" />,
    'Income': <IncomeIcon className="w-5 h-5 text-green-500" />,
    'Other': <OtherIcon className="w-5 h-5 text-text-secondary" />,
};
const getCategoryIcon = (category: string) => categoryIcons[category] || <OtherIcon className="w-5 h-5 text-gray-400" />;

const DonutChart: React.FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <div className="text-center text-text-secondary p-8">No expense data for this month.</div>;

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
                <svg viewBox="0 0 100 100" className="-rotate-90">
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
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-text-secondary">Total Spend</span>
                    <span className="text-xl font-bold text-text-primary">{currencyFormatter.format(total)}</span>
                </div>
            </div>
            <ul className="space-y-2 text-sm w-full">
                {chartData.map(item => (
                    <li key={item.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-text-primary">{item.name}</span>
                        </div>
                        <span className="font-semibold text-text-secondary">{item.percentage.toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MonthlyTrendChart: React.FC<{ data: { month: string; income: number; expense: number }[] }> = ({ data }) => {
    const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]));
    if (maxVal === 0) return <div className="text-center text-text-secondary p-8">Not enough data for a monthly trend.</div>;

    return (
        <div className="flex items-end h-64 gap-4 border-l border-b border-border pl-4 pb-2">
            {data.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex-1 flex items-end w-full gap-1 justify-center">
                        <div className="w-1/2 bg-green-500/50 hover:bg-green-500 rounded-t-sm" style={{ height: `${(d.income / maxVal) * 100}%` }} title={`Income: ${currencyFormatter.format(d.income)}`}></div>
                        <div className="w-1/2 bg-red-500/50 hover:bg-red-500 rounded-t-sm" style={{ height: `${(d.expense / maxVal) * 100}%` }} title={`Expense: ${currencyFormatter.format(d.expense)}`}></div>
                    </div>
                    <span className="text-xs font-semibold text-text-secondary">{d.month}</span>
                </div>
            ))}
        </div>
    );
};


const AnalyticsView: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Data for current month
    const monthlyExpenses = transactions.filter(t => {
        const d = new Date(t.date);
        return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalMonthlySpend = monthlyExpenses.reduce((sum, t) => sum + t.amount, 0);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const averageDailySpend = totalMonthlySpend / (now.getDate());

    // Data for category breakdown
    const categoryDataMap = monthlyExpenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as { [key: string]: number });

    const categoryData = Object.entries(categoryDataMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const highestSpendingCategory = categoryData[0] ? categoryData[0].name : 'N/A';

    // Data for monthly trends (last 6 months)
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const monthLabels = Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1).toLocaleString('default', { month: 'short' }));
    const monthlyData = monthLabels.map(label => ({ month: label, income: 0, expense: 0 }));

    transactions.forEach(t => {
        const transactionDate = new Date(t.date);
        // FIX: Use getTime() for date comparison to avoid arithmetic errors on Date objects.
        if (transactionDate.getTime() >= sixMonthsAgo.getTime()) {
            const monthIndex = (transactionDate.getFullYear() - sixMonthsAgo.getFullYear()) * 12 + (transactionDate.getMonth() - sixMonthsAgo.getMonth());
            if (monthIndex >= 0 && monthIndex < 6) {
                if (t.type === 'income') monthlyData[monthIndex].income += t.amount;
                else monthlyData[monthIndex].expense += t.amount;
            }
        }
    });

    // Recent transactions
    // FIX: Use getTime() for sorting dates to avoid arithmetic errors on Date objects.
    const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-text-primary">Analytics Dashboard</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center"><p className="text-sm text-text-secondary">Total Spending (This Month)</p><p className="text-3xl font-bold text-text-primary">{currencyFormatter.format(totalMonthlySpend)}</p></div>
                <div className="card text-center"><p className="text-sm text-text-secondary">Highest Spending Category</p><p className="text-3xl font-bold text-text-primary">{highestSpendingCategory}</p></div>
                <div className="card text-center"><p className="text-sm text-text-secondary">Avg. Daily Spend (This Month)</p><p className="text-3xl font-bold text-text-primary">{currencyFormatter.format(averageDailySpend)}</p></div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 card">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Expense Breakdown</h3>
                    <DonutChart data={categoryData} />
                </div>
                <div className="lg:col-span-3 card">
                     <h3 className="text-xl font-bold text-text-primary mb-4">Income vs Expense (Last 6 Months)</h3>
                     <MonthlyTrendChart data={monthlyData} />
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
                 <h3 className="text-xl font-bold text-text-primary mb-4">Recent Transactions</h3>
                 <ul className="divide-y divide-border">
                    {recentTransactions.map(t => (
                        <li key={t.id} className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-secondary rounded-full">{getCategoryIcon(t.category)}</div>
                                <div>
                                    <p className="font-semibold text-text-primary">{t.description}</p>
                                    <p className="text-sm text-text-secondary">{new Date(t.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                {t.type === 'income' ? '+' : '-'} {currencyFormatter.format(t.amount)}
                            </p>
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
    );
};

export default AnalyticsView;