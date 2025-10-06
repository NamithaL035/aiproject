
import React, { Fragment } from 'react';
import { 
    DashboardIcon, OperationsIcon, ReportsIcon,
    AssistantIcon, PlanIcon, ConfigurationIcon
} from './icons';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isFamilyMode: boolean;
}

const allNavItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, family: true },
    { name: 'AI Assistant', icon: <AssistantIcon />, family: false },
    { name: 'Planner', icon: <OperationsIcon />, family: false },
    { name: 'My Plans', icon: <PlanIcon />, family: true },
    { name: 'Reports', icon: <ReportsIcon />, family: false },
    { name: 'Configuration', icon: <ConfigurationIcon />, family: false },
];

const NavLink: React.FC<{
  item: { name: string; icon: React.ReactNode };
  activeView: string;
  setActiveView: (view: string) => void;
}> = ({ item, activeView, setActiveView }) => {
    const isActive = activeView === item.name;
    return (
        <button
            onClick={() => setActiveView(item.name)}
            className={`w-full flex items-center p-3 my-1 rounded-lg transition-all duration-200 text-left
                ${isActive
                    ? 'neumorphic-inset text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]'
                }`}
        >
            {item.icon}
            <span className="ml-4 font-semibold">{item.name}</span>
        </button>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isSidebarOpen, setIsSidebarOpen, isFamilyMode }) => {
  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 neumorphic-pane !rounded-none transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`;

  const navItems = isFamilyMode ? allNavItems.filter(item => item.family) : allNavItems;

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-center h-20">
             <button onClick={() => setActiveView('Dashboard')} className="flex-shrink-0 flex items-center gap-2">
               <span className="w-10 h-10 rounded-lg flex items-center justify-center neumorphic-convex">
                 <AssistantIcon className="text-[var(--color-primary)]" />
               </span>
               <span className="font-bold text-2xl text-[var(--color-text-primary)]">SavvySpend</span>
            </button>
          </div>
          <nav className="flex-1 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.name} {...{ item, activeView, setActiveView }} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
