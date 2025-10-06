

import React, { useState, useEffect } from 'react';
import { SavedPlan } from '../types';
import { GroceryItem, VendorPrice } from '../services/geminiService';
import { CloseIcon, PlusIcon } from './icons';

interface PlanEditModalProps {
    plan: SavedPlan;
    onSave: (updatedPlan: SavedPlan) => void;
    onClose: () => void;
    isFamilyMode: boolean;
}

const PlanEditModal: React.FC<PlanEditModalProps> = ({ plan, onSave, onClose, isFamilyMode }) => {
    const [editedPlan, setEditedPlan] = useState<SavedPlan>(JSON.parse(JSON.stringify(plan))); // Deep copy
    
    useEffect(() => {
        // Recalculate estimated total whenever items change
        if (isFamilyMode) return;
        const total = editedPlan.items.reduce((sum, item) => sum + Number(item.approx_cost || 0), 0);
        setEditedPlan(p => ({ ...p, estimated_total: total }));
    }, [editedPlan.items, isFamilyMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedPlan(p => ({ ...p, [name]: name === 'total_budget' ? Number(value) : value }));
    };

    const handleItemChange = (index: number, field: keyof GroceryItem, value: string | number) => {
        const newItems = [...editedPlan.items];
        const currentItem = { ...newItems[index] };
        
        if (field === 'approx_cost') {
            currentItem[field] = Number(value);
        } else {
            // @ts-ignore
            currentItem[field] = value;
        }
        
        newItems[index] = currentItem;
        setEditedPlan(p => ({ ...p, items: newItems }));
    };

    const handleAddItem = () => {
        // FIX: Added missing 'price_comparison' property to satisfy the GroceryItem interface.
        const newItem: GroceryItem = { name: '', quantity: '', approx_cost: 0, category: 'Other', price_comparison: [] };
        setEditedPlan(p => ({ ...p, items: [...p.items, newItem] }));
    };
    
    const handleRemoveItem = (index: number) => {
        const newItems = editedPlan.items.filter((_, i) => i !== index);
        setEditedPlan(p => ({ ...p, items: newItems }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFamilyMode) return;
        onSave(editedPlan);
    };

    return (
        <div className="fixed inset-0 bg-[var(--bg-color)]/80 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
            <div className="card w-full max-w-3xl max-h-[90vh] flex flex-col !p-0">
                <header className="p-4 flex justify-between items-center border-b border-[var(--shadow-dark)] flex-shrink-0">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{isFamilyMode ? 'View Plan' : 'Edit Plan'}</h2>
                    <button onClick={onClose} className="btn-icon">
                        <CloseIcon />
                    </button>
                </header>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Plan Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Plan Title</label>
                            <input type="text" name="title" value={editedPlan.title} onChange={handleInputChange} className="form-input" readOnly={isFamilyMode} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Total Budget (₹)</label>
                            <input type="number" name="total_budget" value={editedPlan.total_budget} onChange={handleInputChange} className="form-input" readOnly={isFamilyMode} />
                        </div>
                    </div>

                    {/* Items List */}
                    <div>
                        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Items</h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {editedPlan.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-12 gap-2 items-center neumorphic-inset p-2 rounded-lg">
                                    <input type="text" placeholder="Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="form-input col-span-12 sm:col-span-4" readOnly={isFamilyMode} />
                                    <input type="text" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="form-input col-span-6 sm:col-span-2" readOnly={isFamilyMode} />
                                    <input type="number" placeholder="Cost" value={item.approx_cost} onChange={(e) => handleItemChange(index, 'approx_cost', e.target.value)} className="form-input col-span-6 sm:col-span-2" readOnly={isFamilyMode} />
                                    <input type="text" placeholder="Category" value={item.category} onChange={(e) => handleItemChange(index, 'category', e.target.value)} className="form-input col-span-10 sm:col-span-3" readOnly={isFamilyMode} />
                                    {!isFamilyMode && (
                                        <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-400 hover:text-red-300 col-span-2 sm:col-span-1 flex justify-center items-center h-full hover:bg-red-500/10 rounded-md">
                                            <CloseIcon />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {!isFamilyMode && (
                            <button type="button" onClick={handleAddItem} className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 p-2 rounded-md">
                                <PlusIcon /> Add Item
                            </button>
                        )}
                    </div>
                </form>
                <footer className="p-4 flex justify-end gap-4 border-t border-[var(--shadow-dark)] flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg font-semibold hover:neumorphic-inset">{isFamilyMode ? 'Close' : 'Cancel'}</button>
                    {!isFamilyMode && (
                        <button type="submit" onClick={handleSubmit} className="btn-primary">Save Changes</button>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default PlanEditModal;