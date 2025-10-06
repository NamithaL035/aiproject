import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, AssistantIcon } from '../icons';

const NavLink: React.FC<{ href: string, children: React.ReactNode, onClick?: () => void }> = ({ href, children, onClick }) => (
    <a href={href} onClick={onClick} className="text-base font-medium text-text-secondary hover:text-text-primary transition-colors">
        {children}
    </a>
);

const Header: React.FC<{ theme: string, toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#faq', label: 'FAQ' },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-card-bg/80 backdrop-blur-sm shadow-md border-b border-border' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#" className="flex-shrink-0 flex items-center gap-2">
                        <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-500">
                             <AssistantIcon />
                        </span>
                        <span className="font-bold text-2xl text-text-primary">SavvySpend</span>
                    </a>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary text-text-secondary hover:text-text-primary transition-colors">
                            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                        <a href="#" className="hidden sm:inline-block btn-primary !py-2 !px-4">
                            Get Started
                        </a>
                        <button className="md:hidden p-2 text-text-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-card-bg border-t border-border">
                    <nav className="px-4 pt-2 pb-4 space-y-2">
                        {navLinks.map(link => <NavLink key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</NavLink>)}
                         <a href="#" className="block w-full text-center btn-primary !py-2.5 mt-2">
                            Get Started
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
