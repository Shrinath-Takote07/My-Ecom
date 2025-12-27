import React, { useState } from 'react';
import { FaLeaf, FaRecycle, FaTint, FaSolarPanel, FaBolt, FaSeedling, FaTree, FaHandsHelping, FaChartLine, FaHeart } from 'react-icons/fa';
import { MdEco, MdLocalShipping, MdAgriculture } from 'react-icons/md';

const SustainabilityPage = () => {
    const [activeImpact, setActiveImpact] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState(0);
    const [showAllInitiatives, setShowAllInitiatives] = useState(false);

    const sustainabilityStats = [
        { value: "85%", label: "Reduced Carbon", description: "vs 2019 baseline", icon: "🌱", color: "bg-green-100" },
        { value: "100%", label: "Renewable Energy", description: "Across all facilities", icon: "☀️", color: "bg-yellow-100" },
        { value: "95%", label: "Waste Diverted", description: "From landfills", icon: "♻️", color: "bg-blue-100" },
        { value: "10M+", label: "Trees Planted", description: "Since 2020", icon: "🌳", color: "bg-emerald-100" }
    ];

    const impactAreas = [
        {
            title: "Carbon Neutral",
            icon: <FaLeaf className="text-green-600" />,
            description: "Achieved carbon neutrality across all operations",
            details: "We offset 100% of our carbon emissions through verified projects",
            progress: 100
        },
        {
            title: "Zero Waste",
            icon: <FaRecycle className="text-blue-600" />,
            description: "Working towards zero waste to landfill",
            details: "95% of operational waste is recycled or composted",
            progress: 95
        },
        {
            title: "Water Positive",
            icon: <FaTint className="text-cyan-600" />,
            description: "Restoring more water than we use",
            details: "We return 120% of water used back to local watersheds",
            progress: 120
        },
        {
            title: "Renewable Energy",
            icon: <FaSolarPanel className="text-yellow-600" />,
            description: "100% renewable energy in operations",
            details: "Powered by solar, wind, and hydroelectric sources",
            progress: 100
        }
    ];

    const initiatives = [
        {
            title: "Eco Packaging",
            icon: "📦",
            description: "100% biodegradable and compostable packaging",
            impact: "Saved 5M plastic packages annually"
        },
        {
            title: "Green Delivery",
            icon: "🚚",
            description: "Electric and hybrid vehicle fleet",
            impact: "Reduced delivery emissions by 65%"
        },
        {
            title: "Sustainable Sourcing",
            icon: "🌿",
            description: "Ethically sourced materials and ingredients",
            impact: "Supporting 500+ sustainable farms"
        },
        {
            title: "Reforestation",
            icon: "🌳",
            description: "Tree planting with every purchase",
            impact: "10M+ trees planted globally"
        },
        {
            title: "Circular Economy",
            icon: "🔄",
            description: "Product take-back and recycling program",
            impact: "200K+ products repurposed annually"
        },
        {
            title: "Community Impact",
            icon: "🤝",
            description: "Supporting local sustainability projects",
            impact: "Benefited 100+ communities"
        }
    ];

    const sustainableGoals = [
        {
            year: "2025",
            title: "Net Zero Carbon",
            description: "Achieve net zero carbon emissions",
            icon: "🎯",
            completed: false
        },
        {
            year: "2026",
            title: "100% Circular",
            description: "All products fully recyclable",
            icon: "🔄",
            completed: false
        },
        {
            year: "2027",
            title: "Water Stewardship",
            description: "Become water positive in all regions",
            icon: "💧",
            completed: false
        },
        {
            year: "2030",
            title: "Climate Positive",
            description: "Remove more carbon than we emit",
            icon: "🌍",
            completed: false
        }
    ];

    const certifications = [
        { name: "B Corp Certified", icon: "✅", description: "Meeting highest social & environmental standards" },
        { name: "Carbon Neutral", icon: "🌱", description: "Verified by Climate Neutral" },
        { name: "1% for the Planet", icon: "💚", description: "Donating 1% of revenue to environmental causes" },
        { name: "Fair Trade", icon: "⚖️", description: "Ensuring fair wages and conditions" }
    ];

    const impactStories = [
        {
            title: "Amazon Reforestation",
            location: "Brazil",
            impact: "1M trees planted",
            image: "🌳",
            description: "Supporting indigenous communities to restore rainforest"
        },
        {
            title: "Ocean Cleanup",
            location: "Pacific Ocean",
            impact: "50K kg plastic removed",
            image: "🌊",
            description: "Partnering with ocean conservation organizations"
        },
        {
            title: "Solar Farm Initiative",
            location: "India",
            impact: "10MW clean energy",
            image: "☀️",
            description: "Providing renewable energy to rural communities"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-green-700 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative p-6 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <div className="flex items-center mb-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 mr-3">
                                    <FaLeaf className="text-xl" />
                                </div>
                                <span className="text-emerald-100 font-medium">Our Commitment</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Building a Sustainable Future Together
                            </h1>
                            <p className="text-lg text-emerald-100 mb-8">
                                We're committed to positive environmental impact through innovative
                                solutions and responsible business practices.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <button className="bg-white text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center">
                                    <FaChartLine className="mr-2" />
                                    View Our Impact Report
                                </button>
                                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                                    Join Our Mission
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating leaves */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white rounded-t-3xl"></div>
                <div className="absolute top-10 right-10 text-4xl opacity-20">🌿</div>
                <div className="absolute top-1/4 left-10 text-3xl opacity-20">🍃</div>
            </section>

            {/* Quick Stats */}
            <section className="py-8 px-4 -mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sustainabilityStats.map((stat, index) => (
                        <div
                            key={index}
                            className={`${stat.color} rounded-xl shadow-sm p-4 text-center hover:shadow-md transition transform hover:-translate-y-1`}
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                            <div className="text-xs text-gray-600">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Impact Areas */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sustainability Impact</h2>
                        <p className="text-gray-600">Driving meaningful change across key environmental areas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {impactAreas.map((area, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveImpact(index)}
                                className={`bg-white rounded-xl p-6 shadow-sm cursor-pointer border-2 ${activeImpact === index ? 'border-green-500' : 'border-transparent'} hover:shadow-md transition`}
                            >
                                <div className="flex items-start mb-4">
                                    <div className="bg-green-50 p-3 rounded-lg mr-4">
                                        <div className="text-2xl">{area.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{area.title}</h3>
                                        <p className="text-green-600 font-medium">{area.description}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">{area.details}</p>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Progress</span>
                                        <span className="font-bold">{area.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${index === 2 ? 'bg-cyan-500' : 'bg-green-500'}`}
                                            style={{ width: `${Math.min(area.progress, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Initiatives */}
            <section className="py-12 px-4 bg-emerald-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Green Initiatives</h2>
                        <p className="text-gray-600">Practical actions making a real difference</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(showAllInitiatives ? initiatives : initiatives.slice(0, 3)).map((initiative, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition transform hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{initiative.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{initiative.title}</h3>
                                <p className="text-gray-600 mb-4">{initiative.description}</p>
                                <div className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium">
                                    {initiative.impact}
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showAllInitiatives && (
                        <div className="text-center mt-10">
                            <button
                                onClick={() => setShowAllInitiatives(true)}
                                className="inline-flex items-center text-emerald-700 font-semibold hover:text-emerald-800"
                            >
                                <span>View All Initiatives</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Sustainability Goals Timeline */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Roadmap to 2030</h2>
                        <p className="text-gray-600">Ambitious goals for a sustainable future</p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-emerald-200"></div>

                        <div className="space-y-8">
                            {sustainableGoals.map((goal, index) => (
                                <div
                                    key={index}
                                    className={`relative flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                                    onClick={() => setSelectedGoal(index)}
                                >
                                    <div className={`w-full md:w-2/5 ${index % 2 === 0 ? 'md:pr-8 md:mr-8' : 'md:pl-8 md:ml-8'} ml-12 md:ml-0`}>
                                        <div className={`bg-white rounded-xl p-5 shadow-sm cursor-pointer ${selectedGoal === index ? 'ring-2 ring-emerald-500' : 'hover:shadow-md'}`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center">
                                                    <div className="text-2xl mr-3">{goal.icon}</div>
                                                    <div>
                                                        <div className="text-sm font-medium text-emerald-600">{goal.year}</div>
                                                        <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                                                    </div>
                                                </div>
                                                {goal.completed ? (
                                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        ✓ Completed
                                                    </div>
                                                ) : (
                                                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                                        In Progress
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-600">{goal.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 rounded-full ${selectedGoal === index ? 'bg-emerald-600 ring-4 ring-emerald-200' : 'bg-emerald-400'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-12 px-4 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
                        <p className="text-gray-300">Recognized for our commitment to sustainability</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition transform hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{cert.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                                <p className="text-gray-300 text-sm">{cert.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stories */}
            <section className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Global Impact</h2>
                        <p className="text-gray-600">Real stories from our environmental projects</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {impactStories.map((story, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
                            >
                                <div className="h-40 bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center text-6xl">
                                    {story.image}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{story.title}</h3>
                                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {story.location}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">{story.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-emerald-700 font-bold">{story.impact}</div>
                                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                                            Learn More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How You Can Help */}
            <section className="py-12 px-4 bg-gradient-to-r from-emerald-100 to-green-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Movement</h2>
                        <p className="text-gray-600">Small actions create big change</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-4">🛒</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Shop Sustainable</h3>
                            <p className="text-gray-600 text-sm mb-4">Choose eco-friendly products</p>
                            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition">
                                Shop Now
                            </button>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-4">♻️</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Recycle with Us</h3>
                            <p className="text-gray-600 text-sm mb-4">Return old products for recycling</p>
                            <button className="w-full border-2 border-emerald-600 text-emerald-600 py-2 rounded-lg font-medium hover:bg-emerald-50 transition">
                                Learn How
                            </button>
                        </div>

                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-4">📢</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Spread Awareness</h3>
                            <p className="text-gray-600 text-sm mb-4">Share our mission with others</p>
                            <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-black transition">
                                Share Story
                            </button>
                        </div>
                    </div>

                    {/* Carbon Calculator */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Calculate Your Impact</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">By choosing eco-shipping:</span>
                                <span className="font-bold text-emerald-600">-2.5 kg CO₂</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Using recycled packaging:</span>
                                <span className="font-bold text-emerald-600">-1.8 kg CO₂</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Planting a tree:</span>
                                <span className="font-bold text-emerald-600">+22 kg CO₂ removed</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
                            Calculate Your Footprint
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 md:p-10">
                        <div className="text-4xl mb-4">🌍</div>
                        <h2 className="text-3xl font-bold mb-4">Together for a Greener Tomorrow</h2>
                        <p className="text-emerald-100 mb-8 text-lg">
                            Join thousands making a difference with every purchase
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-emerald-900 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition flex items-center justify-center">
                                <FaHeart className="mr-2" />
                                Support Our Mission
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                                Download Impact Report
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-6 md:mb-0">
                                <div className="flex items-center">
                                    <FaLeaf className="text-emerald-400 text-2xl mr-3" />
                                    <div className="text-2xl font-bold">EcoFuture</div>
                                </div>
                                <p className="text-gray-400 mt-2">Committed to sustainability since 2010</p>
                            </div>

                            <div className="text-gray-400 text-sm">
                                <p></p>
                                <p className="mt-1">Our planet comes first. Always.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SustainabilityPage;