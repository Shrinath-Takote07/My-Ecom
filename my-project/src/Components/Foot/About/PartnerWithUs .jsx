import React, { useState } from 'react';

// Partner With Us Component
const PartnerWithUs = () => {
    const [activePartnership, setActivePartnership] = useState('affiliate');
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [applicationType, setApplicationType] = useState('');

    // Partnership types
    const partnershipTypes = [
        {
            id: 'affiliate',
            name: 'Affiliate Program',
            icon: '🤝',
            description: 'Earn commissions by promoting our products',
            commission: 'Up to 20% commission',
            requirements: ['Website/Blog', 'Social Media Following', 'Quality Content'],
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'influencer',
            name: 'Influencer Program',
            icon: '🌟',
            description: 'Collaborate with us as a content creator',
            commission: 'Free products + commission',
            requirements: ['5K+ Followers', 'Engaged Audience', 'Quality Content'],
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'brand',
            name: 'Brand Partnership',
            icon: '🏢',
            description: 'Collaborate on product development',
            commission: 'Revenue sharing',
            requirements: ['Established Brand', 'Shared Values', 'Quality Products'],
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'wholesale',
            name: 'Wholesale',
            icon: '📦',
            description: 'Bulk purchases for retail stores',
            commission: 'Wholesale discounts',
            requirements: ['Business License', 'Retail Space/Website', 'Tax ID'],
            color: 'from-orange-500 to-orange-600'
        },
        {
            id: 'developer',
            name: 'Developer API',
            icon: '💻',
            description: 'Integrate with our platform',
            commission: 'Technical collaboration',
            requirements: ['Technical Skills', 'API Experience', 'Project Plan'],
            color: 'from-indigo-500 to-indigo-600'
        },
        {
            id: 'ambassador',
            name: 'Campus Ambassador',
            icon: '🎓',
            description: 'Represent us on your campus',
            commission: 'Exclusive perks + stipend',
            requirements: ['College Student', 'Campus Involvement', 'Leadership Skills'],
            color: 'from-pink-500 to-pink-600'
        }
    ];

    // Benefits
    const benefits = [
        {
            title: 'Competitive Commissions',
            description: 'Earn some of the highest rates in the industry',
            icon: '💰'
        },
        {
            title: 'Dedicated Support',
            description: 'Get personalized support from our partnership team',
            icon: '👥'
        },
        {
            title: 'Marketing Resources',
            description: 'Access banners, links, and promotional materials',
            icon: '🎨'
        },
        {
            title: 'Real-time Analytics',
            description: 'Track performance with detailed dashboards',
            icon: '📊'
        },
        {
            title: 'Early Access',
            description: 'Get early access to new products and features',
            icon: '🚀'
        },
        {
            title: 'Exclusive Deals',
            description: 'Special promotions for your audience',
            icon: '🎁'
        }
    ];

    // Success stories
    const successStories = [
        {
            name: 'Sarah Chen',
            role: 'Fashion Blogger',
            partnership: 'Affiliate',
            story: 'Earned $15,000 in commissions last quarter by sharing authentic product reviews.',
            avatar: '👩'
        },
        {
            name: 'TechGear Reviews',
            role: 'YouTube Channel',
            partnership: 'Influencer',
            story: 'Grew their audience by 40% through our collaborative product launches.',
            avatar: '📹'
        },
        {
            name: 'Boutique Collective',
            role: 'Retail Store',
            partnership: 'Wholesale',
            story: 'Increased store revenue by 25% carrying our exclusive product line.',
            avatar: '🏪'
        }
    ];

    // FAQ
    const faqs = [
        {
            question: 'How do I get paid?',
            answer: 'We pay via PayPal, bank transfer, or check on a monthly basis. Minimum payout is $50 for affiliates.',
            category: 'payment'
        },
        {
            question: 'What commission rates do you offer?',
            answer: 'Commission rates vary by partnership type. Affiliates earn 5-20% depending on performance. Influencers receive free products plus 10% commission.',
            category: 'commission'
        },
        {
            question: 'How long does approval take?',
            answer: 'Most applications are reviewed within 3-5 business days. Some partnerships may require additional vetting.',
            category: 'application'
        },
        {
            question: 'Can I promote multiple partnership types?',
            answer: 'Yes! Many partners participate in multiple programs. You\'ll have one dashboard for all your partnerships.',
            category: 'general'
        },
        {
            question: 'Is there a cost to join?',
            answer: 'No, joining our partnership programs is completely free. We only ask for quality promotion.',
            category: 'general'
        }
    ];

    // Get active partnership details
    const activeDetails = partnershipTypes.find(p => p.id === activePartnership);

    // Application form component
    const ApplicationForm = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-md w-full my-8">
                <div className="p-6">
                    {/* Form header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Apply for {activeDetails?.name}</h3>
                            <p className="text-gray-600 text-sm">Step {formStep} of 3</p>
                        </div>
                        <button
                            onClick={() => {
                                setShowApplicationForm(false);
                                setFormStep(1);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <span className={`text-sm ${formStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                                Personal Info
                            </span>
                            <span className={`text-sm ${formStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                                Business Details
                            </span>
                            <span className={`text-sm ${formStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                                Submit
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${(formStep / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Form steps */}
                    {formStep === 1 && (
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-800 mb-4">Tell us about yourself</h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="(123) 456-7890"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Select country</option>
                                    <option value="us">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="ca">Canada</option>
                                    <option value="au">Australia</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setFormStep(2)}
                                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-6"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-800 mb-4">Business Information</h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website/Blog URL</label>
                                <input
                                    type="url"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Handles</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="@username (Instagram, YouTube, etc.)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Audience Reach</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Select range</option>
                                    <option value="1k">1,000 - 10,000</option>
                                    <option value="10k">10,000 - 50,000</option>
                                    <option value="50k">50,000 - 100,000</option>
                                    <option value="100k">100,000 - 500,000</option>
                                    <option value="500k">500,000+</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to partner with us? *</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Tell us about your audience and how you plan to promote our products..."
                                    required
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setFormStep(1)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setFormStep(3)}
                                    className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {formStep === 3 && (
                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-800 mb-4">Review and Submit</h4>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-800 mb-2">Application Summary</h5>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-medium">Program:</span> {activeDetails?.name}</p>
                                    <p><span className="font-medium">Commission:</span> {activeDetails?.commission}</p>
                                    <p className="mt-3">You'll hear back from our team within 3-5 business days.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 mr-2"
                                    required
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the Partnership Agreement and acknowledge that I have read the Privacy Policy.
                                </label>
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="updates"
                                    className="mt-1 mr-2"
                                />
                                <label htmlFor="updates" className="text-sm text-gray-600">
                                    I want to receive updates about new partnership opportunities and tips.
                                </label>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    onClick={() => setFormStep(2)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => {
                                        setShowApplicationForm(false);
                                        setFormStep(1);
                                        // In real app, submit form data here
                                    }}
                                    className="flex-1 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold mb-3">Partner With Us</h1>
                    <p className="text-blue-100 mb-4">
                        Join our growing network of partners and earn while helping others discover amazing products.
                    </p>

                    <div className="flex items-center space-x-2 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full">3,000+ Partners</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">$2M+ Paid Out</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">95% Satisfaction</span>
                    </div>
                </div>
            </section>

            <div className="p-4 pb-24">
                {/* Partnership Types */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Partnership</h2>

                    <div className="grid grid-cols-2 gap-3">
                        {partnershipTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setActivePartnership(type.id)}
                                className={`bg-white p-4 rounded-xl border-2 text-left transition-all ${activePartnership === type.id
                                        ? 'border-blue-500 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start mb-3">
                                    <span className="text-2xl mr-3">{type.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm">{type.name}</h3>
                                        <p className="text-gray-600 text-xs mt-1">{type.description}</p>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-800">{type.commission}</div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Active Partnership Details */}
                <section className="mb-8">
                    <div className={`bg-gradient-to-r ${activeDetails?.color} rounded-xl p-5 text-white mb-4`}>
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-3">{activeDetails?.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold">{activeDetails?.name}</h3>
                                <p className="opacity-90">{activeDetails?.description}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium mb-2">Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                                {activeDetails?.requirements.map((req, index) => (
                                    <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowApplicationForm(true)}
                            className="w-full py-3 bg-white text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Apply Now
                        </button>
                    </div>

                    {/* Program Highlights */}
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-3">Program Highlights</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">30-day cookie duration</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">Real-time tracking dashboard</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">Monthly performance bonuses</span>
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">Dedicated account manager</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Partner With Us?</h2>

                    <div className="grid grid-cols-2 gap-3">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                                <div className="text-2xl mb-2">{benefit.icon}</div>
                                <h3 className="font-bold text-gray-800 text-sm mb-1">{benefit.title}</h3>
                                <p className="text-gray-600 text-xs">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Success Stories */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Partner Success Stories</h2>

                    <div className="space-y-4">
                        {successStories.map((story, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                                <div className="flex items-start">
                                    <div className="text-2xl mr-3">{story.avatar}</div>
                                    <div>
                                        <div className="flex items-center">
                                            <h3 className="font-bold text-gray-800">{story.name}</h3>
                                            <span className="ml-2 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                                {story.partnership}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">{story.role}</p>
                                        <p className="text-gray-700 text-sm italic">"{story.story}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-gray-800 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 text-white">
                        <h3 className="text-xl font-bold mb-4">Partnership Program Stats</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-1">3,250+</div>
                                <div className="text-gray-300 text-sm">Active Partners</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-1">$2.1M+</div>
                                <div className="text-gray-300 text-sm">Commissions Paid</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-1">45%</div>
                                <div className="text-gray-300 text-sm">Average Growth</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-1">24h</div>
                                <div className="text-gray-300 text-sm">Support Response</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Get Started?</h3>
                    <p className="text-gray-600 mb-6">Join thousands of successful partners today.</p>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowApplicationForm(true)}
                            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Apply Now
                        </button>
                        <button className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            Download Media Kit
                        </button>
                    </div>
                </section>

                {/* Application Form Modal */}
                {showApplicationForm && <ApplicationForm />}
            </div>

            {/* Fixed Contact Info */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Questions?</p>
                            <p className="text-sm text-gray-600">Contact our partnership team</p>
                        </div>
                        <a
                            href="mailto:partners@example.com"
                            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main App Component
// const App = () => {
//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen">
//       <PartnerWithUs />
//     </div>
//   );
// };

export default PartnerWithUs;