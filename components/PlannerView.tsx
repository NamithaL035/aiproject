
import React from 'react';
import PlanGenerator from './PlanGenerator';
import GroceryOptimizer from './GroceryOptimizer';
import RecipeGenerator from './RecipeGenerator';
import BudgetEstimator from './BudgetEstimator';
import PriceQuoter from './PriceQuoter';
import { SavedPlan } from '../types';

interface PlannerViewProps {
    onSavePlan: (plan: Omit<SavedPlan, 'id' | 'date'>) => void;
    userProfile: { familySize: string; diet: string };
}

const PlannerView: React.FC<PlannerViewProps> = ({ onSavePlan, userProfile }) => {
    return (
        <div className="space-y-12">
             <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight mb-2">
                  AI Planning Suite
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-text-secondary">
                  Utilize our collection of AI-powered tools to optimize your household planning and budgeting.
                </p>
            </div>
            
            <div>
                 <PlanGenerator onSavePlan={onSavePlan} userProfile={userProfile} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <RecipeGenerator />
                </div>
                <div className="card">
                    <GroceryOptimizer />
                </div>
                 <div className="card">
                    <BudgetEstimator />
                </div>
                 <div className="card">
                    <PriceQuoter />
                </div>
            </div>
        </div>
    );
};

export default PlannerView;
