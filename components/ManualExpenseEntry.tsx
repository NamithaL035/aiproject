
import React, { useState } from 'react';
import { 
    GroceriesIcon, UtilitiesIcon, RentIcon, EntertainmentIcon, 
    TransportIcon, HealthcareIcon, ShoppingIcon, OtherIcon, ChevronDownIcon 
} from './icons';
import { Transaction } from '../types';

const categories = ['Groceries', 'Utilities', 'Rent', 'Entertainment', 'Transport', 'Healthcare', 'Shopping', 'Other'];

const categoryIcons: { [key: string]: React.ReactNode } = {
    Groceries: <GroceriesIcon className="w-5 h-5 text-text-secondary" />,
    Utilities: <UtilitiesIcon className="w-5 h-5 text-text-secondary" />,
    Rent: <RentIcon className="w-5 h-5 text-text-secondary" />,
    Entertainment: <EntertainmentIcon className="w-5 h-5 text-text-secondary" />,
    Transport: <TransportIcon className="w-5 h-5 text-text-secondary" />,
    Healthcare: <HealthcareIcon className="w-5 h-5 text-text-secondary" />,
    Shopping: <ShoppingIcon className="w-5 h-5 text-text-secondary" />,
    Other: <OtherIcon className="w-5 h-5 text-text-secondary" />,
};

interface ManualExpenseEntryProps {
    onAddExpense: (expense: Omit<Transaction, 'id' | 'type'>) => void;
}

const ManualExpenseEntry: React.FC<ManualExpenseEntryProps> = ({ onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [category, setCategory] = useState('Groceries');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date || !category) {
            setFeedback('Please fill out all fields.');
            return;
        }
        setIsSubmitting(true);
        setFeedback('');

        const expense = {
            description,
            amount: parseFloat(amount),
            date,
            category
        };

        // Simulate API call
        setTimeout(() => {
            onAddExpense(expense);
            
            // Reset form
            setDescription('');
            setAmount('');
            setDate(new Date().toISOString().slice(0, 10));
            setCategory('Groceries');
            
            setFeedback('Expense logged successfully!');
            setIsSubmitting(false);

            setTimeout(() => setFeedback(''), 3000); // Clear feedback after 3 seconds
        }, 500);
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-text-primary">Log a New Expense</h3>
            <p className="text-text-secondary mb-6">Manually add a transaction to your records.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="description">Description</label>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="form-input"
                            placeholder="e.g., Monthly Groceries"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="amount">Amount (₹)</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="form-input"
                            placeholder="e.g., 2500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="category">Category</label>
                         <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                {categoryIcons[category]}
                            </div>
                            <select
                                id="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="form-input appearance-none !pl-10"
                                required
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-text-secondary">
                                <ChevronDownIcon />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:transform-none">
                        {isSubmitting ? 'Saving...' : 'Save Expense'}
                    </button>
                    {feedback && <p className="text-sm text-green-600">{feedback}</p>}
                </div>
            </form>
        </div>
    );
};

export default ManualExpenseEntry;
