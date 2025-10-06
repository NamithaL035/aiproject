import React, { useState } from 'react';
import { getGroceryAdvice, GroceryList } from '../services/geminiService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';
import { SavedPlan } from '../types';

interface PlanGeneratorProps {
    onSavePlan: (plan: Omit<SavedPlan, 'id' | 'date'>) => void;
    userProfile: { familySize: string; diet: string };
}

const PlanGenerator: React.FC<PlanGeneratorProps> = ({ onSavePlan, userProfile }) => {
    const [budget, setBudget] = useState('3000');
    const [familySize, setFamilySize] = useState(userProfile.familySize || '3');
    const [diet, setDiet] = useState(userProfile.diet || 'Vegetarian');
    const [nutrition, setNutrition] = useState('Balanced weekly diet');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<GroceryList | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [planTitle, setPlanTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);
        setPlanTitle('');

        const query = `Budget: ₹${budget}\nFamily Size: ${familySize}\nDiet: ${diet}\nNutritional Focus: ${nutrition}`;
        try {
            const advice = await getGroceryAdvice(query);
            setResult(advice);
            setPlanTitle(`Plan for ₹${advice.total_budget} (${diet})`);
        } catch (err)
        {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!result) return;
        if (!planTitle.trim()) {
            alert("Please enter a title for your plan.");
            return;
        }
        onSavePlan({ title: planTitle, ...result });
        // Reset form after saving
        setResult(null);
        setPlanTitle('');
    };
    
    return (
        <div className="card w-full">
             <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-2">AI Grocery Planner</h2>
            <p className="text-text-secondary mb-8">Tell us your needs, and our AI will generate a tailored weekly grocery plan in seconds.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-text-secondary mb-2">Budget (₹)</label>
                        <input type="number" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="form-input" required />
                    </div>
                    <div>
                        <label htmlFor="familySize" className="block text-sm font-semibold text-text-secondary mb-2">Family Size</label>
                        <input type="number" id="familySize" value={familySize} onChange={(e) => setFamilySize(e.target.value)} className="form-input" required />
                    </div>
                    <div>
                        <label htmlFor="diet" className="block text-sm font-semibold text-text-secondary mb-2">Dietary Preference</label>
                        <select id="diet" value={diet} onChange={(e) => setDiet(e.target.value)} className="form-input">
                            <option>Vegetarian</option>
                            <option>Non-Vegetarian</option>
                            <option>Vegan</option>
                            <option>Mixed (Veg + Non-Veg)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nutrition" className="block text-sm font-semibold text-text-secondary mb-2">Nutritional Focus</label>
                        <input type="text" id="nutrition" value={nutrition} onChange={(e) => setNutrition(e.target.value)} className="form-input" required />
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:transform-none">
                        {loading && <SpinnerIcon />}
                        {loading ? 'Generating Plan...' : 'Generate My Plan'}
                    </button>
                </div>
            </form>

            {error && <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">{error}</div>}
            
            {(loading || result) && (
                <div className="mt-10">
                    <h3 className="text-3xl font-bold mb-6 text-text-primary">
                        {loading ? 'Generating Your Plan...' : 'Your AI-Generated Grocery Plan'}
                    </h3>
                    <ResultDisplay data={result} isLoading={loading} />
                    
                    {result && (
                        <div className="mt-8 pt-6 border-t border-[var(--shadow-dark)]">
                            <h4 className="text-xl font-bold text-text-primary mb-4">Save This Plan</h4>
                            <div className="flex flex-col sm:flex-row gap-4 items-end">
                                <div className="flex-grow w-full">
                                    <label htmlFor="planTitle" className="block text-sm font-semibold text-text-secondary mb-2">Plan Title</label>
                                    <input 
                                        type="text" 
                                        id="planTitle" 
                                        value={planTitle}
                                        onChange={(e) => setPlanTitle(e.target.value)}
                                        className="form-input" 
                                        placeholder="e.g., Weekly Family Groceries"
                                        required 
                                    />
                                </div>
                                <button onClick={handleSave} className="btn-primary w-full sm:w-auto flex-shrink-0">
                                    Save Plan
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlanGenerator;