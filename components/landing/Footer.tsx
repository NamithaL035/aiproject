import React from 'react';
import { AssistantIcon } from '../icons';

const Footer: React.FC = () => {
    const footerLinks = [
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#faq', label: 'FAQ' },
        { href: '#', label: 'Privacy Policy' },
    ];
    
    return (
        <footer className="bg-secondary/60 dark:bg-gray-800/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                     <h2 className="text-3xl font-extrabold text-text-primary">Ready to take control of your finances?</h2>
                     <p className="mt-3 max-w-md mx-auto text-text-secondary">Join SavvySpend today and start your journey to financial wellness.</p>
                     <a href="#" className="btn-primary mt-6 !text-lg !py-3 !px-8">
                        Get Started for Free
                    </a>
                </div>
                <div className="border-t border-border pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-500">
                             <AssistantIcon />
                        </span>
                        <span className="font-bold text-xl text-text-primary">SavvySpend</span>
                    </div>
                     <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 my-4 sm:my-0">
                        {footerLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <p className="text-sm text-text-secondary">&copy; {new Date().getFullYear()} SavvySpend AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
