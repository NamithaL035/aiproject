
import React, { useState } from 'react';
import { estimateBudget, BudgetInput } from '../services/budgetService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const BudgetEstimator: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    
    const handleEstimate = async () => {
        setLoading(true);
        setResult(null);
        const dummyInput: BudgetInput = {
            incomes: [{ amount: 50000, source: 'salary' }],
            fixed_expenses: [{ amount: 15000, name: 'rent' }],
            family_size: 4,
            dietary_pref: 'Vegetarian',
            recent_grocery: [],
            location: 'Bangalore'
        };
        const res = await estimateBudget(dummyInput);
        setResult(res);
        setLoading(false);
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">Budget Estimation Model</h3>
            <p className="mb-6 text-text-secondary text-sm">Execute the predictive model to generate a monthly grocery budget estimate based on historical and regional data.</p>
            <button onClick={handleEstimate} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                 {loading && <SpinnerIcon />}
                {loading ? 'Executing...' : 'Run Estimation'}
            </button>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default BudgetEstimator;
