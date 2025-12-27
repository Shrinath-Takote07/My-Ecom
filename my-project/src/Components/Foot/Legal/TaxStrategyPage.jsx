import React, { useState } from 'react';
import { FaBalanceScale, FaCalculator, FaChartLine, FaGlobe, FaHandshake, FaFileInvoiceDollar, FaShieldAlt, FaLightbulb, FaRegCalendarAlt, FaBuilding } from 'react-icons/fa';

const TaxStrategyPage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [expandedPrinciple, setExpandedPrinciple] = useState(null);

    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: '📋' },
        { id: 'principles', label: 'Principles', icon: '⚖️' },
        { id: 'compliance', label: 'Compliance', icon: '✅' },
        { id: 'reporting', label: 'Reporting', icon: '📊' },
        { id: 'governance', label: 'Governance', icon: '🏛️' },
        { id: 'contact', label: 'Contact', icon: '📞' }
    ];

    const taxPrinciples = [
        {
            id: 1,
            title: 'Transparency',
            description: 'Clear disclosure of our tax approach and payments',
            details: 'We publish detailed tax reports and country-by-country disclosures in line with OECD guidelines.',
            icon: <FaChartLine className="text-blue-600" />,
            color: 'bg-blue-50'
        },
        {
            id: 2,
            title: 'Compliance',
            description: 'Adherence to all applicable tax laws and regulations',
            details: 'We maintain rigorous compliance with tax laws in all jurisdictions where we operate.',
            icon: <FaShieldAlt className="text-green-600" />,
            color: 'bg-green-50'
        },
        {
            id: 3,
            title: 'Responsibility',
            description: 'Fair contribution to public finances',
            details: 'We aim to pay the right amount of tax at the right time in the right place.',
            icon: <FaBalanceScale className="text-purple-600" />,
            color: 'bg-purple-50'
        },
        {
            id: 4,
            title: 'Commercial Alignment',
            description: 'Tax aligned with genuine business activities',
            details: 'Our tax planning reflects genuine commercial and economic activity.',
            icon: <FaBuilding className="text-amber-600" />,
            color: 'bg-amber-50'
        },
        {
            id: 5,
            title: 'Risk Management',
            description: 'Proactive identification and management of tax risks',
            details: 'We maintain a robust tax risk management framework and regular reviews.',
            icon: <FaCalculator className="text-red-600" />,
            color: 'bg-red-50'
        },
        {
            id: 6,
            title: 'Stakeholder Engagement',
            description: 'Open dialogue with tax authorities and stakeholders',
            details: 'We maintain transparent relationships with tax authorities globally.',
            icon: <FaHandshake className="text-indigo-600" />,
            color: 'bg-indigo-50'
        }
    ];

    const complianceFramework = [
        { area: 'Corporate Tax', compliance: 'Fully Compliant', lastReview: 'Q4 2024' },
        { area: 'VAT/GST', compliance: 'Fully Compliant', lastReview: 'Q3 2024' },
        { area: 'Transfer Pricing', compliance: 'Fully Compliant', lastReview: 'Q2 2024' },
        { area: 'Withholding Tax', compliance: 'Fully Compliled', lastReview: 'Q1 2024' },
        { area: 'Tax Reporting', compliance: 'Fully Compliant', lastReview: 'Current' }
    ];

    const reportingMetrics = [
        { metric: 'Effective Tax Rate', value: '24.5%', change: '+0.3%', trend: 'up' },
        { metric: 'Total Tax Contribution', value: '$185M', change: '+12%', trend: 'up' },
        { metric: 'Countries Operated In', value: '28', change: '+2', trend: 'up' },
        { metric: 'Tax Disclosures', value: 'Full', change: 'Enhanced', trend: 'neutral' }
    ];

    const governanceStructure = [
        { role: 'Board of Directors', responsibility: 'Overall tax strategy oversight', frequency: 'Quarterly' },
        { role: 'Audit Committee', responsibility: 'Review of tax risks and compliance', frequency: 'Monthly' },
        { role: 'CFO', responsibility: 'Day-to-day tax strategy implementation', frequency: 'Ongoing' },
        { role: 'Tax Department', responsibility: 'Tax compliance and reporting', frequency: 'Daily' },
        { role: 'External Auditors', responsibility: 'Independent review and assurance', frequency: 'Annual' }
    ];

    const keyDates = [
        { date: '31 Mar 2024', event: 'Annual Tax Strategy Publication', status: 'upcoming' },
        { date: '30 Apr 2024', event: 'Corporate Tax Return Filing', status: 'upcoming' },
        { date: '15 Jan 2024', event: 'VAT/GST Quarterly Returns', status: 'completed' },
        { date: '28 Feb 2024', event: 'Transfer Pricing Documentation', status: 'completed' }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Tax Strategy</h2>
                            <p className="text-gray-700 mb-4">
                                This document sets out our approach to conducting our tax affairs and dealing with tax risks.
                                It applies to all companies within our group and has been approved by the Board of Directors.
                            </p>
                            <div className="flex items-center text-sm text-gray-600">
                                <FaRegCalendarAlt className="mr-2" />
                                Effective Date: January 1, 2024 • Next Review: December 31, 2024
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Objectives</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                        <FaGlobe className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Global Compliance</h4>
                                        <p className="text-gray-600 text-sm mt-1">Adherence to tax laws in all 28 countries of operation</p>
                                    </div>
                                </div>
                                <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                                        <FaChartLine className="text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Transparent Reporting</h4>
                                        <p className="text-gray-600 text-sm mt-1">Clear disclosure of tax payments and strategy</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Performance Indicators</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {reportingMetrics.map((item, index) => (
                                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                                        <div className="text-sm text-gray-600 mb-2">{item.metric}</div>
                                        <div className={`inline-flex items-center text-sm ${item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                                            {item.trend === 'up' && '↗'}
                                            {item.trend === 'down' && '↘'}
                                            {item.trend === 'neutral' && '→'}
                                            <span className="ml-1">{item.change}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'principles':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Tax Principles</h2>
                            <p className="text-gray-700 mb-8">
                                Our tax strategy is built on six fundamental principles that guide all our tax-related decisions
                                and ensure we meet our obligations while supporting sustainable business growth.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {taxPrinciples.map((principle) => (
                                    <div
                                        key={principle.id}
                                        className={`${principle.color} rounded-xl p-5 border border-gray-100 hover:shadow-md transition cursor-pointer`}
                                        onClick={() => setExpandedPrinciple(expandedPrinciple === principle.id ? null : principle.id)}
                                    >
                                        <div className="flex items-start">
                                            <div className="p-3 rounded-lg bg-white mr-4">
                                                <div className="text-xl">{principle.icon}</div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{principle.title}</h3>
                                                <p className="text-gray-700 mb-3">{principle.description}</p>

                                                {expandedPrinciple === principle.id && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <p className="text-gray-600 text-sm">{principle.details}</p>
                                                    </div>
                                                )}

                                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                                                    {expandedPrinciple === principle.id ? 'Show Less' : 'Learn More'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'compliance':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Compliance Framework</h2>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance Status</h3>
                                <div className="space-y-3">
                                    {complianceFramework.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">{item.area}</div>
                                                <div className="text-sm text-gray-600">Last reviewed: {item.lastReview}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`w-3 h-3 rounded-full mr-2 ${item.compliance === 'Fully Compliant' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                <span className="font-medium text-gray-900">{item.compliance}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance Process</h3>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">1</div>
                                            <div className="font-medium text-gray-900">Identification</div>
                                            <div className="text-sm text-gray-600">Tax obligations</div>
                                        </div>
                                        <div className="text-gray-400">→</div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">2</div>
                                            <div className="font-medium text-gray-900">Implementation</div>
                                            <div className="text-sm text-gray-600">Process & controls</div>
                                        </div>
                                        <div className="text-gray-400">→</div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">3</div>
                                            <div className="font-medium text-gray-900">Monitoring</div>
                                            <div className="text-sm text-gray-600">Regular reviews</div>
                                        </div>
                                        <div className="text-gray-400">→</div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">4</div>
                                            <div className="font-medium text-gray-900">Reporting</div>
                                            <div className="text-sm text-gray-600">Transparent disclosure</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'reporting':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tax Reporting & Transparency</h2>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Reporting Standards</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="font-bold text-gray-900 mb-2">GRI 207: Tax</div>
                                        <p className="text-gray-600 text-sm">Global Reporting Initiative standard for tax disclosure</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="font-bold text-gray-900 mb-2">OECD Guidelines</div>
                                        <p className="text-gray-600 text-sm">Country-by-country reporting standards</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Reports & Publications</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <FaFileInvoiceDollar className="text-gray-400 mr-3" />
                                            <div>
                                                <div className="font-medium text-gray-900">Annual Tax Report</div>
                                                <div className="text-sm text-gray-600">Comprehensive tax contribution disclosure</div>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                                            Download PDF
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <FaChartLine className="text-gray-400 mr-3" />
                                            <div>
                                                <div className="font-medium text-gray-900">Country-by-Country Report</div>
                                                <div className="text-sm text-gray-600">Tax paid by jurisdiction</div>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                                            View Online
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'governance':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Governance Structure</h2>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Roles & Responsibilities</h3>
                                <div className="space-y-3">
                                    {governanceStructure.map((item, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="font-bold text-gray-900">{item.role}</div>
                                                <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                                    {item.frequency}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{item.responsibility}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Dates & Deadlines</h3>
                                <div className="space-y-3">
                                    {keyDates.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900">{item.event}</div>
                                                <div className="text-sm text-gray-600">{item.date}</div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {item.status === 'completed' ? '✓ Completed' : 'Upcoming'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tax Department Contact</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-xl">
                                    <h3 className="font-bold text-gray-900 mb-4">General Inquiries</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-sm text-gray-600">Email</div>
                                            <div className="font-medium text-gray-900">tax@company.com</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Phone</div>
                                            <div className="font-medium text-gray-900">+1 (555) 123-4567</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Hours</div>
                                            <div className="font-medium text-gray-900">Mon-Fri, 9AM-5PM EST</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-6 rounded-xl">
                                    <h3 className="font-bold text-gray-900 mb-4">Specific Contacts</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="font-medium text-gray-900">Sarah Johnson</div>
                                            <div className="text-sm text-gray-600">Head of Tax</div>
                                            <div className="text-sm text-blue-600">s.johnson@company.com</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">Michael Chen</div>
                                            <div className="text-sm text-gray-600">Tax Compliance Manager</div>
                                            <div className="text-sm text-blue-600">m.chen@company.com</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="font-bold text-gray-900 mb-4">Submit a Query</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                        <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                                            <option>General Tax Inquiry</option>
                                            <option>Compliance Question</option>
                                            <option>Reporting Inquiry</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32"></textarea>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                        Submit Query
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-4 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Tax Strategy</h1>
                            <p className="text-blue-200 text-sm">Fiscal Year 2024</p>
                        </div>
                        <button
                            onClick={() => setShowDisclaimer(true)}
                            className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
                        >
                            Legal Disclaimer
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="sticky top-[73px] bg-white border-b border-gray-200 z-30">
                <div className="max-w-6xl mx-auto">
                    <div className="overflow-x-auto">
                        <div className="flex space-x-1 p-2 min-w-max">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`flex items-center px-4 py-3 rounded-lg whitespace-nowrap transition ${activeSection === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <span className="mr-2 text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="p-4 max-w-6xl mx-auto pb-20">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="mb-6 md:mb-0">
                            <div className="text-xl font-bold mb-2">Tax Transparency</div>
                            <p className="text-gray-400">Building trust through transparent tax practices</p>
                        </div>

                        <div className="flex space-x-6">
                            <button className="text-gray-400 hover:text-white transition">
                                Download PDF
                            </button>
                            <button className="text-gray-400 hover:text-white transition">
                                Print Version
                            </button>
                            <button className="text-gray-400 hover:text-white transition">
                                Share
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
                        <p>© 2024 Financial Corporation. All rights reserved.</p>
                        <p className="mt-1">This tax strategy is approved by the Board of Directors and is reviewed annually.</p>
                    </div>
                </div>
            </footer>

            {/* Disclaimer Modal */}
            {showDisclaimer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Legal Disclaimer</h2>
                                <button
                                    onClick={() => setShowDisclaimer(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="prose prose-blue max-w-none">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <div className="flex">
                                        <FaLightbulb className="text-yellow-400 mr-3 mt-1" />
                                        <div>
                                            <p className="text-yellow-800 font-medium">Important Legal Notice</p>
                                            <p className="text-yellow-700 text-sm">This document is for informational purposes only and does not constitute tax advice.</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-gray-900 mb-3">Disclaimer Notice</h3>
                                <p className="text-gray-700 mb-4">
                                    The information contained in this Tax Strategy document is provided for general information
                                    purposes only and does not constitute professional tax advice. While we endeavor to keep the
                                    information up to date and correct, we make no representations or warranties of any kind,
                                    express or implied, about the completeness, accuracy, reliability, suitability, or availability
                                    with respect to the information contained herein.
                                </p>

                                <h3 className="font-bold text-gray-900 mb-3">No Tax Advice</h3>
                                <p className="text-gray-700 mb-4">
                                    This document should not be relied upon as tax advice. For specific tax advice related to
                                    your individual circumstances, please consult with a qualified tax professional.
                                </p>

                                <h3 className="font-bold text-gray-900 mb-3">Regulatory Compliance</h3>
                                <p className="text-gray-700 mb-6">
                                    Our tax strategy is designed to comply with all applicable laws and regulations in the
                                    jurisdictions where we operate, including but not limited to the UK's Finance Act 2016
                                    requirements for large businesses to publish their tax strategy.
                                </p>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <FaRegCalendarAlt className="mr-2" />
                                        <span>Last updated: March 15, 2024 | Next review due: December 31, 2024</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => setShowDisclaimer(false)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    I Understand
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 z-40">
                <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
                    <FaFileInvoiceDollar className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default TaxStrategyPage;