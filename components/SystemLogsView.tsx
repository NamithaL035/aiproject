
import React from 'react';
import SpeechIntent from './SpeechIntent';

const Card: React.FC<{ children: React.ReactNode, title: string, description: string }> = ({ children, title, description }) => (
    <div className="card">
        <h3 className="text-2xl font-bold mb-2 text-text-primary">{title}</h3>
        <p className="text-text-secondary mb-6">{description}</p>
        {children}
    </div>
);

const LogEntry: React.FC<{ level: 'INFO' | 'WARN' | 'ERROR', timestamp: string, message: string }> = ({ level, timestamp, message }) => {
    const levelColor = {
        INFO: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        WARN: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
        ERROR: 'bg-red-500/10 text-red-600 dark:text-red-400'
    }[level];
    
    return (
        <div className="font-mono text-sm flex items-center space-x-4 p-2 rounded-md hover:bg-secondary">
            <span className="text-text-secondary">{timestamp}</span>
            <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${levelColor}`}>{level}</span>
            <span className="text-text-primary flex-1">{message}</span>
        </div>
    )
};


const SystemLogsView: React.FC = () => {
    const logs: { level: 'INFO' | 'WARN' | 'ERROR', timestamp: string, message: string }[] = [
        { level: 'INFO', timestamp: '14:32:10', message: 'User user123 logged in successfully.' },
        { level: 'INFO', timestamp: '14:32:15', message: 'Executed grocery plan generation. Budget: 3000, Family Size: 3.' },
        { level: 'WARN', timestamp: '14:32:18', message: 'Third-party price quoter API latency high: 1800ms.' },
        { level: 'INFO', timestamp: '14:33:05', message: 'User user123 accessed analytics view.' },
        { level: 'ERROR', timestamp: '14:33:40', message: 'Failed to process receipt OCR: Image resolution too low.' },
         { level: 'INFO', timestamp: '14:34:01', message: 'Generated savings recommendations for user123.' },
    ];
    
    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-extrabold text-text-primary text-center">System Logs & Tools</h1>
            <SpeechIntent />
            <Card title="Audit Log" description="A real-time feed of important events occurring within the system.">
                <div className="bg-secondary/50 p-4 rounded-lg space-y-1 max-h-96 overflow-y-auto border border-border">
                    {logs.map((log, index) => <LogEntry key={index} {...log} />)}
                </div>
            </Card>
        </div>
    );
};

export default SystemLogsView;
