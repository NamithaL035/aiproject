
import React, { useState } from 'react';
import { generateRecipes, RecipeResponse } from '../services/recipeService';
import ResultDisplay from './ResultDisplay';
import { SpinnerIcon } from './icons';

const RecipeGenerator: React.FC = () => {
    const [ingredients, setIngredients] = useState('paneer, tomato, onion');
    const [diet, setDiet] = useState('Veg');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<RecipeResponse | null>(null);

    const handleGenerate = async () => {
        setLoading(true);
        setResult(null);
        const ingredientsArray = ingredients.split(',').map(i => i.trim());
        const res = await generateRecipes(ingredientsArray, diet);
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="card">
            <h3 className="text-2xl font-bold mb-2 text-text-primary">AI Recipe Generator</h3>
            <p className="text-text-secondary mb-6">Never wonder what to cook again. Enter the ingredients you have, and let our AI create delicious recipes for you.</p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-2">Ingredients (comma-separated)</label>
                    <input type="text" value={ingredients} onChange={e => setIngredients(e.target.value)} className="form-input"/>
                </div>
                 <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-2">Diet</label>
                    <select value={diet} onChange={e => setDiet(e.target.value)} className="form-input appearance-none">
                        <option>Veg</option>
                        <option>Non-Veg</option>
                        <option>Vegan</option>
                    </select>
                </div>
                <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:transform-none">
                     {loading && <SpinnerIcon />}
                    {loading ? 'Generating...' : 'Generate Recipes'}
                </button>
            </div>
            {result && <div className="mt-6"><ResultDisplay data={result} /></div>}
        </div>
    );
};

export default RecipeGenerator;
