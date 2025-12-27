import React, { useState } from 'react';

// Help Center Component
const Helpc = () => {
    const [activeSection, setActiveSection] = useState('faq');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // FAQ data
    const faqSections = [
        {
            title: 'Orders & Shipping',
            icon: '📦',
            faqs: [
                {
                    question: 'How long does shipping take?',
                    answer: 'Standard shipping takes 3-7 business days. Express shipping is available for delivery within 1-2 business days. International shipping typically takes 7-14 business days depending on the destination.'
                },
                {
                    question: 'Can I track my order?',
                    answer: 'Yes, once your order is shipped, you will receive a tracking number via email. You can also track your order by logging into your account and visiting the "Order History" section.'
                },
                {
                    question: 'What if my order hasn\'t arrived?',
                    answer: 'If your order hasn\'t arrived within the estimated delivery time, please contact our customer support team with your order number. We\'ll investigate the issue and provide assistance.'
                }
            ]
        },
        {
            title: 'Returns & Refunds',
            icon: '🔄',
            faqs: [
                {
                    question: 'What is your return policy?',
                    answer: 'We offer a 30-day return policy for most items. Items must be unused, in their original packaging, and with all tags attached. Some exclusions apply for perishable or personalized items.'
                },
                {
                    question: 'How long do refunds take?',
                    answer: 'Once we receive your returned item, refunds are processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and bank.'
                },
                {
                    question: 'Who pays for return shipping?',
                    answer: 'We provide free return shipping for defective or incorrect items. For other returns, customers are responsible for return shipping costs unless you choose our premium return option at checkout.'
                }
            ]
        },
        {
            title: 'Account & Security',
            icon: '🔐',
            faqs: [
                {
                    question: 'How do I reset my password?',
                    answer: 'Click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password. The link expires in 24 hours for security.'
                },
                {
                    question: 'Is my payment information secure?',
                    answer: 'Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details on our servers and use PCI-compliant payment processors.'
                },
                {
                    question: 'Can I change my account email?',
                    answer: 'Yes, you can change your email address in the "Account Settings" section. You\'ll need to verify the new email address before it becomes active for your account.'
                }
            ]
        },
        {
            title: 'Products & Sizing',
            icon: '👕',
            faqs: [
                {
                    question: 'How do I find my correct size?',
                    answer: 'Check our detailed sizing guide available on each product page. We provide measurements in inches and centimeters. If you\'re between sizes, we recommend sizing up for a more comfortable fit.'
                },
                {
                    question: 'Are your products ethically sourced?',
                    answer: 'Yes, we\'re committed to ethical sourcing. All our suppliers adhere to our strict code of conduct regarding fair wages, safe working conditions, and sustainable practices.'
                },
                {
                    question: 'Do you offer gift wrapping?',
                    answer: 'Yes, gift wrapping is available during checkout for $4.99. You can also include a personalized message that we\'ll print on a gift card included with your order.'
                }
            ]
        }
    ];

    // Contact options
    const contactOptions = [
        {
            title: 'Live Chat',
            description: 'Chat with our support team',
            icon: '💬',
            availability: 'Available 24/7',
            actionText: 'Start Chat',
            color: 'bg-blue-50 border-blue-200'
        },
        {
            title: 'Email Support',
            description: 'Get help via email',
            icon: '✉️',
            availability: 'Response within 24 hours',
            actionText: 'Send Email',
            color: 'bg-green-50 border-green-200'
        },
        {
            title: 'Phone Support',
            description: 'Call our support team',
            icon: '📞',
            availability: 'Mon-Fri, 9AM-6PM EST',
            actionText: 'Call Now',
            color: 'bg-purple-50 border-purple-200'
        },
        {
            title: 'Help Center',
            description: 'Browse our articles',
            icon: '📚',
            availability: 'Always available',
            actionText: 'Browse Articles',
            color: 'bg-yellow-50 border-yellow-200'
        }
    ];

    // Help topics
    const helpTopics = [
        { title: 'Order Status', icon: '📊', link: '#order-status' },
        { title: 'Shipping Info', icon: '🚚', link: '#shipping' },
        { title: 'Returns', icon: '🔄', link: '#returns' },
        { title: 'Payment Methods', icon: '💳', link: '#payment' },
        { title: 'Gift Cards', icon: '🎁', link: '#gift-cards' },
        { title: 'Product Care', icon: '👕', link: '#product-care' },
        { title: 'Size Guide', icon: '📏', link: '#size-guide' },
        { title: 'Store Locator', icon: '📍', link: '#store-locator' }
    ];

    // Filter FAQs based on search query
    const filteredFaqSections = faqSections.map(section => {
        if (!searchQuery.trim()) return section;

        const filteredFaqs = section.faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return { ...section, faqs: filteredFaqs };
    }).filter(section => section.faqs.length > 0);

    // Toggle FAQ open/close
    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
                <p className="text-gray-600 mt-1">How can we help you today?</p>
            </header>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for help topics..."
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-3 top-3 text-gray-400">
                        🔍
                    </div>
                    {searchQuery && (
                        <button
                            className="absolute right-3 top-3 text-gray-400"
                            onClick={() => setSearchQuery('')}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Help Topics */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Help Topics</h2>
                <div className="grid grid-cols-2 gap-3">
                    {helpTopics.map((topic, index) => (
                        <a
                            key={index}
                            href={topic.link}
                            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-2xl mb-2">{topic.icon}</span>
                            <span className="text-sm text-center text-gray-700">{topic.title}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex mb-6 overflow-x-auto">
                <button
                    className={`flex-1 py-3 text-center font-medium border-b-2 ${activeSection === 'faq' ? 'border-blue-500 text-blue-600' : 'border-gray-200 text-gray-500'}`}
                    onClick={() => setActiveSection('faq')}
                >
                    FAQ
                </button>
                <button
                    className={`flex-1 py-3 text-center font-medium border-b-2 ${activeSection === 'contact' ? 'border-blue-500 text-blue-600' : 'border-gray-200 text-gray-500'}`}
                    onClick={() => setActiveSection('contact')}
                >
                    Contact Us
                </button>
                <button
                    className={`flex-1 py-3 text-center font-medium border-b-2 ${activeSection === 'resources' ? 'border-blue-500 text-blue-600' : 'border-gray-200 text-gray-500'}`}
                    onClick={() => setActiveSection('resources')}
                >
                    Resources
                </button>
            </div>

            {/* FAQ Section */}
            {activeSection === 'faq' && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>

                    {filteredFaqSections.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">🔍</div>
                            <p className="text-gray-600">No results found for "{searchQuery}"</p>
                            <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqSections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="flex items-center p-4 bg-gray-50">
                                        <span className="text-xl mr-3">{section.icon}</span>
                                        <h3 className="font-medium text-gray-800">{section.title}</h3>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {section.faqs.map((faq, faqIndex) => {
                                            const index = `${sectionIndex}-${faqIndex}`;
                                            return (
                                                <div key={faqIndex} className="p-4">
                                                    <button
                                                        className="flex justify-between items-center w-full text-left"
                                                        onClick={() => toggleFaq(index)}
                                                    >
                                                        <span className="font-medium text-gray-800 pr-2">{faq.question}</span>
                                                        <span className="text-gray-500 flex-shrink-0">
                                                            {openFaqIndex === index ? '−' : '+'}
                                                        </span>
                                                    </button>
                                                    {openFaqIndex === index && (
                                                        <div className="mt-3 text-gray-600">
                                                            {faq.answer}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Contact Section */}
            {activeSection === 'contact' && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Options</h2>
                    <div className="space-y-4">
                        {contactOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg border ${option.color}`}
                            >
                                <div className="flex items-start">
                                    <div className="text-2xl mr-4">{option.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800">{option.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                                        <p className="text-gray-500 text-xs mt-2">{option.availability}</p>
                                    </div>
                                </div>
                                <button className="mt-4 w-full py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                    {option.actionText}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-800 mb-2">Need more help?</h3>
                        <p className="text-gray-600 text-sm mb-4">Check out our community forums or submit a support ticket.</p>
                        <div className="flex space-x-3">
                            <button className="flex-1 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                                Visit Forums
                            </button>
                            <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">
                                Submit Ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resources Section */}
            {activeSection === 'resources' && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Help Resources</h2>

                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                        <div className="flex items-start">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <span className="text-blue-600 text-xl">📖</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">User Guides</h3>
                                <p className="text-gray-600 text-sm mt-1">Detailed guides on using our platform</p>
                                <button className="mt-3 text-blue-600 text-sm font-medium">Browse Guides →</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                        <div className="flex items-start">
                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                <span className="text-green-600 text-xl">🎥</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">Video Tutorials</h3>
                                <p className="text-gray-600 text-sm mt-1">Step-by-step video tutorials</p>
                                <button className="mt-3 text-blue-600 text-sm font-medium">Watch Videos →</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start">
                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                <span className="text-purple-600 text-xl">📰</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">Blog & Updates</h3>
                                <p className="text-gray-600 text-sm mt-1">Latest news and product updates</p>
                                <button className="mt-3 text-blue-600 text-sm font-medium">Read Articles →</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-10 pt-6 border-t border-gray-200">
                <div className="text-center text-gray-500 text-sm">
                    <p>© 2023 ShopEasy. All rights reserved.</p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            <HelpCenter />
        </div>
    );
};

export default Helpc;