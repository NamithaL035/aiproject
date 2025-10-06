import React from 'react';
import { PlanIcon, AnalyticsIcon, AssistantIcon, SystemLogsIcon, ReportsIcon, ConfigurationIcon } from '../icons';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="card text-center items-center flex flex-col p-8">
        <div className="mb-4 text-white rounded-full flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-500">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
);

const Features: React.FC = () => {
    const features = [
        {
            icon: <PlanIcon />,
            title: "AI Grocery Planner",
            description: "Generate personalized weekly grocery lists based on your budget, family size, and dietary needs."
        },
        {
            icon: <AnalyticsIcon />,
            title: "Smart Savings Insights",
            description: "Analyze spending, get personalized saving recommendations, and compare prices across stores."
        },
        {
            icon: <AssistantIcon />,
            title: "Conversational AI",
            description: "Just ask! Get recipe ideas, savings tips, and manage your expenses using our friendly AI assistant."
        },
        {
            icon: <ReportsIcon />,
            title: "Automated Receipt Scanner",
            description: "Snap a photo of any receipt, and our OCR technology will automatically digitize and categorize it for you."
        },
        {
            icon: <SystemLogsIcon />,
            title: "Voice Command Parser",
            description: "Log expenses on the go by simply speaking. Our AI understands natural language to make tracking effortless."
        },
        {
            icon: <ConfigurationIcon />,
            title: "Personalization Engine",
            description: "Receive cost-saving recommendations tailored to your unique profile and spending history."
        }
    ];

    return (
        <>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Everything you need, powered by AI</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    From planning groceries to tracking spending, SavvySpend offers a suite of intelligent tools to simplify your financial life.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
            </div>
        </>
    );
};

export default Features;
