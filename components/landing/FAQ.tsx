import React, { useState } from 'react';
import { ChevronDownIcon } from '../icons';

const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border">
            <button
                className="w-full flex justify-between items-center text-left py-6"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-text-primary">{question}</h3>
                <ChevronDownIcon />
            </button>
            {isOpen && (
                <div className="pb-6 pr-8 text-text-secondary">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "Is my financial data secure?",
            answer: "Absolutely. We use bank-level encryption and robust security measures to protect your data. We never sell your information to third parties. Your privacy is our top priority."
        },
        {
            question: "What makes SavvySpend different from other budget apps?",
            answer: "Our core difference is the deep integration of AI. We don't just help you track; we provide proactive insights, generate smart grocery plans, and offer personalized savings coaching to actively help you improve your financial health."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes, SavvySpend is designed to be mobile-first. You can download our app from the Google Play Store and Apple App Store to manage your finances on the go."
        },
        {
            question: "How does the AI work?",
            answer: "We use state-of-the-art language models and machine learning algorithms to analyze your spending data (anonymously and securely), identify patterns, and generate intelligent recommendations. Our AI learns from your habits to provide increasingly accurate and helpful insights over time."
        }
    ];

    return (
        <>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Frequently Asked Questions</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    Have questions? We have answers.
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                {faqs.map(faq => <FaqItem key={faq.question} {...faq} />)}
            </div>
        </>
    );
};

export default FAQ;
