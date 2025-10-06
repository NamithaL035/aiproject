

import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/assistantService';
import ResultDisplay from './ResultDisplay';
import { SendIcon, UserIcon, AssistantIcon, SpinnerIcon } from './icons';

interface Message {
    sender: 'user' | 'ai';
    content: any; // Can be string for user, or object for AI
}

interface AiAssistantProps {
    isFamilyMode: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isFamilyMode }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', content: { feature: 'Greeting', summary: "Hello! I'm your AI Assistant. How can I help you save money or plan your meals today?", output: { suggestions: ["Give me a recipe for chicken and rice", "Compare prices for milk and bread", "Give me a savings tip"] } } }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim() || isFamilyMode) return;

        const userMessage: Message = { sender: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await getAssistantResponse(input);
            const aiMessage: Message = { sender: 'ai', content: response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', content: { feature: 'Error', summary: 'Sorry, I encountered an issue. Please try again.' } };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-12rem)] card !p-0">
            <header className="p-4 border-b border-[var(--shadow-dark)]">
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)] text-center">AI Assistant</h1>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && (
                            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center neumorphic-convex text-[var(--color-primary)]">
                                <AssistantIcon />
                            </div>
                        )}
                        <div className={`max-w-lg p-4 rounded-2xl neumorphic-convex ${msg.sender === 'user' ? 'text-[var(--color-text-primary)] !shadow-none neumorphic-inset' : 'text-[var(--color-text-primary)]'}`}>
                            {msg.sender === 'user' ? (
                                <p>{msg.content}</p>
                            ) : (
                                <div className="space-y-2">
                                    <p className="font-semibold">{msg.content.summary}</p>
                                    {msg.content.output && <ResultDisplay data={msg.content.output} />}
                                </div>
                            )}
                        </div>
                         {msg.sender === 'user' && (
                            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center neumorphic-convex">
                                <UserIcon className="w-6 h-6 text-[var(--color-text-secondary)]"/>
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-4 justify-start">
                         <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center neumorphic-convex text-[var(--color-primary)]">
                            <AssistantIcon />
                        </div>
                        <div className="max-w-lg p-4 rounded-2xl text-[var(--color-text-primary)] flex items-center space-x-2 neumorphic-convex">
                            <SpinnerIcon colorClass="text-[var(--color-text-secondary)]" />
                            <span className="text-[var(--color-text-secondary)]">AI is thinking...</span>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-[var(--shadow-dark)]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                        className="form-input w-full !pr-14"
                        placeholder={isFamilyMode ? "Chat is disabled in Family Mode" : "Ask me anything..."}
                        disabled={loading || isFamilyMode}
                    />
                    <button onClick={handleSend} disabled={loading || isFamilyMode} className="absolute right-2 top-1/2 -translate-y-1/2 btn-icon">
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;
