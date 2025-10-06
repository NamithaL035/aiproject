import React from 'react';
import Header from './landing/Header';
import Hero from './landing/Hero';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import Testimonials from './landing/Testimonials';
import FAQ from './landing/FAQ';
import Footer from './landing/Footer';
import SectionWrapper from './landing/SectionWrapper';

interface LandingPageProps {
    theme: string;
    toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ theme, toggleTheme }) => {
    return (
        <div className="bg-bg text-text-primary antialiased">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Hero />
                <SectionWrapper id="features">
                    <Features />
                </SectionWrapper>
                <SectionWrapper id="how-it-works">
                    <HowItWorks />
                </SectionWrapper>
                <SectionWrapper id="testimonials">
                    <Testimonials />
                </SectionWrapper>
                <SectionWrapper id="faq">
                    <FAQ />
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
