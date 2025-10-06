
import React, { useState } from 'react';
import { optimizeGroceryList, OptimizerInput } from '../services/optimizerService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const GroceryOptimizer: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const handleOptimize = async () => {
        setLoading(true);
        setResult(null);
        const dummyInput: OptimizerInput = {
            budget: 8000,
            family_size: 4,
            dietary_pref: 'Vegetarian',
            meal_plan: [],
            pantry_inventory: [],
            region: 'Bangalore',
            nutrient_constraints: { min_calories_per_person_per_day: 2000 }
        };
        const res = await optimizeGroceryList(dummyInput);
        setResult(res);
        setLoading(false);
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-2 text-text-primary">List Optimization Engine</h3>
            <p className="mb-6 text-text-secondary text-sm">Optimize a shopping list against cost and nutritional constraints using a constraint solver.</p>
            <button onClick={handleOptimize} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                 {loading && <SpinnerIcon />}
                {loading ? 'Optimizing...' : 'Execute Optimization'}
            </button>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default GroceryOptimizer;
