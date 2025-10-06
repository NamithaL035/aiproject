
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "w-6 h-6" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        {children}
    </svg>
);

export const DashboardIcon = () => <IconWrapper><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></IconWrapper>;
export const AnalyticsIcon = () => <IconWrapper><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></IconWrapper>;
export const OperationsIcon = () => <IconWrapper><rect width="8" height="8" x="3" y="3" rx="1"/><path d="M7 11v4a1 1 0 0 0 1 1h4"/><rect width="8" height="8" x="13" y="13" rx="1"/></IconWrapper>;
export const ReportsIcon = () => <IconWrapper><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></IconWrapper>;
export const ConfigurationIcon = () => <IconWrapper><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></IconWrapper>;
export const SystemLogsIcon = () => <IconWrapper><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="M12 12h.01"/><path d="m16 6-4-4-4 4"/><path d="m16 18 4 4 4-4"/></IconWrapper>;
export const HelpIcon = () => <IconWrapper><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></IconWrapper>;
export const AssistantIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></IconWrapper>;
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>;
export const SendIcon = () => <IconWrapper className="w-5 h-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/></IconWrapper>;
export const SpinnerIcon: React.FC<{colorClass?: string}> = ({ colorClass = "text-text-primary" }) => (
    <svg className={`animate-spin h-5 w-5 ${colorClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
export const PlanIcon = () => <IconWrapper><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></IconWrapper>;
export const IncomeIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></IconWrapper>;

export const SunIcon = () => <IconWrapper><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></IconWrapper>;
export const MoonIcon = () => <IconWrapper><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></IconWrapper>;
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconWrapper>;
export const BellIcon = () => <IconWrapper><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></IconWrapper>;
export const PlusIcon = () => <IconWrapper><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
export const LogoutIcon = () => <IconWrapper><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></IconWrapper>;
export const ChevronDownIcon = () => <IconWrapper className="w-4 h-4"><path d="m6 9 6 6 6-6"/></IconWrapper>;
export const MenuIcon = () => <IconWrapper><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>;
export const CloseIcon = () => <IconWrapper><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></IconWrapper>;

// Category Icons
export const GroceriesIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></IconWrapper>;
export const UtilitiesIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="m13 2-3 9h9L8 22l3-9H2z"/></IconWrapper>;
export const RentIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconWrapper>;
export const EntertainmentIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="M2 9a3 3 0 0 1 0 6v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a3 3 0 0 1 0-6V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M7 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/><path d="M17 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></IconWrapper>;
export const TransportIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="M14 16.5 19.5 12 14 7.5"/><path d="M4 12h15.5"/><rect width="7" height="14" x="2" y="5" rx="2"/></IconWrapper>;
export const HealthcareIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M9 12H5"/><path d="M7 10v4"/></IconWrapper>;
export const ShoppingIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></IconWrapper>;
export const OtherIcon: React.FC<{ className?: string }> = ({ className }) => <IconWrapper className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></IconWrapper>;
