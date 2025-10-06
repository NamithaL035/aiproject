
import React, { useState } from 'react';
import { CloseIcon, PlusIcon, IncomeIcon, RentIcon, GroceriesIcon, UserIcon, AssistantIcon, UtilitiesIcon, EntertainmentIcon, TransportIcon } from './icons';

interface IncomeSource { id: number; description: string; amount: string; }
interface FixedExpense { id: number; description: string; amount: string; category: string; }
interface UserProfile { familySize: string; diet: string; }
interface OnboardingWizardProps {
  onComplete: (data: { incomes: Omit<IncomeSource, 'id'>[]; expenses: Omit<FixedExpense, 'id'>[]; profile: UserProfile }) => void;
}

const expenseCategories = ['Rent', 'Utilities', 'Transport', 'Groceries', 'Entertainment'];
const dietOptions = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Mixed (Veg + Non-Veg)'];

const ProgressBar: React.FC<{ current: number, total: number }> = ({ current, total }) => {
    const percentage = ((current - 1) / (total -1)) * 100;
    return (
        <div className="w-full neumorphic-inset rounded-full h-2.5 mb-8">
            <div className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-300 neumorphic-convex" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [incomes, setIncomes] = useState<IncomeSource[]>([{ id: 1, description: 'Salary', amount: '50000' }]);
    const [expenses, setExpenses] = useState<FixedExpense[]>([{ id: 1, description: 'Monthly Rent', amount: '15000', category: 'Rent' }]);
    const [profile, setProfile] = useState<UserProfile>({ familySize: '2', diet: 'Vegetarian' });

    const handleIncomeChange = (id: number, field: 'description' | 'amount', value: string) => {
        setIncomes(incomes.map(inc => inc.id === id ? { ...inc, [field]: value } : inc));
    };
    const addIncome = () => setIncomes([...incomes, { id: Date.now(), description: '', amount: '' }]);
    const removeIncome = (id: number) => setIncomes(incomes.filter(inc => inc.id !== id));

    const handleExpenseChange = (id: number, field: 'description' | 'amount' | 'category', value: string) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };
    const addExpense = () => setExpenses([...expenses, { id: Date.now(), description: '', amount: '', category: 'Groceries' }]);
    const removeExpense = (id: number) => setExpenses(expenses.filter(exp => exp.id !== id));

    const handleProfileChange = (field: 'familySize' | 'diet', value: string) => {
        setProfile({ ...profile, [field]: value });
    }

    const handleFinish = () => {
        const finalIncomes = incomes
            .filter(i => i.description && i.amount)
            .map(({ id, ...rest }) => ({ ...rest, amount: parseFloat(rest.amount) }));
        const finalExpenses = expenses
            .filter(e => e.description && e.amount)
            .map(({ id, ...rest }) => ({ ...rest, amount: parseFloat(rest.amount) }));
        onComplete({ incomes: finalIncomes, expenses: finalExpenses, profile });
    };

    const totalSteps = 5;

    return (
        <div className="fixed inset-0 bg-[var(--bg-color)] z-50 flex items-center justify-center p-4 transition-opacity duration-300">
            <div className="card w-full max-w-2xl max-h-[90vh] flex flex-col !p-0">
                <div className="p-8 pb-0">
                    <ProgressBar current={step} total={totalSteps} />
                </div>
                
                {step === 1 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center neumorphic-convex text-[var(--color-primary)] mb-6">
                           <AssistantIcon className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)]">Welcome to SavvySpend!</h1>
                        <p className="text-[var(--color-text-secondary)] mt-4 max-w-md">Let's get your household set up. A few quick questions will help us personalize your experience and unlock AI-powered insights.</p>
                        <button onClick={() => setStep(2)} className="btn-primary mt-8">Let's Get Started</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex-1 overflow-y-auto p-8">
                        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Your Monthly Income</h2>
                        <p className="text-[var(--color-text-secondary)] mb-6">List your primary sources of income for this month. This helps us create your starting budget.</p>
                        <div className="space-y-4">
                            {incomes.map((income, index) => (
                                <div key={income.id} className="grid grid-cols-12 gap-2 items-center">
                                    <input type="text" placeholder="Source (e.g., Salary)" value={income.description} onChange={(e) => handleIncomeChange(income.id, 'description', e.target.value)} className="form-input col-span-6" />
                                    <input type="number" placeholder="Amount (₹)" value={income.amount} onChange={(e) => handleIncomeChange(income.id, 'amount', e.target.value)} className="form-input col-span-5" />
                                    <button onClick={() => removeIncome(income.id)} disabled={incomes.length === 1} className="col-span-1 h-full flex items-center justify-center text-red-400 disabled:text-gray-500 hover:bg-red-500/10 rounded-md">
                                        <CloseIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addIncome} className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 p-2 rounded-md"><PlusIcon /> Add Income Source</button>
                    </div>
                )}
                
                {step === 3 && (
                     <div className="flex-1 overflow-y-auto p-8">
                        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Fixed Monthly Expenses</h2>
                        <p className="text-[var(--color-text-secondary)] mb-6">Add your recurring expenses like rent or utilities. This gives us a clearer picture of your budget.</p>
                        <div className="space-y-4">
                            {expenses.map((expense) => (
                                <div key={expense.id} className="grid grid-cols-12 gap-2 items-center">
                                    <input type="text" placeholder="Description" value={expense.description} onChange={e => handleExpenseChange(expense.id, 'description', e.target.value)} className="form-input col-span-12 sm:col-span-4" />
                                    <select value={expense.category} onChange={e => handleExpenseChange(expense.id, 'category', e.target.value)} className="form-input col-span-6 sm:col-span-3">
                                        {expenseCategories.map(cat => <option key={cat}>{cat}</option>)}
                                    </select>
                                    <input type="number" placeholder="Amount (₹)" value={expense.amount} onChange={e => handleExpenseChange(expense.id, 'amount', e.target.value)} className="form-input col-span-6 sm:col-span-4" />
                                    <button onClick={() => removeExpense(expense.id)} disabled={expenses.length === 1} className="col-span-12 sm:col-span-1 h-full flex items-center justify-center text-red-400 disabled:text-gray-500 hover:bg-red-500/10 rounded-md"><CloseIcon /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addExpense} className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 p-2 rounded-md"><PlusIcon /> Add Expense</button>
                    </div>
                )}

                {step === 4 && (
                    <div className="flex-1 p-8">
                        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Household Profile</h2>
                        <p className="text-[var(--color-text-secondary)] mb-8">This information helps our AI generate accurate grocery plans for you.</p>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Family Size</label>
                                <input type="number" value={profile.familySize} onChange={e => handleProfileChange('familySize', e.target.value)} className="form-input" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Primary Dietary Preference</label>
                                <select value={profile.diet} onChange={e => handleProfileChange('diet', e.target.value)} className="form-input">
                                    {dietOptions.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                
                {step === 5 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                         <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)]">All Set!</h1>
                        <p className="text-[var(--color-text-secondary)] mt-4 max-w-md">You're ready to start managing your household finances with the power of AI.</p>
                        <button onClick={handleFinish} className="btn-primary mt-8">Go to Dashboard</button>
                    </div>
                )}


                {/* Footer Navigation */}
                {step > 1 && step < totalSteps && (
                    <footer className="p-4 flex justify-between items-center border-t border-[var(--shadow-dark)]">
                        <button onClick={() => setStep(step - 1)} className="px-6 py-2 rounded-lg font-semibold hover:neumorphic-inset">Back</button>
                        <button onClick={() => setStep(step + 1)} className="btn-primary">Next</button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default OnboardingWizard;