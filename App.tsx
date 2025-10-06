
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import PlannerView from './components/PlannerView';
import ReportsView from './components/ReportsView';
import AiAssistant from './components/AiAssistant';
import MyPlansView from './components/MyPlansView';
import OnboardingWizard from './components/OnboardingWizard';
import ConfigurationView from './components/ConfigurationView';
import { SavedPlan, Transaction } from './types';

const App: React.FC = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    const [hasOnboarded, setHasOnboarded] = useState(() => localStorage.getItem('hasOnboarded') === 'true');
    const [isFamilyMode, setIsFamilyMode] = useState(() => localStorage.getItem('isFamilyMode') === 'true');
    
    const [userProfile, setUserProfile] = useState(() => {
        const storedProfile = localStorage.getItem('userProfile');
        return storedProfile ? JSON.parse(storedProfile) : { familySize: '2', diet: 'Vegetarian' };
    });

    const [activeView, setActiveView] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() => {
        try {
            const storedPlans = localStorage.getItem('savedPlans');
            return storedPlans ? JSON.parse(storedPlans) : [];
        } catch (error) {
            console.error("Could not parse saved plans from localStorage", error);
            return [];
        }
    });

     const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const storedTransactions = localStorage.getItem('transactions');
            return storedTransactions ? JSON.parse(storedTransactions) : [];
        } catch (error) {
            console.error("Could not parse transactions from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        if(hasOnboarded) localStorage.setItem('savedPlans', JSON.stringify(savedPlans));
    }, [savedPlans, hasOnboarded]);

    useEffect(() => {
       if(hasOnboarded) localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions, hasOnboarded]);
    
    useEffect(() => {
        if(hasOnboarded) localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [userProfile, hasOnboarded]);

    useEffect(() => {
        localStorage.setItem('isFamilyMode', String(isFamilyMode));
        // If family mode is turned on, force view to a safe page
        if (isFamilyMode && !['Dashboard', 'My Plans'].includes(activeView)) {
            setActiveView('Dashboard');
        }
    }, [isFamilyMode]);


    const handleOnboardingComplete = (data: { incomes: any[], expenses: any[], profile: any }) => {
        const { incomes, expenses, profile } = data;
        
        const currentMonthDate = new Date();
        currentMonthDate.setDate(1); // Set to first day of current month for consistency
        
        const incomeTransactions: Transaction[] = incomes.map((inc, i) => ({
            id: new Date().toISOString() + `_inc_${i}`,
            type: 'income',
            description: inc.description,
            amount: inc.amount,
            date: currentMonthDate.toISOString().slice(0, 10),
            category: 'Income'
        }));

        const expenseTransactions: Transaction[] = expenses.map((exp, i) => ({
            id: new Date().toISOString() + `_exp_${i}`,
            type: 'expense',
            description: exp.description,
            amount: exp.amount,
            date: currentMonthDate.toISOString().slice(0, 10),
            category: exp.category
        }));

        setTransactions([...incomeTransactions, ...expenseTransactions]);
        setUserProfile(profile);

        localStorage.setItem('hasOnboarded', 'true');
        setHasOnboarded(true);
    };


    const addPlan = (plan: Omit<SavedPlan, 'id' | 'date'>) => {
        const newPlan: SavedPlan = {
            ...plan,
            id: new Date().toISOString(),
            date: new Date().toISOString().slice(0, 10),
        };
        setSavedPlans(prev => [...prev, newPlan]);
        setActiveView('My Plans'); // Navigate to My Plans after saving
    };

    const updatePlan = (updatedPlan: SavedPlan) => {
        setSavedPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    };

    const deletePlan = (planId: string) => {
        setSavedPlans(prev => prev.filter(p => p.id !== planId));
    };

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: new Date().toISOString(),
        };
        setTransactions(prev => [...prev, newTransaction]);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);


    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const toggleFamilyMode = () => {
        setIsFamilyMode(prev => !prev);
    };

    const handleLogout = () => {
        // Clear all app-related data from localStorage
        localStorage.removeItem('hasOnboarded');
        localStorage.removeItem('transactions');
        localStorage.removeItem('savedPlans');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isFamilyMode');

        // Reset state to force re-onboarding
        setHasOnboarded(false);
        setTransactions([]);
        setSavedPlans([]);
        setUserProfile({ familySize: '2', diet: 'Vegetarian' });
        setIsFamilyMode(false);
        setActiveView('Dashboard');
    };

    const handleSetActiveView = (view: string) => {
        setActiveView(view);
    };

    const renderView = () => {
        // In Family Mode, only allow access to Dashboard and My Plans
        if (isFamilyMode && !['Dashboard', 'My Plans'].includes(activeView)) {
            return <DashboardView setActiveView={handleSetActiveView} transactions={transactions} plans={savedPlans} isFamilyMode={isFamilyMode} />;
        }

        switch (activeView) {
            case 'Dashboard':
                return <DashboardView setActiveView={handleSetActiveView} transactions={transactions} plans={savedPlans} isFamilyMode={isFamilyMode} />;
            case 'Planner':
                return <PlannerView onSavePlan={addPlan} userProfile={userProfile} />;
            case 'My Plans':
                return <MyPlansView 
                    plans={savedPlans}
                    onUpdatePlan={updatePlan}
                    onDeletePlan={deletePlan}
                    setActiveView={handleSetActiveView}
                    isFamilyMode={isFamilyMode}
                />;
            case 'Reports':
                return <ReportsView />;
            case 'AI Assistant':
                return <AiAssistant isFamilyMode={isFamilyMode} />;
            case 'Configuration':
                return <ConfigurationView userProfile={userProfile} setUserProfile={setUserProfile} setActiveView={handleSetActiveView} onAddTransaction={addTransaction} />;
            default:
                return <DashboardView setActiveView={handleSetActiveView} transactions={transactions} plans={savedPlans} isFamilyMode={isFamilyMode} />;
        }
    };

    if (!hasOnboarded) {
        return <OnboardingWizard onComplete={handleOnboardingComplete} />;
    }

    return (
        <div className={`flex h-screen bg-[var(--bg-color)] text-[var(--color-text-primary)] ${theme}`}>
            <Sidebar
                activeView={activeView}
                setActiveView={handleSetActiveView}
                isSidebarOpen={sidebarOpen}
                setIsSidebarOpen={setSidebarOpen}
                isFamilyMode={isFamilyMode}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    toggleTheme={toggleTheme}
                    currentTheme={theme}
                    activeView={activeView}
                    onLogout={handleLogout}
                    isFamilyMode={isFamilyMode}
                    toggleFamilyMode={toggleFamilyMode}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
