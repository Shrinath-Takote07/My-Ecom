import React, { useState } from 'react';
import { FaUsers, FaTrophy, FaHeart, FaLeaf, FaAward, FaStar, FaQuoteLeft, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaPlay } from 'react-icons/fa';

const AboutUsPage = () => {
    const [activeValue, setActiveValue] = useState(0);

    const stats = [
        { number: "500K+", label: "Happy Customers", icon: "😊" },
        { number: "50+", label: "Countries", icon: "🌎" },
        { number: "15", label: "Years Experience", icon: "🎯" },
        { number: "24/7", label: "Support", icon: "🛡️" }
    ];

    const values = [
        {
            title: "Customer First",
            description: "We prioritize our customers' needs above everything else.",
            icon: <FaHeart className="text-red-500" />
        },
        {
            title: "Excellence",
            description: "We strive for excellence in everything we do.",
            icon: <FaTrophy className="text-amber-500" />
        },
        {
            title: "Innovation",
            description: "We continuously innovate to stay ahead.",
            icon: <FaStar className="text-blue-500" />
        },
        {
            title: "Sustainability",
            description: "We're committed to sustainable practices.",
            icon: <FaLeaf className="text-green-500" />
        }
    ];

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "👩‍💼",
            bio: "15+ years in e-commerce",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "Michael Chen",
            role: "CTO",
            image: "👨‍💻",
            bio: "Tech visionary & innovator",
            social: { linkedin: "#", twitter: "#" }
        },
        {
            name: "Emily Davis",
            role: "Head of Design",
            image: "👩‍🎨",
            bio: "Creating beautiful experiences",
            social: { linkedin: "#", instagram: "#" }
        },
        {
            name: "David Wilson",
            role: "Operations Lead",
            image: "👨‍💼",
            bio: "Making things happen",
            social: { linkedin: "#" }
        }
    ];

    const timeline = [
        { year: "2009", event: "Founded with a small team", highlight: true },
        { year: "2012", event: "Expanded to international markets" },
        { year: "2015", event: "Launched mobile app" },
        { year: "2018", event: "Reached 1M customers", highlight: true },
        { year: "2020", event: "Pioneered sustainable packaging" },
        { year: "2023", event: "Named Industry Leader" }
    ];

    const testimonials = [
        {
            text: "The best shopping experience I've ever had! Customer service is outstanding.",
            author: "Alex Morgan",
            role: "Loyal Customer"
        },
        {
            text: "Their commitment to quality and sustainability is truly inspiring.",
            author: "Priya Sharma",
            role: "Business Partner"
        },
        {
            text: "Innovative products backed by exceptional service. Highly recommend!",
            author: "Marcus Lee",
            role: "Industry Expert"
        }
    ];

    const awards = [
        { title: "Best E-commerce 2023", organization: "Retail Awards", icon: "🏆" },
        { title: "Customer Service Excellence", organization: "Service Awards", icon: "⭐" },
        { title: "Sustainable Business", organization: "Green Council", icon: "🌱" },
        { title: "Innovation Prize", organization: "Tech Forum", icon: "💡" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative p-6 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
                                Since 2009
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Our Story of Innovation & Excellence
                            </h1>
                            <p className="text-lg text-blue-100 mb-8">
                                Building a better future through innovative solutions and
                                unwavering commitment to our customers.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center">
                                    <FaPlay className="mr-2" />
                                    Watch Our Story
                                </button>
                                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                                    Explore Careers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Curved bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-3xl"></div>
            </section>

            {/* Stats Section */}
            <section className="py-8 px-4 -mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition"
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
                        <p className="text-gray-600 text-lg">
                            We're on a mission to revolutionize the shopping experience through
                            technology and exceptional service.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-10">
                        <div className="flex items-start mb-6">
                            <div className="bg-blue-600 text-white p-3 rounded-xl mr-4">
                                <FaUsers className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                                <p className="text-gray-700">
                                    To empower every customer with exceptional products,
                                    seamless experiences, and sustainable choices that enrich lives.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-purple-600 text-white p-3 rounded-xl mr-4">
                                <FaAward className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                                <p className="text-gray-700">
                                    To become the world's most trusted and innovative platform,
                                    setting new standards for customer experience and sustainability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveValue(index)}
                                className={`bg-white rounded-xl p-6 shadow-sm cursor-pointer transition-all ${activeValue === index ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-md'}`}
                            >
                                <div className="text-3xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
                        <p className="text-gray-600">The passionate people behind our success</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group"
                            >
                                <div className="p-6 text-center">
                                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition">
                                        {member.image}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <div className="text-blue-600 font-medium mb-2">{member.role}</div>
                                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                                    <div className="flex justify-center space-x-3">
                                        {member.social.linkedin && (
                                            <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-700">
                                                <FaLinkedin />
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400">
                                                <FaTwitter />
                                            </a>
                                        )}
                                        {member.social.instagram && (
                                            <a href={member.social.instagram} className="text-gray-400 hover:text-pink-600">
                                                <FaInstagram />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-12 px-4 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                        <p className="text-gray-600">Milestones that shaped our story</p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200"></div>

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`w-5/6 md:w-2/5 ${index % 2 === 0 ? 'pr-8 md:pr-0 md:mr-8' : 'pl-8 md:pl-0 md:ml-8'}`}>
                                        <div className={`bg-white rounded-xl p-5 shadow-sm ${item.highlight ? 'ring-2 ring-blue-500' : ''}`}>
                                            <div className={`text-2xl font-bold mb-2 ${item.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                                                {item.year}
                                            </div>
                                            <p className="text-gray-700">{item.event}</p>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${item.highlight ? 'bg-blue-600 ring-4 ring-blue-200' : 'bg-blue-400'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
                        <p className="text-gray-600">Hear from our customers and partners</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                                <div className="text-blue-400 text-2xl mb-4">
                                    <FaQuoteLeft />
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                                <div>
                                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards & Recognition */}
            <section className="py-12 px-4 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
                        <p className="text-gray-300">Celebrating our achievements</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {awards.map((award, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition">
                                <div className="text-4xl mb-4">{award.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{award.title}</h3>
                                <p className="text-gray-300 text-sm">{award.organization}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Join Our Journey</h2>
                        <p className="text-blue-100 mb-8 text-lg">
                            Be part of our mission to create exceptional experiences
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                                View Careers
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Footer */}
            <footer className="bg-gray-900 text-white py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <div className="text-2xl font-bold mb-2">OurStory</div>
                            <p className="text-gray-400">Building the future together</p>
                        </div>

                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaFacebook className="text-2xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaTwitter className="text-2xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>All rights reserved. Crafted with ❤️ for amazing customers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUsPage;