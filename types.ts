import { GroceryList } from './services/geminiService';

export interface SavedPlan extends GroceryList {
    id: string;
    title: string;
    date: string;
}

export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: string;
    category: string;
}