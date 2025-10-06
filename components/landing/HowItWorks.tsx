import React from 'react';
import { PlusIcon, AnalyticsIcon, PlanIcon } from '../icons';

const Step: React.FC<{ icon: React.ReactNode, title: string, description: string, stepNumber: number }> = ({ icon, title, description, stepNumber }) => (
    <div className="relative">
         <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-500 text-white rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{stepNumber}. {title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);


const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: <PlusIcon />,
            title: "Log Your Expenses",
            description: "Easily add expenses manually, by scanning receipts with our OCR, or using simple voice commands."
        },
        {
            icon: <AnalyticsIcon />,
            title: "Get AI Insights",
            description: "Our AI analyzes your spending patterns, providing smart budgets, savings tips, and price comparisons."
        },
        {
            icon: <PlanIcon />,
            title: "Plan & Save",
            description: "Use the AI grocery planner to create cost-effective shopping lists that reduce food waste and save you money."
        }
    ];

    return (
        <div className="bg-secondary/60 dark:bg-gray-800/50 py-16 md:py-24 rounded-3xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Get Started in 3 Simple Steps</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                        Managing your finances has never been this easy.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {steps.map((step, index) => <Step key={step.title} {...step} stepNumber={index + 1} />)}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
