import React, { useState } from 'react';
import { FaCookieBite, FaEye, FaLock, FaChartBar, FaCog, FaCheckCircle, FaTimes, FaInfoCircle, FaSave } from 'react-icons/fa';

const CookiePolicyPage = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false,
        personalization: true
    });
    const [showDetails, setShowDetails] = useState(null);
    const [consentGiven, setConsentGiven] = useState(true);

    const cookieTypes = [
        {
            id: 'essential',
            name: 'Essential Cookies',
            description: 'Required for basic site functionality',
            mandatory: true,
            icon: <FaLock className="text-blue-600" />,
            examples: ['Session management', 'Security features', 'Load balancing'],
            duration: 'Session'
        },
        {
            id: 'analytics',
            name: 'Analytics Cookies',
            description: 'Help us improve website performance',
            mandatory: false,
            icon: <FaChartBar className="text-purple-600" />,
            examples: ['Visitor statistics', 'Page interactions', 'Performance data'],
            duration: '2 years'
        },
        {
            id: 'marketing',
            name: 'Marketing Cookies',
            description: 'Used for targeted advertising',
            mandatory: false,
            icon: <FaEye className="text-red-600" />,
            examples: ['Ad personalization', 'Campaign tracking', 'Conversion data'],
            duration: '1 year'
        },
        {
            id: 'personalization',
            name: 'Personalization Cookies',
            description: 'Remember your preferences and settings',
            mandatory: false,
            icon: <FaCog className="text-green-600" />,
            examples: ['Language settings', 'Region preferences', 'Theme choices'],
            duration: '1 year'
        }
    ];

    const cookieTable = [
        { name: '_session_id', purpose: 'Maintain user session state', provider: 'Our website', duration: 'Session' },
        { name: '_ga', purpose: 'Google Analytics tracking', provider: 'Google', duration: '2 years' },
        { name: '_fbp', purpose: 'Facebook Pixel tracking', provider: 'Meta', duration: '3 months' },
        { name: 'lang', purpose: 'Language preference', provider: 'Our website', duration: '1 year' },
        { name: 'cookie_consent', purpose: 'Store cookie preferences', provider: 'Our website', duration: '1 year' }
    ];

    const faqs = [
        {
            question: 'What are cookies?',
            answer: 'Cookies are small text files that websites place on your device to store information about your preferences, login status, and browsing behavior.'
        },
        {
            question: 'How can I manage cookies?',
            answer: 'You can manage cookies through your browser settings or use our cookie preference center. Essential cookies cannot be disabled as they are required for the website to function.'
        },
        {
            question: 'Do you use third-party cookies?',
            answer: 'Yes, we use carefully selected third-party cookies for analytics and advertising purposes. These are controlled by our partners and subject to their privacy policies.'
        },
        {
            question: 'How often is this policy updated?',
            answer: 'We review and update this policy regularly. The last update was on March 15, 2024.'
        },
        {
            question: 'Can I withdraw my consent?',
            answer: 'Yes, you can withdraw or change your cookie consent at any time by clicking the "Cookie Settings" button in the footer.'
        }
    ];

    const handlePreferenceChange = (id, value) => {
        if (id === 'essential') return; // Essential cookies cannot be disabled

        setCookiePreferences(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSavePreferences = () => {
        // In a real app, save to localStorage or send to backend
        localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
        setShowSettings(false);
        alert('Cookie preferences saved successfully!');
    };

    const handleAcceptAll = () => {
        const allAccepted = Object.keys(cookiePreferences).reduce((acc, key) => ({
            ...acc,
            [key]: true
        }), {});
        setCookiePreferences(allAccepted);
        setConsentGiven(true);
        setShowSettings(false);
    };

    const handleRejectAll = () => {
        const rejected = Object.keys(cookiePreferences).reduce((acc, key) => ({
            ...acc,
            [key]: key === 'essential' // Only essential cookies remain
        }), {});
        setCookiePreferences(rejected);
        setConsentGiven(true);
        setShowSettings(false);
    };

    const CookieConsentBanner = () => (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 border-t border-gray-700">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="mb-4 md:mb-0 md:mr-6 flex-1">
                        <div className="flex items-center mb-2">
                            <FaCookieBite className="mr-3 text-yellow-400" />
                            <h3 className="font-bold">We Use Cookies</h3>
                        </div>
                        <p className="text-gray-300 text-sm">
                            We use cookies to enhance your browsing experience, analyze site traffic,
                            and personalize content. By clicking "Accept All", you consent to our use of cookies.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
                        >
                            Customize
                        </button>
                        <button
                            onClick={handleRejectAll}
                            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
                        >
                            Reject All
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                <FaCookieBite className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Cookie Policy</h1>
                                <p className="text-gray-600 text-sm">Last updated: March 15, 2024</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <FaCog className="mr-2" />
                            Cookie Settings
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-4 max-w-6xl mx-auto">
                {/* Introduction */}
                <section className="mb-10">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Cookie Policy</h2>
                        <p className="text-gray-700 mb-4">
                            This Cookie Policy explains how we use cookies and similar tracking technologies on our website.
                            It describes what cookies are, the types we use, how we use them, and how you can control them.
                        </p>
                        <p className="text-gray-700">
                            By using our website, you consent to the use of cookies in accordance with this policy,
                            unless you have disabled them in your browser settings.
                        </p>
                    </div>
                </section>

                {/* Cookie Types */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cookieTypes.map((type) => (
                            <div
                                key={type.id}
                                className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition"
                            >
                                <div className="flex items-start mb-4">
                                    <div className="bg-gray-50 p-3 rounded-lg mr-4">
                                        <div className="text-xl">{type.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                                            {type.mandatory && (
                                                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                                    Always Active
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm mt-1">{type.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 text-sm">Status:</span>
                                        <span className={`font-medium ${cookiePreferences[type.id] ? 'text-green-600' : 'text-gray-400'}`}>
                                            {cookiePreferences[type.id] ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 text-sm">Duration:</span>
                                        <span className="font-medium">{type.duration}</span>
                                    </div>

                                    <button
                                        onClick={() => setShowDetails(showDetails === type.id ? null : type.id)}
                                        className="w-full text-left text-blue-600 hover:text-blue-700 text-sm font-medium"
                                    >
                                        {showDetails === type.id ? 'Hide Details' : 'Show Details'}
                                    </button>

                                    {showDetails === type.id && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                                            <ul className="space-y-1">
                                                {type.examples.map((example, index) => (
                                                    <li key={index} className="text-gray-600 text-sm flex items-center">
                                                        <FaInfoCircle className="mr-2 text-gray-400 text-xs" />
                                                        {example}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {!type.mandatory && (
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <span className="text-gray-700 text-sm">Enable this cookie type</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={cookiePreferences[type.id]}
                                                    onChange={(e) => handlePreferenceChange(type.id, e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Detailed Cookie Table */}
                <section className="mb-10">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Cookie Information</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-900">Provider</th>
                                        <th className="p-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cookieTable.map((cookie, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-3 text-sm font-medium text-gray-900">{cookie.name}</td>
                                            <td className="p-3 text-sm text-gray-700">{cookie.purpose}</td>
                                            <td className="p-3 text-sm text-gray-700">{cookie.provider}</td>
                                            <td className="p-3 text-sm text-gray-700">{cookie.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-5">
                                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Browser Controls */}
                <section className="mb-10">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies in Your Browser</h2>
                        <p className="text-gray-700 mb-6">
                            You can control and/or delete cookies as you wish. Most web browsers allow you to manage cookie
                            preferences through their settings. Here's how to access these settings in popular browsers:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4">
                                <h4 className="font-bold text-gray-900 mb-2">Google Chrome</h4>
                                <ol className="text-gray-600 text-sm list-decimal list-inside space-y-1">
                                    <li>Click the three dots in the top-right corner</li>
                                    <li>Select "Settings" then "Privacy and security"</li>
                                    <li>Click "Cookies and other site data"</li>
                                    <li>Adjust your preferences</li>
                                </ol>
                            </div>

                            <div className="bg-white rounded-lg p-4">
                                <h4 className="font-bold text-gray-900 mb-2">Mozilla Firefox</h4>
                                <ol className="text-gray-600 text-sm list-decimal list-inside space-y-1">
                                    <li>Click the menu button and select "Settings"</li>
                                    <li>Select "Privacy & Security"</li>
                                    <li>Go to "Cookies and Site Data"</li>
                                    <li>Manage your preferences</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="mb-20">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-700 mb-6">
                            If you have any questions about our Cookie Policy or how we use cookies,
                            please contact our Data Protection Officer:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Email:</span> privacy@example.com
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Phone:</span> +1 (555) 123-4567
                            </p>
                            <p className="text-gray-700">
                                <span className="font-medium">Address:</span> 123 Privacy Lane, Suite 100, San Francisco, CA 94107
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Cookie Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
                                <p className="text-gray-600 text-sm mt-1">Manage your cookie settings</p>
                            </div>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Current Preferences</h3>
                                <div className="space-y-3">
                                    {cookieTypes.map((type) => (
                                        <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-3">{type.icon}</div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{type.name}</div>
                                                    <div className="text-gray-600 text-sm">{type.description}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                {type.mandatory ? (
                                                    <span className="text-blue-600 text-sm font-medium">Always Active</span>
                                                ) : (
                                                    <>
                                                        <span className={`text-sm ${cookiePreferences[type.id] ? 'text-green-600' : 'text-gray-400'}`}>
                                                            {cookiePreferences[type.id] ? 'On' : 'Off'}
                                                        </span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={cookiePreferences[type.id]}
                                                                onChange={(e) => handlePreferenceChange(type.id, e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button
                                        onClick={handleAcceptAll}
                                        className="bg-green-100 text-green-800 p-4 rounded-lg hover:bg-green-200 transition text-left"
                                    >
                                        <div className="font-bold mb-1">Accept All Cookies</div>
                                        <div className="text-sm">Enable all cookies for best experience</div>
                                    </button>
                                    <button
                                        onClick={handleRejectAll}
                                        className="bg-red-100 text-red-800 p-4 rounded-lg hover:bg-red-200 transition text-left"
                                    >
                                        <div className="font-bold mb-1">Reject Non-Essential</div>
                                        <div className="text-sm">Only essential cookies will be used</div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleSavePreferences}
                                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
                                >
                                    <FaSave className="mr-2" />
                                    Save Preferences
                                </button>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-2xl font-bold mb-2">Privacy First</div>
                            <p className="text-gray-400">Your privacy matters to us</p>
                        </div>

                        <div className="space-x-6">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="text-gray-400 hover:text-white transition"
                            >
                                Cookie Settings
                            </button>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                Terms of Service
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>© 2024 Privacy Protection Ltd. All rights reserved.</p>
                        <p className="mt-1">This cookie policy is compliant with GDPR, CCPA, and other privacy regulations.</p>
                    </div>
                </div>
            </footer>

            {/* Show cookie consent banner if consent not given */}
            {!consentGiven && <CookieConsentBanner />}
        </div>
    );
};

export default CookiePolicyPage;