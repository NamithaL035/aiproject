
import React, { useState } from 'react';
import { getRecommendations, PersonalizationInput } from '../services/personalizationService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const PersonalizationEngine: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const handlePersonalize = async () => {
        setLoading(true);
        setResult(null);
        const dummyInput: PersonalizationInput = {
            user_id: 'user123',
            past_6_months: [],
            brands_preference: [],
            pantry: [],
            budget: 8000
        };
        const res = await getRecommendations(dummyInput);
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-text-primary">Personalized Savings Engine</h3>
            <p className="mb-6 text-text-secondary">Generate personalized cost-saving recommendations based on your unique profile and spending history.</p>
            <button onClick={handlePersonalize} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                {loading && <SpinnerIcon />}
                {loading ? 'Analyzing...' : 'Generate My Recommendations'}
            </button>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default PersonalizationEngine;
