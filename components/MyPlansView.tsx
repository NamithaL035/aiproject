

import React, { useState } from 'react';
import { PlanIcon, PlusIcon } from './icons';
import { SavedPlan } from '../types';
import PlanEditModal from './PlanEditModal';

interface MyPlansViewProps {
    plans: SavedPlan[];
    onUpdatePlan: (plan: SavedPlan) => void;
    onDeletePlan: (planId: string) => void;
    setActiveView: (view: string) => void;
    isFamilyMode: boolean;
}

const PlanCard: React.FC<{ plan: SavedPlan; onEdit: () => void; onDelete: () => void; isFamilyMode: boolean; }> = ({ plan, onEdit, onDelete, isFamilyMode }) => {
    const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
    return (
        <div className="card flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{plan.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                        <p className="text-text-secondary">Budget</p>
                        <p className="font-semibold text-text-primary">{currencyFormatter.format(plan.total_budget)}</p>
                    </div>
                    <div>
                        <p className="text-text-secondary">Estimated Cost</p>
                        <p className="font-semibold text-text-primary">{currencyFormatter.format(plan.estimated_total)}</p>
                    </div>
                </div>
                <p className="text-xs text-text-secondary">Created on: {plan.date}</p>
            </div>
            <div className="flex items-center gap-2 mt-6 border-t border-white/10 pt-4">
                {isFamilyMode ? (
                     <button onClick={onEdit} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors w-full text-center py-2 rounded-md hover:bg-blue-500/10">View Details</button>
                ) : (
                    <>
                        <button onClick={onEdit} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors w-full text-center py-2 rounded-md hover:bg-blue-500/10">View / Edit</button>
                        <button onClick={onDelete} className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors w-full text-center py-2 rounded-md hover:bg-red-500/10">Delete</button>
                    </>
                )}
            </div>
        </div>
    )
};


const MyPlansView: React.FC<MyPlansViewProps> = ({ plans, onUpdatePlan, onDeletePlan, setActiveView, isFamilyMode }) => {
    const [editingPlan, setEditingPlan] = useState<SavedPlan | null>(null);

    const handleDelete = (planId: string) => {
        if (window.confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
            onDeletePlan(planId);
        }
    };

    const handleSaveUpdate = (updatedPlan: SavedPlan) => {
        onUpdatePlan(updatedPlan);
        setEditingPlan(null); // Close modal
    };

    // FIX: Use getTime() for sorting dates to avoid arithmetic errors on Date objects.
    const sortedPlans = [...plans].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-4xl font-extrabold text-text-primary">My Saved Plans</h1>
                {!isFamilyMode && (
                    <button className="btn-primary" onClick={() => setActiveView('Planner')}>
                        <PlusIcon />
                        <span>Create New Plan</span>
                    </button>
                )}
            </div>

            <p className="text-lg text-text-secondary">Here you can view, edit, and manage all the grocery plans you've generated and saved.</p>
            
            {sortedPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPlans.map(plan => (
                        <PlanCard 
                            key={plan.id}
                            plan={plan}
                            onEdit={() => setEditingPlan(plan)}
                            onDelete={() => handleDelete(plan.id)}
                            isFamilyMode={isFamilyMode}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 card bg-white/5">
                    <div className="flex items-center justify-center w-20 h-20 bg-black/10 rounded-full mb-6 mx-auto">
                         <PlanIcon />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">No Plans Saved Yet</h2>
                    <p className="text-text-secondary mt-2 mb-6">
                        Start by creating a new plan in the 'Planner' section.
                    </p>
                    <button className="btn-primary" onClick={() => setActiveView('Planner')}>Go to Planner</button>
                </div>
            )}
            
            {editingPlan && (
                <PlanEditModal 
                    plan={editingPlan}
                    onSave={handleSaveUpdate}
                    onClose={() => setEditingPlan(null)}
                    isFamilyMode={isFamilyMode}
                />
            )}
        </div>
    );
};

export default MyPlansView;