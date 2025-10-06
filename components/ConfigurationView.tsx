
import React, { useState } from 'react';
import PersonalizationEngine from './PersonalizationEngine';
import ManualIncomeEntry from './ManualIncomeEntry';
import ManualExpenseEntry from './ManualExpenseEntry';
import { Transaction } from '../types';

interface UserProfile {
    familySize: string;
    diet: string;
}

interface ConfigurationViewProps {
    userProfile: UserProfile;
    setUserProfile: (profile: UserProfile) => void;
    setActiveView: (view: string) => void;
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const ConfigurationView: React.FC<ConfigurationViewProps> = ({ userProfile, setUserProfile, setActiveView, onAddTransaction }) => {
    const [profile, setProfile] = useState<UserProfile>(userProfile);
    const [feedback, setFeedback] = useState('');

    const dietOptions = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Mixed (Veg + Non-Veg)'];

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setUserProfile(profile);
        setFeedback('Profile updated successfully!');
        setTimeout(() => setFeedback(''), 3000);
    };

    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-extrabold text-text-primary text-center">Configuration & Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Settings */}
                <div className="card">
                    <h3 className="text-2xl font-bold mb-2 text-text-primary">Household Profile</h3>
                    <p className="text-text-secondary mb-6">This information helps our AI generate accurate grocery plans for you.</p>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-text-secondary mb-2">Family Size</label>
                            <input 
                                type="number" 
                                value={profile.familySize} 
                                onChange={e => setProfile(p => ({ ...p, familySize: e.target.value }))} 
                                className="form-input" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text-secondary mb-2">Primary Dietary Preference</label>
                            <select 
                                value={profile.diet} 
                                onChange={e => setProfile(p => ({ ...p, diet: e.target.value }))} 
                                className="form-input"
                            >
                                {dietOptions.map(opt => <option key={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="btn-primary">
                                Save Profile
                            </button>
                            {feedback && <p className="text-sm text-green-500">{feedback}</p>}
                        </div>
                    </form>
                </div>

                {/* Data Management */}
                <div className="card">
                    <h3 className="text-2xl font-bold mb-2 text-text-primary">Data Management</h3>
                    <p className="text-text-secondary mb-6">View your full transaction history and generate reports.</p>
                    <button onClick={() => setActiveView('Reports')} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        Go to Reports &rarr;
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ManualIncomeEntry onAddIncome={(income) => onAddTransaction({ ...income, type: 'income' })} />
                <ManualExpenseEntry onAddExpense={(expense) => onAddTransaction({ ...expense, type: 'expense' })} />
            </div>

            <PersonalizationEngine />
        </div>
    );
};

export default ConfigurationView;
