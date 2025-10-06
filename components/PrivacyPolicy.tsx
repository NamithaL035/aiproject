import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto card">
            <h1 className="text-4xl font-extrabold text-text-primary mb-6">Privacy Policy</h1>
            <p className="text-text-secondary mb-8">Last updated: September 16, 2024</p>

            <div className="space-y-6 text-text-secondary">
                <p>
                    Welcome to SavvySpend AI ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
                </p>

                <section>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">1. Information We Collect</h2>
                    <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
                    <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register with the application.</li>
                        <li><strong>Financial Data:</strong> Data related to your expenses, income, and budgets that you input into the application. This data is used solely to provide the app's features and is treated with the highest level of confidentiality.</li>
                        <li><strong>Usage Data:</strong> Information our servers automatically collect when you access the app, such as your IP address, browser type, and the pages you have viewed.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">2. How We Use Your Information</h2>
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
                     <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                        <li>Create and manage your account.</li>
                        <li>Generate personalized grocery lists and financial reports.</li>
                        <li>Provide AI-driven recommendations and savings tips.</li>
                        <li>Monitor and analyze usage and trends to improve your experience.</li>
                        <li>Notify you of updates to the application.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">3. Disclosure of Your Information</h2>
                    <p>We do not share, sell, rent, or trade your information with any third parties for their promotional purposes. We may share information we have collected about you in certain situations, such as:</p>
                     <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                        <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                        <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis and cloud hosting services. Our AI features are powered by the Google Gemini API, and usage is subject to Google's privacy policy.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">4. Security of Your Information</h2>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">5. Your Rights</h2>
                    <p>You have the right to review, change, or terminate your account at any time. You can do so by logging into your account settings and updating your account or by contacting us using the contact information provided below.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-text-primary mb-3">6. Contact Us</h2>
                    <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@savvyspend.ai" className="text-blue-500 hover:underline">privacy@savvyspend.ai</a></p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
