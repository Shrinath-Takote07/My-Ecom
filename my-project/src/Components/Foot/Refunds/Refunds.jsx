import React, { useState } from 'react';

const Refunds = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showFAQ, setShowFAQ] = useState(null);

    const steps = [
        {
            title: "Request Return",
            description: "Initiate return within 30 days",
            icon: "📱"
        },
        {
            title: "Package Item",
            description: "Use original packaging",
            icon: "📦"
        },
        {
            title: "Ship Back",
            description: "Use provided shipping label",
            icon: "🚚"
        },
        {
            title: "Refund Processed",
            description: "Refund in 5-7 business days",
            icon: "💳"
        }
    ];

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We accept returns within 30 days of purchase. Items must be unused, in original packaging with all tags attached."
        },
        {
            question: "How long does a refund take?",
            answer: "Refunds are processed within 5-7 business days after we receive your return. It may take additional time for your bank to process."
        },
        {
            question: "Do you offer free returns?",
            answer: "Yes, we provide free return shipping for all orders within the United States."
        },
        {
            question: "Can I exchange an item?",
            answer: "Yes, you can request an exchange during the return process. We'll ship the new item once we receive your return."
        },
        {
            question: "What items cannot be returned?",
            answer: "Personalized items, underwear, swimwear, and final sale items marked 'non-returnable' cannot be returned."
        }
    ];

    const policyPoints = [
        "30-day return window from delivery date",
        "Free return shipping in the US",
        "Items must be unworn and unwashed",
        "Original tags must be attached",
        "Refunds issued to original payment method"
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Returns & Refunds</h1>
                <p className="text-gray-600">Easy and hassle-free returns process</p>
            </header>

            {/* Return Status Banner */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <span className="text-blue-600 text-xl">📦</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Track Your Return</h3>
                        <p className="text-sm text-gray-600">Check status of your return request</p>
                    </div>
                    <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Track Now
                    </button>
                </div>
            </div>

            {/* Return Process Steps */}
            <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Return Process</h2>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-3 rounded-lg ${activeStep === index ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${activeStep === index ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                    <span className="text-lg">{step.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-semibold ${activeStep === index ? 'text-blue-700' : 'text-gray-900'}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeStep === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    {index + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Highlights */}
            <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Return Policy Highlights</h2>
                <div className="bg-white rounded-lg shadow-sm p-5">
                    <ul className="space-y-3">
                        {policyPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                    <span className="text-green-600 text-sm">✓</span>
                                </div>
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Start Return Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg md:static md:p-0 md:bg-transparent md:border-0 md:shadow-none">
                <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-blue-700 transition">
                        Start a Return
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold text-center hover:bg-gray-50 transition">
                        Contact Support
                    </button>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="mb-8 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <button
                                className="w-full p-4 text-left flex justify-between items-center"
                                onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                            >
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                <span className="text-gray-400">
                                    {showFAQ === index ? '−' : '+'}
                                </span>
                            </button>
                            {showFAQ === index && (
                                <div className="px-4 pb-4">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Info */}
            <section className="mt-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
                    <h3 className="font-bold text-gray-900 mb-2">Need More Help?</h3>
                    <p className="text-gray-600 mb-4">Our customer support team is here to help</p>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <span className="text-gray-400 mr-3">📧</span>
                            <span className="text-gray-700">support@example.com</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-400 mr-3">📞</span>
                            <span className="text-gray-700">1-800-RETURNS</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-400 mr-3">🕒</span>
                            <span className="text-gray-700">Mon-Fri: 9AM-6PM EST</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Refunds;