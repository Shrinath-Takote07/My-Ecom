import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [selectedTopic, setSelectedTopic] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            alert('Message sent successfully! We\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setSelectedTopic('');
            setIsSubmitting(false);
        }, 1500);
    };

    const contactTopics = [
        { id: 'order', label: 'Order Issues', icon: '📦' },
        { id: 'returns', label: 'Returns & Refunds', icon: '↩️' },
        { id: 'account', label: 'Account Help', icon: '👤' },
        { id: 'technical', label: 'Technical Support', icon: '💻' },
        { id: 'billing', label: 'Billing Questions', icon: '💰' },
        { id: 'feedback', label: 'Feedback', icon: '💬' },
    ];

    const contactInfo = [
        {
            icon: <FaPhone className="text-blue-600" />,
            title: 'Call Us',
            details: ['+1 (800) 123-4567', '+1 (800) 987-6543'],
            description: 'Available 24/7 for urgent matters',
            action: 'Call Now'
        },
        {
            icon: <FaEnvelope className="text-green-600" />,
            title: 'Email Us',
            details: ['support@example.com', 'sales@example.com'],
            description: 'Response within 24 hours',
            action: 'Send Email'
        },
        {
            icon: <FaMapMarkerAlt className="text-red-600" />,
            title: 'Visit Us',
            details: ['123 Business Street', 'Suite 100, New York, NY 10001'],
            description: 'By appointment only',
            action: 'Get Directions'
        },
        {
            icon: <FaClock className="text-purple-600" />,
            title: 'Business Hours',
            details: ['Mon-Fri: 9AM-6PM EST', 'Sat: 10AM-4PM EST', 'Sun: Closed'],
            description: 'Emergency support available',
            action: 'Schedule Call'
        }
    ];

    const socialLinks = [
        { icon: <FaFacebook />, name: 'Facebook', color: 'bg-blue-600', handle: '@example' },
        { icon: <FaTwitter />, name: 'Twitter', color: 'bg-sky-500', handle: '@examplehelp' },
        { icon: <FaInstagram />, name: 'Instagram', color: 'bg-pink-600', handle: '@exampleofficial' },
        { icon: <FaWhatsapp />, name: 'WhatsApp', color: 'bg-green-500', handle: '+18001234567' }
    ];

    const faqs = [
        {
            question: 'What is your response time?',
            answer: 'We typically respond within 1-2 business days. Urgent matters are prioritized.'
        },
        {
            question: 'Do you have 24/7 support?',
            answer: 'Yes, we offer 24/7 phone support for urgent technical issues.'
        },
        {
            question: 'Can I schedule a callback?',
            answer: 'Yes, you can schedule a callback at your convenience through our online portal.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
            {/* Header */}
            <header className="mb-8 pt-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
                <p className="text-gray-600">Get in touch with our friendly support team</p>

                {/* Live Chat Button - Floating on mobile */}
                <div className="fixed bottom-24 right-4 z-10 md:static md:mt-4">
                    <button className="flex items-center justify-center bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition">
                        <FaWhatsapp className="text-xl" />
                        <span className="ml-2 font-semibold">Live Chat</span>
                    </button>
                </div>
            </header>

            {/* Contact Information Cards */}
            <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
                            <div className="flex items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-lg mr-4">
                                    <div className="text-2xl">{info.icon}</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{info.description}</p>
                                    <div className="space-y-1">
                                        {info.details.map((detail, i) => (
                                            <p key={i} className="text-gray-700">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-3 py-2 text-center text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                                {info.action}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="mb-8">
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Topic Selection */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-3 font-medium">What can we help you with?</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {contactTopics.map(topic => (
                                    <button
                                        key={topic.id}
                                        type="button"
                                        onClick={() => setSelectedTopic(topic.id)}
                                        className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center ${selectedTopic === topic.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <span className="text-2xl mb-2">{topic.icon}</span>
                                        <span className="text-sm font-medium">{topic.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                    placeholder="Please describe your issue in detail..."
                                />
                            </div>

                            <div className="flex items-center mb-6">
                                <input type="checkbox" id="newsletter" className="mr-3" />
                                <label htmlFor="newsletter" className="text-gray-600 text-sm">
                                    Subscribe to our newsletter for updates and offers
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition flex items-center justify-center`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Social Media & FAQ Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Social Media */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 text-white">
                    <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                    <p className="text-gray-300 mb-6">Follow us on social media for updates and support</p>
                    <div className="space-y-3">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                            >
                                <div className={`p-2 rounded-lg ${social.color} mr-3`}>
                                    {social.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{social.name}</div>
                                    <div className="text-sm text-gray-300">{social.handle}</div>
                                </div>
                                <span className="text-gray-400">→</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick FAQ */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Answers</h3>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 text-center text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                        View All FAQs
                    </button>
                </div>
            </div>

            {/* Map/Office Hours */}
            <div className="bg-gray-50 rounded-xl p-5 mb-20">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Office</h3>
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 mb-4 md:mb-0 md:mr-6">
                        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg h-48 flex items-center justify-center">
                            <div className="text-center">
                                <FaMapMarkerAlt className="text-4xl text-blue-500 mx-auto mb-3" />
                                <p className="text-gray-700 font-medium">123 Business Street</p>
                                <p className="text-gray-600">New York, NY 10001</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <h4 className="font-bold text-gray-900 mb-3">Visit Us</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <FaClock className="mr-3 text-gray-400" />
                                Mon-Fri: 9AM-6PM
                            </li>
                            <li className="flex items-center">
                                <FaClock className="mr-3 text-gray-400" />
                                Saturday: 10AM-4PM
                            </li>
                            <li className="flex items-center">
                                <FaClock className="mr-3 text-gray-400" />
                                Sunday: Closed
                            </li>
                        </ul>
                        <button className="w-full mt-4 py-2 text-center bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>

            {/* Emergency Contact Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-red-50 border-t border-red-200 p-4 md:static md:rounded-lg md:mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                            <span className="text-red-600">🚨</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">Emergency Support</h4>
                            <p className="text-sm text-gray-600">Available 24/7 for urgent issues</p>
                        </div>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
                        Emergency Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;