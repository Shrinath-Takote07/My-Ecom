import React, { useState, useEffect } from 'react';

// FAQs Component
const FAQs = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [popularFaqs, setPopularFaqs] = useState([]);

    // FAQ categories
    const categories = [
        { id: 'all', name: 'All Questions', icon: '📋', count: 24 },
        { id: 'orders', name: 'Orders', icon: '📦', count: 8 },
        { id: 'shipping', name: 'Shipping', icon: '🚚', count: 6 },
        { id: 'returns', name: 'Returns', icon: '🔄', count: 5 },
        { id: 'account', name: 'Account', icon: '👤', count: 4 },
        { id: 'payments', name: 'Payments', icon: '💳', count: 4 },
        { id: 'products', name: 'Products', icon: '👕', count: 7 }
    ];

    // All FAQs data
    const allFaqs = [
        // Orders
        {
            id: 1,
            category: 'orders',
            question: 'How do I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email. You can also track your order by logging into your account and visiting the "Order History" section. For guest orders, use the tracking link sent to your email.',
            popular: true,
            views: 1250
        },
        {
            id: 2,
            category: 'orders',
            question: 'Can I modify or cancel my order?',
            answer: 'You can modify or cancel your order within 1 hour of placing it, as long as it hasn\'t been processed for shipping. Go to "Order History" in your account, select the order, and choose "Modify" or "Cancel". For assistance, contact our customer service.',
            popular: true,
            views: 980
        },
        {
            id: 3,
            category: 'orders',
            question: 'How do I place an order?',
            answer: 'To place an order: 1) Browse products and add items to your cart 2) Proceed to checkout 3) Enter shipping and billing information 4) Select payment method 5) Review and confirm your order. You\'ll receive an order confirmation email.',
            popular: false,
            views: 650
        },
        {
            id: 4,
            category: 'orders',
            question: 'What if I receive a damaged or incorrect item?',
            answer: 'If you receive a damaged or incorrect item, please contact our customer service within 48 hours of delivery. Provide photos of the damaged item or incorrect product, and we\'ll arrange a free return and replacement or refund.',
            popular: true,
            views: 1120
        },

        // Shipping
        {
            id: 5,
            category: 'shipping',
            question: 'What are your shipping options and costs?',
            answer: 'We offer: Standard Shipping ($4.99, 3-7 business days), Express Shipping ($9.99, 1-2 business days), and Next Day Delivery ($14.99). Free shipping is available on orders over $50. International shipping rates vary by destination.',
            popular: true,
            views: 1450
        },
        {
            id: 6,
            category: 'shipping',
            question: 'Do you ship internationally?',
            answer: 'Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-21 business days depending on the destination. Please note that international orders may be subject to customs duties and import taxes.',
            popular: false,
            views: 720
        },
        {
            id: 7,
            category: 'shipping',
            question: 'How long does shipping take?',
            answer: 'Standard shipping: 3-7 business days. Express shipping: 1-2 business days. Next day delivery: Order by 2 PM for next business day delivery. International shipping: 7-21 business days. Processing time is 1-2 business days before shipment.',
            popular: true,
            views: 1680
        },

        // Returns
        {
            id: 8,
            category: 'returns',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for most items in original condition with tags attached. Final sale items, personalized products, and intimate apparel cannot be returned. Returns are free for defective or incorrect items.',
            popular: true,
            views: 1320
        },
        {
            id: 9,
            category: 'returns',
            question: 'How do I return an item?',
            answer: '1) Go to "Order History" in your account 2) Select the item to return 3) Print the prepaid return label 4) Package the item securely 5) Drop off at any carrier location. You can track your return in your account.',
            popular: false,
            views: 890
        },
        {
            id: 10,
            category: 'returns',
            question: 'How long do refunds take?',
            answer: 'Once we receive your return, refunds are processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method: Credit cards: 3-10 business days, PayPal: 1-3 business days.',
            popular: true,
            views: 1050
        },

        // Account
        {
            id: 11,
            category: 'account',
            question: 'How do I reset my password?',
            answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link expires in 24 hours. If you don\'t receive the email, check your spam folder or contact customer service.',
            popular: true,
            views: 920
        },
        {
            id: 12,
            category: 'account',
            question: 'Can I change my account information?',
            answer: 'Yes, you can update your account information including email, password, shipping addresses, and payment methods in the "Account Settings" section. Changes to email require verification before they become active.',
            popular: false,
            views: 540
        },

        // Payments
        {
            id: 13,
            category: 'payments',
            question: 'What payment methods do you accept?',
            answer: 'We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, Google Pay, and ShopPay. We also accept gift cards and store credit. All payments are processed securely with encryption.',
            popular: true,
            views: 1100
        },
        {
            id: 14,
            category: 'payments',
            question: 'Is my payment information secure?',
            answer: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers. All payment processing is PCI-DSS compliant for maximum security.',
            popular: false,
            views: 780
        },

        // Products
        {
            id: 15,
            category: 'products',
            question: 'How do I find my correct size?',
            answer: 'Use our size guide available on each product page. We provide detailed measurements in inches and centimeters. For clothing, we recommend measuring yourself and comparing to our size chart. Check product reviews for sizing advice.',
            popular: true,
            views: 1560
        },
        {
            id: 16,
            category: 'products',
            question: 'Are your products ethically sourced?',
            answer: 'Yes, we are committed to ethical sourcing. All our suppliers adhere to our strict code of conduct regarding fair wages, safe working conditions, and environmental sustainability. We regularly audit our supply chain.',
            popular: false,
            views: 610
        },
        {
            id: 17,
            category: 'products',
            question: 'Do you offer gift wrapping?',
            answer: 'Yes, gift wrapping is available for $4.99 per item during checkout. You can include a personalized message that we\'ll print on a gift card. Gift-wrapped items are shipped in special packaging without price information.',
            popular: true,
            views: 830
        }
    ];

    // Contact options
    const contactOptions = [
        {
            title: 'Live Chat',
            description: 'Instant help from our team',
            icon: '💬',
            time: 'Available 24/7',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Email Us',
            description: 'Response within 24 hours',
            icon: '✉️',
            time: '24/7',
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'Call Us',
            description: 'Speak with an agent',
            icon: '📞',
            time: 'Mon-Fri, 9AM-9PM EST',
            color: 'from-purple-500 to-purple-600'
        }
    ];

    // Filter FAQs based on category and search
    useEffect(() => {
        let results = allFaqs;

        // Filter by category
        if (activeCategory !== 'all') {
            results = results.filter(faq => faq.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            results = results.filter(faq =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query)
            );
        }

        setFilteredFaqs(results);

        // Set popular FAQs (top 3 by views)
        const popular = [...allFaqs]
            .filter(faq => faq.popular)
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);

        setPopularFaqs(popular);
    }, [activeCategory, searchQuery]);

    // Toggle FAQ open/close
    const toggleFaq = (id) => {
        setOpenFaqIndex(openFaqIndex === id ? null : id);
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-24">
            {/* Header */}
            <header className="mb-6 pt-4">
                <div className="flex items-center mb-2">
                    <button className="mr-3 p-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                        ←
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">FAQs</h1>
                </div>
                <p className="text-gray-600">Find answers to common questions</p>
            </header>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full p-4 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-4 top-4 text-gray-400 text-lg">
                        🔍
                    </div>
                    {searchQuery && (
                        <button
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                            onClick={clearSearch}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {searchQuery && (
                    <div className="mt-2 text-sm text-gray-500">
                        {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
                    </div>
                )}
            </div>

            {/* Popular FAQs */}
            {!searchQuery && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <span className="mr-2">🔥</span> Popular Questions
                    </h2>

                    <div className="space-y-3">
                        {popularFaqs.map((faq) => (
                            <button
                                key={faq.id}
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full text-left bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors shadow-sm"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-gray-800 pr-4">{faq.question}</h3>
                                    <span className="text-gray-400 flex-shrink-0">
                                        {openFaqIndex === faq.id ? '−' : '+'}
                                    </span>
                                </div>

                                {openFaqIndex === faq.id && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <p className="text-gray-600">{faq.answer}</p>
                                        <div className="flex items-center mt-3 text-sm text-gray-500">
                                            <span className="mr-4">👁️ {faq.views.toLocaleString()} views</span>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                {categories.find(cat => cat.id === faq.category)?.name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Categories */}
            {!searchQuery && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Browse by Category</h2>

                    <div className="grid grid-cols-2 gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${activeCategory === category.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                <span className="text-2xl mb-2">{category.icon}</span>
                                <span className="font-medium text-gray-800 text-center">{category.name}</span>
                                <span className="mt-2 text-sm text-gray-500">{category.count} questions</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQs List */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        {searchQuery ? 'Search Results' : activeCategory === 'all' ? 'All Questions' : `${categories.find(cat => cat.id === activeCategory)?.name} Questions`}
                    </h2>
                    <span className="text-sm text-gray-500">{filteredFaqs.length} questions</span>
                </div>

                {filteredFaqs.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="font-medium text-gray-800 mb-2">No questions found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery
                                ? `No results for "${searchQuery}". Try a different search term.`
                                : `No questions in this category.`
                            }
                        </p>
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                            >
                                <button
                                    className="w-full text-left p-4"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="pr-4">
                                            <h3 className="font-medium text-gray-800 mb-1">{faq.question}</h3>
                                            <div className="flex items-center">
                                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded mr-2">
                                                    {categories.find(cat => cat.id === faq.category)?.name}
                                                </span>
                                                {faq.popular && (
                                                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded flex items-center">
                                                        <span className="mr-1">🔥</span> Popular
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-400 flex-shrink-0">
                                            {openFaqIndex === faq.id ? '−' : '+'}
                                        </span>
                                    </div>
                                </button>

                                {openFaqIndex === faq.id && (
                                    <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                                        <p className="text-gray-600 mb-4">{faq.answer}</p>

                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <span className="mr-4">👁️ {faq.views.toLocaleString()} views</span>
                                                <span className="flex items-center">
                                                    <span className="mr-1">👍</span> Was this helpful?
                                                </span>
                                            </div>
                                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                                Share
                                            </button>
                                        </div>

                                        <div className="flex space-x-2 mt-4">
                                            <button className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                                👍 Yes
                                            </button>
                                            <button className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                                👎 No
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Still Need Help Section */}
            {!searchQuery && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Still need help?</h2>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 text-white">
                        <h3 className="text-xl font-bold mb-2">We're here for you</h3>
                        <p className="text-gray-300 mb-5">Can't find what you're looking for? Contact our support team.</p>

                        <div className="space-y-3">
                            {contactOptions.map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full p-4 rounded-lg bg-gradient-to-r ${option.color} text-white flex items-center justify-between hover:opacity-90 transition-opacity`}
                                >
                                    <div className="flex items-center">
                                        <span className="text-xl mr-3">{option.icon}</span>
                                        <div className="text-left">
                                            <div className="font-medium">{option.title}</div>
                                            <div className="text-sm opacity-90">{option.description}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm opacity-90">{option.time}</div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-gray-700">
                            <p className="text-gray-300 text-sm">
                                <span className="font-medium">Business Hours:</span> Monday-Friday 9:00 AM - 9:00 PM EST, Saturday-Sunday 10:00 AM - 6:00 PM EST
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Helpful Resources */}
            {!searchQuery && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Helpful Resources</h2>

                    <div className="grid grid-cols-2 gap-3">
                        <a href="#" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="text-2xl mb-3">📦</div>
                            <h3 className="font-medium text-gray-800 mb-1">Shipping Policy</h3>
                            <p className="text-gray-600 text-xs">Delivery times, costs, and tracking</p>
                        </a>

                        <a href="#" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="text-2xl mb-3">🔄</div>
                            <h3 className="font-medium text-gray-800 mb-1">Return Policy</h3>
                            <p className="text-gray-600 text-xs">How to return items and get refunds</p>
                        </a>

                        <a href="#" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="text-2xl mb-3">📏</div>
                            <h3 className="font-medium text-gray-800 mb-1">Size Guide</h3>
                            <p className="text-gray-600 text-xs">Find your perfect fit</p>
                        </a>

                        <a href="#" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="text-2xl mb-3">📱</div>
                            <h3 className="font-medium text-gray-800 mb-1">App Help</h3>
                            <p className="text-gray-600 text-xs">Using our mobile app</p>
                        </a>
                    </div>
                </section>
            )}

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-20 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
                ↑
            </button>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            <FAQs />
        </div>
    );
};

export default FAQs;