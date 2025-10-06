
import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon, SunIcon, MoonIcon, ChevronDownIcon, LogoutIcon, UserIcon } from './icons';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleTheme: () => void;
    currentTheme: string;
    activeView: string;
    onLogout: () => void;
    isFamilyMode: boolean;
    toggleFamilyMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
    sidebarOpen,
    setSidebarOpen,
    toggleTheme,
    currentTheme,
    activeView,
    onLogout,
    isFamilyMode,
    toggleFamilyMode,
}) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 neumorphic-pane !rounded-none">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Header: Left side */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger button */}
                        <button
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] md:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuIcon />
                        </button>
                        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] hidden sm:block">{activeView}</h1>
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                         {isFamilyMode && (
                            <div className="flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full text-sm font-semibold">
                                <UserIcon className="w-4 h-4" />
                                <span>Family Mode: Viewing Only</span>
                            </div>
                        )}
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="btn-icon">
                            {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>

                        {/* User menu */}
                        <div className="relative inline-flex" ref={dropdownRef}>
                           <button 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 p-2 rounded-full neumorphic-convex"
                           >
                               <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/40" alt="User" />
                               <span className="hidden md:block text-sm font-semibold text-[var(--color-text-primary)]">Admin</span>
                               <ChevronDownIcon />
                           </button>

                           {/* Dropdown */}
                           {isUserMenuOpen && (
                               <div className="absolute top-full right-0 mt-2 w-56 neumorphic-pane !p-2 z-10">
                                   <ul className="space-y-1">
                                       <li>
                                            <div className="flex items-center justify-between px-3 py-2 text-sm">
                                                <label htmlFor="family-mode-toggle" className="font-semibold text-[var(--color-text-primary)]">Family Mode</label>
                                                <button onClick={toggleFamilyMode} id="family-mode-toggle" className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isFamilyMode ? 'bg-[var(--color-primary)]' : 'neumorphic-inset'}`}>
                                                    <span className={`inline-block w-4 h-4 transform bg-[var(--shadow-light)] rounded-full transition-transform ${isFamilyMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                       </li>
                                       <li className="border-t border-[var(--shadow-dark)] my-1"></li>
                                       <li>
                                           <button 
                                                onClick={() => {
                                                    onLogout();
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:neumorphic-inset"
                                            >
                                                <LogoutIcon />
                                                <span>Logout</span>
                                           </button>
                                       </li>
                                   </ul>
                               </div>
                           )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
