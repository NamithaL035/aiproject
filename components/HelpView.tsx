import React, { useState } from 'react';
import ApiContract from './ApiContract';
import DataSchema from './DataSchema';
import MLOpsInfra from './MLOpsInfra';
import SprintTasks from './SprintTasks';
import MvpSkeleton from './MvpSkeleton';
import AssistantPrompt from './AssistantPrompt';
import LlmServicePrompting from './LlmServicePrompting';
import LlmGroceryApi from './LlmGroceryApi';
import MobileApp from './MobileApp';

const TABS = [
    "AI Prompts",
    "MVP Skeleton",
    "Mobile App Code",
    "Backend API Service",
    "API Contract",
    "Data Schema",
    "MLOps Plan",
    "Sprint Tasks",
];

const HelpView: React.FC = () => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const renderContent = () => {
        switch (activeTab) {
            case "AI Prompts":
                return <div className="space-y-8"><AssistantPrompt /><LlmServicePrompting /></div>;
            case "MVP Skeleton": return <MvpSkeleton />;
            case "Mobile App Code": return <MobileApp />;
            case "Backend API Service": return <LlmGroceryApi />;
            case "API Contract": return <ApiContract />;
            case "Data Schema": return <DataSchema />;
            case "MLOps Plan": return <MLOpsInfra />;
            case "Sprint Tasks": return <SprintTasks />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-text-primary">Help & Developer Docs</h1>
                <p className="mt-2 text-lg text-text-secondary">Technical resources, code examples, and project plans.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="md:w-1/4 lg:w-1/5">
                    <nav className="flex flex-col space-y-2">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2.5 rounded-lg text-left font-semibold transition-all duration-200 ${
                                    activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-card-bg text-text-secondary hover:bg-secondary hover:text-primary'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="md:w-3/4 lg:w-4/5">
                    <div className="card bg-gray-900 text-gray-300 dark:bg-gray-900/80">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpView;
