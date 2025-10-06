
import React, { useState } from 'react';
import { ChevronDownIcon, IncomeIcon } from './icons';
import { Transaction } from '../types';

const incomeSources = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

interface ManualIncomeEntryProps {
    onAddIncome: (income: Omit<Transaction, 'id' | 'type'>) => void;
}

const ManualIncomeEntry: React.FC<ManualIncomeEntryProps> = ({ onAddIncome }) => {
    const [description, setDescription] = useState('Salary');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date) {
            setFeedback('Please fill out all fields.');
            return;
        }
        setIsSubmitting(true);
        setFeedback('');

        const income = {
            description,
            amount: parseFloat(amount),
            date,
            category: 'Income',
        };

        // Simulate API call before calling parent
        setTimeout(() => {
            onAddIncome(income);
            
            // Reset form
            setDescription('Salary');
            setAmount('');
            setDate(new Date().toISOString().slice(0, 10));
            
            setFeedback('Income logged successfully!');
            setIsSubmitting(false);

            setTimeout(() => setFeedback(''), 3000); // Clear feedback after 3 seconds
        }, 500);
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-text-primary">Log a New Income</h3>
            <p className="text-text-secondary mb-6">Manually add an income source to your records.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="income-source">Source</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <IncomeIcon className="w-5 h-5 text-text-secondary" />
                            </div>
                            <select
                                id="income-source"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="form-input appearance-none !pl-10"
                                required
                            >
                                {incomeSources.map(src => <option key={src} value={src}>{src}</option>)}
                            </select>
                             <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-secondary">
                                <ChevronDownIcon />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="income-amount">Amount (₹)</label>
                        <input
                            id="income-amount"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="form-input"
                            placeholder="e.g., 50000"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="income-date">Date</label>
                        <input
                            id="income-date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:transform-none">
                        {isSubmitting ? 'Saving...' : 'Save Income'}
                    </button>
                    {feedback && <p className="text-sm text-green-600">{feedback}</p>}
                </div>
            </form>
        </div>
    );
};

export default ManualIncomeEntry;
