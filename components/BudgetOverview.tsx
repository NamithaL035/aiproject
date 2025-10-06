
import React from 'react';
import { Transaction } from '../types';

interface BudgetOverviewProps {
    transactions: Transaction[];
}

const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ transactions }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const remainingBudget = totalIncome - totalExpenses;
    const spentPercentage = totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;
    
    const progressBarColor = spentPercentage > 85 ? 'bg-red-500' : spentPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <section className="card">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">This Month's Budget Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="neumorphic-convex p-4 rounded-lg">
                    <p className="text-sm text-green-500 font-semibold">Total Income</p>
                    <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(totalIncome)}</p>
                </div>
                <div className="neumorphic-convex p-4 rounded-lg">
                    <p className="text-sm text-red-500 font-semibold">Total Expenses</p>
                    <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(totalExpenses)}</p>
                </div>
                <div className="neumorphic-convex p-4 rounded-lg">
                    <p className="text-sm text-blue-500 font-semibold">Remaining Budget</p>
                    <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(remainingBudget)}</p>
                </div>
            </div>
            <div className="mt-6">
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-semibold text-[var(--color-text-secondary)]">Spent</span>
                    <span className="font-bold text-[var(--color-text-primary)]">{spentPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full neumorphic-inset rounded-full h-4 p-0.5">
                    <div className={`${progressBarColor} h-full rounded-full transition-all duration-500 neumorphic-convex`} style={{ width: `${spentPercentage}%` }}></div>
                </div>
            </div>
        </section>
    );
};

export default BudgetOverview;