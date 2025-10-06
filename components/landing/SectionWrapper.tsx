import React from 'react';

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;
