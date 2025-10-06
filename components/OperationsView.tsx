
import React from 'react';
import PlanGenerator from './PlanGenerator';
import GroceryOptimizer from './GroceryOptimizer';
import RecipeGenerator from './RecipeGenerator';
import { SavedPlan } from '../types';

interface OperationsViewProps {
    onSavePlan: (plan: Omit<SavedPlan, 'id' | 'date'>) => void;
    userProfile: { familySize: string; diet: string };
}

const OperationsView: React.FC<OperationsViewProps> = ({ onSavePlan, userProfile }) => {
    return (
        <div className="space-y-12">
            <div>
                 <PlanGenerator onSavePlan={onSavePlan} userProfile={userProfile} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <GroceryOptimizer />
                </div>
                <div className="card">
                    <RecipeGenerator />
                </div>
            </div>
        </div>
    );
};

export default OperationsView;
