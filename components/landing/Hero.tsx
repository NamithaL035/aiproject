import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 text-center">
            <div className="absolute inset-0 bg-secondary/30 dark:bg-gray-900/40 -z-10"></div>
             <div 
                className="absolute top-0 left-0 w-full h-full bg-grid -z-10"
                style={{ maskImage: 'radial-gradient(ellipse 50% 60% at 50% 0%, #000 70%, transparent 100%)' }}
            ></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-text-primary leading-tight mb-6">
                    Master Your Money with
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 dark:from-blue-400 dark:to-indigo-300">
                        AI-Powered Insights
                    </span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary mb-10">
                    SavvySpend is the smartest way to manage household expenses, optimize grocery shopping, and unlock real savings. Let our AI do the heavy lifting for you.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <a href="#" className="btn-primary !text-lg !py-3.5 !px-8">
                        Try Demo Now
                    </a>
                    <a href="#how-it-works" className="font-semibold text-text-secondary hover:text-text-primary transition-colors">
                        Learn More &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
