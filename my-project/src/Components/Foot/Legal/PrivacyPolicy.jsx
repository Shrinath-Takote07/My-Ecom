import React, { useState, useEffect } from 'react';

// Privacy Policy Component
const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [lastUpdated, setLastUpdated] = useState('December 5, 2023');
    const [showConsentPreferences, setShowConsentPreferences] = useState(false);
    const [consentSettings, setConsentSettings] = useState({
        necessary: true,
        analytics: true,
        marketing: false,
        personalization: true
    });

    // Table of contents
    const sections = [
        { id: 'overview', title: 'Overview', icon: '📋' },
        { id: 'data-collection', title: 'Data We Collect', icon: '📊' },
        { id: 'data-use', title: 'How We Use Data', icon: '🎯' },
        { id: 'data-sharing', title: 'Data Sharing', icon: '🤝' },
        { id: 'cookies', title: 'Cookies & Tracking', icon: '🍪' },
        { id: 'rights', title: 'Your Rights', icon: '👤' },
        { id: 'security', title: 'Security', icon: '🔒' },
        { id: 'contact', title: 'Contact Us', icon: '📞' }
    ];

    // Data collection types
    const dataTypes = [
        {
            category: 'Personal Information',
            examples: ['Name, email, phone number', 'Shipping/billing address', 'Payment information'],
            purpose: 'Account creation, order processing, customer support'
        },
        {
            category: 'Transactional Data',
            examples: ['Purchase history', 'Order details', 'Payment records'],
            purpose: 'Order fulfillment, returns, customer service'
        },
        {
            category: 'Technical Data',
            examples: ['IP address, device type', 'Browser information', 'Usage patterns'],
            purpose: 'Website functionality, security, analytics'
        },
        {
            category: 'Preferences',
            examples: ['Product interests', 'Communication preferences', 'Saved items'],
            purpose: 'Personalized experience, recommendations'
        }
    ];

    // Cookie types
    const cookieTypes = [
        {
            name: 'Essential Cookies',
            description: 'Required for basic site functionality',
            duration: 'Session',
            examples: ['Authentication', 'Shopping cart', 'Security'],
            canDisable: false
        },
        {
            name: 'Analytics Cookies',
            description: 'Help us understand how visitors interact',
            duration: '2 years',
            examples: ['Google Analytics', 'Hotjar', 'Mixpanel'],
            canDisable: true
        },
        {
            name: 'Marketing Cookies',
            description: 'Used for advertising and retargeting',
            duration: '1 year',
            examples: ['Facebook Pixel', 'Google Ads', 'Retargeting'],
            canDisable: true
        },
        {
            name: 'Preference Cookies',
            description: 'Remember your settings and preferences',
            duration: '1 year',
            examples: ['Language', 'Currency', 'Layout preferences'],
            canDisable: true
        }
    ];

    // User rights
    const userRights = [
        {
            right: 'Right to Access',
            description: 'Request a copy of your personal data',
            icon: '📋'
        },
        {
            right: 'Right to Rectification',
            description: 'Correct inaccurate or incomplete data',
            icon: '✏️'
        },
        {
            right: 'Right to Erasure',
            description: 'Request deletion of your personal data',
            icon: '🗑️'
        },
        {
            right: 'Right to Restrict',
            description: 'Limit how we use your data',
            icon: '⏸️'
        },
        {
            right: 'Right to Portability',
            description: 'Receive your data in a portable format',
            icon: '📤'
        },
        {
            right: 'Right to Object',
            description: 'Object to certain data processing',
            icon: '🚫'
        }
    ];

    // Security measures
    const securityMeasures = [
        {
            measure: 'SSL Encryption',
            description: 'All data transmitted is encrypted using SSL/TLS',
            icon: '🔐'
        },
        {
            measure: 'Secure Payments',
            description: 'PCI DSS compliant payment processing',
            icon: '💳'
        },
        {
            measure: 'Access Controls',
            description: 'Strict access controls and authentication',
            icon: '👮'
        },
        {
            measure: 'Regular Audits',
            description: 'Regular security assessments and audits',
            icon: '📋'
        },
        {
            measure: 'Data Encryption',
            description: 'Sensitive data encrypted at rest',
            icon: '🔒'
        },
        {
            measure: 'Employee Training',
            description: 'Regular privacy and security training',
            icon: '👥'
        }
    ];

    // Consent preferences modal
    const ConsentPreferences = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Cookie Preferences</h3>
                        <button
                            onClick={() => setShowConsentPreferences(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Manage your cookie preferences. Essential cookies cannot be disabled.
                    </p>

                    <div className="space-y-4">
                        {cookieTypes.map((cookie, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{cookie.name}</h4>
                                        <p className="text-gray-600 text-sm">{cookie.description}</p>
                                    </div>
                                    {cookie.canDisable ? (
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={consentSettings[cookie.name.toLowerCase().split(' ')[0]]}
                                                onChange={(e) => {
                                                    const key = cookie.name.toLowerCase().split(' ')[0];
                                                    setConsentSettings(prev => ({
                                                        ...prev,
                                                        [key]: e.target.checked
                                                    }));
                                                }}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    ) : (
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            Always Active
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="mr-4">⏱️ Duration: {cookie.duration}</span>
                                    <span>Examples: {cookie.examples.join(', ')}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-3 mt-8">
                        <button
                            onClick={() => {
                                setConsentSettings({
                                    necessary: true,
                                    analytics: false,
                                    marketing: false,
                                    personalization: false
                                });
                            }}
                            className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                        >
                            Reject All
                        </button>
                        <button
                            onClick={() => {
                                setConsentSettings({
                                    necessary: true,
                                    analytics: true,
                                    marketing: true,
                                    personalization: true
                                });
                            }}
                            className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                        >
                            Accept All
                        </button>
                        <button
                            onClick={() => setShowConsentPreferences(false)}
                            className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                        >
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Scroll to section
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = 'overview';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center">
                        <button className="mr-3 p-2 rounded-lg bg-gray-100">
                            ←
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">Privacy Policy</h1>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 ml-11">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </header>

            <div className="p-4">
                {/* Introduction */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Privacy Matters</h2>
                        <p className="text-gray-700 mb-4">
                            We are committed to protecting your personal information and being transparent about how we collect, use, and share your data.
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-4">📄 Version 3.2</span>
                            <span>🔒 GDPR & CCPA Compliant</span>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <div className="flex space-x-3 mb-8">
                    <button
                        onClick={() => setShowConsentPreferences(true)}
                        className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center"
                    >
                        <span className="mr-2">🍪</span> Cookie Settings
                    </button>
                    <button className="flex-1 py-3 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center">
                        <span className="mr-2">📋</span> Download PDF
                    </button>
                </div>

                {/* Table of Contents */}
                <section className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Jump to Section</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`p-3 rounded-lg border text-left ${activeSection === section.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-2">{section.icon}</span>
                                    <span className="font-medium text-gray-800">{section.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Policy Content */}
                <div className="space-y-8">
                    {/* Overview */}
                    <section id="overview" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">📋</span> Overview
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-gray-700 mb-4">
                                This Privacy Policy describes how we collect, use, process, and disclose your information, including personal information, in connection with your access to and use of our website and services.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-bold text-gray-800 mb-2">Key Points:</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>We never sell your personal data to third parties</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>You control your data and can request access or deletion</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>We use industry-standard security measures</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>We minimize data collection to what's necessary</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Data We Collect */}
                    <section id="data-collection" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">📊</span> Data We Collect
                        </h2>
                        <div className="space-y-4">
                            {dataTypes.map((dataType, index) => (
                                <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
                                    <h3 className="font-bold text-gray-800 mb-3">{dataType.category}</h3>
                                    <div className="mb-3">
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Examples:</h4>
                                        <ul className="space-y-1">
                                            {dataType.examples.map((example, i) => (
                                                <li key={i} className="text-gray-600 text-sm flex items-start">
                                                    <span className="text-gray-400 mr-2">•</span>
                                                    {example}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Primary Purpose:</h4>
                                        <p className="text-gray-600 text-sm">{dataType.purpose}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* How We Use Data */}
                    <section id="data-use" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🎯</span> How We Use Your Data
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-blue-600 text-2xl mb-2">🛒</div>
                                    <h4 className="font-bold text-gray-800 mb-1">Order Processing</h4>
                                    <p className="text-gray-600 text-sm">To process and deliver your orders</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-green-600 text-2xl mb-2">👤</div>
                                    <h4 className="font-bold text-gray-800 mb-1">Account Management</h4>
                                    <p className="text-gray-600 text-sm">To create and manage your account</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="text-purple-600 text-2xl mb-2">📈</div>
                                    <h4 className="font-bold text-gray-800 mb-1">Improve Services</h4>
                                    <p className="text-gray-600 text-sm">To analyze and enhance our platform</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="text-yellow-600 text-2xl mb-2">🔔</div>
                                    <h4 className="font-bold text-gray-800 mb-1">Communication</h4>
                                    <p className="text-gray-600 text-sm">To send updates and offers</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Sharing */}
                    <section id="data-sharing" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🤝</span> Data Sharing
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-gray-700 mb-4">
                                We only share your data with trusted third parties under strict conditions:
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <span className="text-blue-600">🚚</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Service Providers</h4>
                                        <p className="text-gray-600 text-sm">Shipping carriers, payment processors, hosting providers</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <span className="text-green-600">⚖️</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Legal Requirements</h4>
                                        <p className="text-gray-600 text-sm">When required by law or to protect rights</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                        <span className="text-purple-600">🏢</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Business Transfers</h4>
                                        <p className="text-gray-600 text-sm">In connection with mergers or acquisitions</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 text-sm">
                                    <span className="font-bold">Important:</span> We never sell your personal data to third parties for marketing purposes.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section id="cookies" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🍪</span> Cookies & Tracking
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-gray-700 mb-6">
                                We use cookies and similar technologies to enhance your browsing experience and analyze site traffic.
                            </p>

                            <div className="space-y-4">
                                {cookieTypes.map((cookie, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-800">{cookie.name}</h4>
                                                <p className="text-gray-600 text-sm">{cookie.description}</p>
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                                {cookie.duration}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span>Examples: {cookie.examples.join(', ')}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowConsentPreferences(true)}
                                className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                            >
                                Manage Cookie Preferences
                            </button>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section id="rights" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">👤</span> Your Privacy Rights
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {userRights.map((right, index) => (
                                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-2xl mb-2">{right.icon}</div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{right.right}</h4>
                                    <p className="text-gray-600 text-xs">{right.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
                            <h4 className="font-bold text-gray-800 mb-3">How to Exercise Your Rights</h4>
                            <p className="text-gray-700 mb-4">
                                To exercise any of these rights, contact us at privacy@example.com or use the form below.
                            </p>
                            <button className="w-full py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50">
                                Submit Data Request
                            </button>
                        </div>
                    </section>

                    {/* Security */}
                    <section id="security" className="scroll-mt-24">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">🔒</span> Security Measures
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {securityMeasures.map((measure, index) => (
                                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-2xl mb-2">{measure.icon}</div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{measure.measure}</h4>
                                    <p className="text-gray-600 text-xs">{measure.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact */}
                    <section id="contact" className="scroll-mt-24 mb-20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">📞</span> Contact Us
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Data Protection Officer</h4>
                                    <p className="text-gray-700">Alex Morgan, Data Protection Officer</p>
                                    <p className="text-blue-600">privacy@example.com</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Mailing Address</h4>
                                    <p className="text-gray-700">
                                        Privacy Office<br />
                                        123 Commerce Street<br />
                                        San Francisco, CA 94107<br />
                                        United States
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Response Time</h4>
                                    <p className="text-gray-700">
                                        We aim to respond to all privacy inquiries within 30 days.
                                    </p>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900">
                                Contact Privacy Team
                            </button>
                        </div>
                    </section>
                </div>

                {/* Consent Preferences Modal */}
                {showConsentPreferences && <ConsentPreferences />}
            </div>

            {/* Fixed Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Need help?</p>
                            <p className="text-sm text-gray-600">Contact our privacy team</p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900"
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PrivacyPolicy
// Main App Component
// const App = () => {
//     return (
//         <div className="max-w-md mx-auto bg-white min-h-screen">
//             <PrivacyPolicy />
//         </div>
//     );
// };

// export default App;