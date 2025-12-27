import React, { useState } from 'react';

// Shipping Policy Component
const Policy = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // Shipping methods data
    const shippingMethods = [
        {
            name: 'Standard Shipping',
            price: '$4.99',
            delivery: '3-7 business days',
            description: 'Our most economical option for domestic shipping',
            icon: '🚚',
            color: 'bg-blue-50'
        },
        {
            name: 'Express Shipping',
            price: '$9.99',
            delivery: '1-2 business days',
            description: 'Faster delivery for urgent orders',
            icon: '⚡',
            color: 'bg-green-50'
        },
        {
            name: 'Next Day Delivery',
            price: '$14.99',
            delivery: 'Next business day',
            description: 'Guaranteed delivery by the next business day',
            icon: '🚀',
            color: 'bg-purple-50'
        },
        {
            name: 'International Shipping',
            price: 'Varies by destination',
            delivery: '7-21 business days',
            description: 'Worldwide shipping with tracking',
            icon: '🌍',
            color: 'bg-yellow-50'
        }
    ];

    // Shipping FAQ data
    const shippingFaqs = [
        {
            question: 'How do I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email. You can track your order by clicking the tracking link in your email or by logging into your account and visiting the "Order History" section.',
            icon: '📊'
        },
        {
            question: 'Can I change my shipping address after ordering?',
            answer: 'Yes, but only if your order hasn\'t been shipped yet. Contact our customer service immediately with your order number and the updated address. For orders that have already shipped, we cannot change the delivery address.',
            icon: '📍'
        },
        {
            question: 'Do you ship to PO Boxes?',
            answer: 'Yes, we ship to PO Boxes via standard shipping. However, expedited shipping options are not available for PO Box addresses due to carrier restrictions.',
            icon: '📮'
        },
        {
            question: 'What happens if I\'m not home for delivery?',
            answer: 'The carrier will leave a delivery attempt notice. You can either pick up the package from your local post office or schedule a redelivery. For high-value items requiring signature, the carrier will make multiple attempts.',
            icon: '🏠'
        },
        {
            question: 'Are there any shipping restrictions?',
            answer: 'Yes, we cannot ship certain items internationally due to customs regulations. Hazardous materials, perishable goods, and items restricted by local laws may have shipping limitations. Check product pages for specific restrictions.',
            icon: '⚠️'
        }
    ];

    // International shipping details
    const internationalShipping = [
        { region: 'Canada', time: '7-10 business days', cost: '$12.99' },
        { region: 'Europe', time: '10-14 business days', cost: '$15.99' },
        { region: 'Australia/NZ', time: '12-16 business days', cost: '$18.99' },
        { region: 'Asia', time: '14-21 business days', cost: '$20.99' },
        { region: 'South America', time: '15-21 business days', cost: '$22.99' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-20">
            {/* Header */}
            <header className="mb-6 pt-4">
                <div className="flex items-center mb-2">
                    <button className="mr-3 p-2 rounded-lg bg-white border border-gray-200">
                        ←
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Shipping Policy</h1>
                </div>
                <p className="text-gray-600">Information about our shipping methods, delivery times, and policies</p>
            </header>

            {/* Quick Summary Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 text-white mb-6 shadow-lg">
                <div className="flex items-start">
                    <div className="text-3xl mr-4">📦</div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Fast & Reliable Delivery</h2>
                        <p className="text-blue-100 mb-3">Free shipping on orders over $50. Most orders ship within 24 hours.</p>
                        <div className="flex items-center text-sm">
                            <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-medium mr-3">📅 1-7 Days</span>
                            <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-medium">🚚 Free Over $50</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Methods */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🚚</span> Shipping Methods
                </h2>
                <div className="space-y-4">
                    {shippingMethods.map((method, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-xl border ${method.color} border-gray-200`}
                        >
                            <div className="flex items-start">
                                <div className="text-2xl mr-4">{method.icon}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-800">{method.name}</h3>
                                        <span className="font-bold text-gray-800">{method.price}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                                    <div className="flex items-center text-gray-700 text-sm">
                                        <span className="mr-3">📅 {method.delivery}</span>
                                        {method.name === 'Standard Shipping' && (
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                                Most Popular
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Delivery Timeline */}
            <section className="mb-8 bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">⏱️</span> Order Processing & Delivery Timeline
                </h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                    {/* Timeline steps */}
                    <div className="space-y-8 relative">
                        {[
                            { step: 1, title: 'Order Placed', time: 'Immediately', icon: '✅', desc: 'Order confirmation sent' },
                            { step: 2, title: 'Order Processing', time: 'Within 24 hours', icon: '📋', desc: 'Inventory check & preparation' },
                            { step: 3, title: 'Order Shipped', time: '1-2 business days', icon: '🚚', desc: 'Tracking number provided' },
                            { step: 4, title: 'In Transit', time: '1-7 business days', icon: '✈️', desc: 'Depending on shipping method' },
                            { step: 5, title: 'Delivered', time: 'Varies', icon: '🏠', desc: 'Package arrives at destination' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center text-blue-600 font-bold relative z-10">
                                    {item.icon}
                                </div>
                                <div className="ml-4">
                                    <div className="flex items-center">
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <span className="ml-3 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* International Shipping */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🌍</span> International Shipping
                </h2>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
                        <p className="text-gray-600 text-sm mb-4">
                            We ship to over 50 countries worldwide. International orders may be subject to customs duties and import taxes.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Region</th>
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Delivery Time</th>
                                        <th className="py-3 px-4 text-left font-medium text-gray-700">Starting From</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {internationalShipping.map((item, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="py-3 px-4 font-medium text-gray-800">{item.region}</td>
                                            <td className="py-3 px-4 text-gray-700">{item.time}</td>
                                            <td className="py-3 px-4 text-gray-700 font-medium">{item.cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex">
                                <span className="text-yellow-600 mr-2">⚠️</span>
                                <p className="text-yellow-800 text-sm">
                                    International customers are responsible for any customs duties, taxes, or import fees charged by their country.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shipping FAQs */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">❓</span> Frequently Asked Questions
                </h2>

                <div className="space-y-3">
                    {shippingFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                className="flex justify-between items-center w-full p-4 text-left"
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="flex items-start">
                                    <span className="text-xl mr-3">{faq.icon}</span>
                                    <h3 className="font-medium text-gray-800">{faq.question}</h3>
                                </div>
                                <span className="text-gray-500 ml-2 flex-shrink-0">
                                    {activeAccordion === index ? '−' : '+'}
                                </span>
                            </button>

                            {activeAccordion === index && (
                                <div className="px-4 pb-4 ml-11">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Important Notes */}
            <section className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Important Information</h2>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex">
                            <span className="text-red-500 mr-3">📌</span>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-1">Holiday Shipping</h3>
                                <p className="text-gray-600 text-sm">
                                    During peak holiday seasons (November-December), delivery times may be extended by 2-5 business days. Order early to ensure holiday delivery.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex">
                            <span className="text-green-500 mr-3">📦</span>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-1">Free Shipping Threshold</h3>
                                <p className="text-gray-600 text-sm">
                                    Free standard shipping is automatically applied to orders of $50 or more before taxes and after discounts. Applies to domestic orders only.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex">
                            <span className="text-blue-500 mr-3">🏪</span>
                            <div>
                                <h3 className="font-medium text-gray-800 mb-1">In-Store Pickup</h3>
                                <p className="text-gray-600 text-sm">
                                    Select "Store Pickup" at checkout to pick up your order at a nearby store. You'll be notified when your order is ready for pickup (usually within 2 hours).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 text-white">
                <h2 className="text-xl font-bold mb-3">Need Help with Shipping?</h2>
                <p className="text-gray-300 mb-4">Our customer service team is here to help with any shipping questions or concerns.</p>

                <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                        <span className="mr-2">💬</span> Live Chat
                    </button>
                    <button className="flex-1 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                        <span className="mr-2">📞</span> Call Us
                    </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 text-sm">
                        <strong>Customer Service Hours:</strong> Mon-Fri 9am-9pm EST, Sat-Sun 10am-6pm EST
                    </p>
                </div>
            </section>

            {/* Last Updated */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-center text-gray-500 text-sm">
                    Last updated: December 5, 2023
                </p>
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            <ShippingPolicy />
        </div>
    );
};

export default Policy;