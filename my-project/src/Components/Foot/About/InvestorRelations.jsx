// components/InvestorRelations.jsx
import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    PieChart,
    FileText,
    Calendar,
    Download,
    ChevronDown,
    ChevronUp,
    BarChart3,
    Building2,
    Target
} from 'lucide-react';

const InvestorRelations = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    // Sample data
    const keyMetrics = [
        { label: 'Stock Price', value: '$154.32', change: '+2.4%', icon: TrendingUp, trend: 'up' },
        { label: 'Market Cap', value: '$2.1T', change: '+1.8%', icon: DollarSign, trend: 'up' },
        { label: 'P/E Ratio', value: '28.5', change: '-0.3', icon: BarChart3, trend: 'down' },
        { label: 'Dividend Yield', value: '0.6%', change: '+0.1%', icon: PieChart, trend: 'up' },
    ];

    const recentReports = [
        { title: 'Q3 2024 Earnings Report', date: 'Oct 25, 2024', type: 'PDF', size: '2.4 MB' },
        { title: 'Annual Report 2023', date: 'Feb 15, 2024', type: 'PDF', size: '8.2 MB' },
        { title: 'Sustainability Report', date: 'Mar 10, 2024', type: 'PDF', size: '5.1 MB' },
        { title: 'Q2 2024 Earnings Call', date: 'Jul 20, 2024', type: 'Audio', size: '45 MB' },
    ];

    const upcomingEvents = [
        { title: 'Q4 Earnings Call', date: 'Jan 28, 2025', time: '2:00 PM EST', type: 'Conference Call' },
        { title: 'Annual Shareholder Meeting', date: 'May 15, 2025', time: '10:00 AM EST', type: 'Virtual Meeting' },
        { title: 'Investor Day', date: 'Mar 5, 2025', time: '9:00 AM EST', type: 'Live Event' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Building2 },
        { id: 'financials', label: 'Financials', icon: DollarSign },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'governance', label: 'Governance', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-lg font-bold text-gray-900">Investor Relations</h1>
                        </div>
                        <button className="p-2 rounded-lg bg-gray-100">
                            <Users className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Tabs - Horizontal scroll on mobile */}
                    <div className="mt-4 overflow-x-auto">
                        <div className="flex space-x-1 min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4 mr-1.5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="px-4 pt-4">
                {/* Company Overview */}
                <section className="mb-6">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-900">Company Overview</h2>
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">NASDAQ: TECH</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Leading technology company providing innovative solutions across cloud computing,
                            artificial intelligence, and digital transformation services.
                        </p>
                    </div>
                </section>

                {/* Key Metrics */}
                <section className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
                        <span className="text-xs text-gray-500">Real-time</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {keyMetrics.map((metric, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <metric.icon className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                                    <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.change}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                                <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Collapsible Sections */}
                <div className="space-y-4">
                    {/* Financial Highlights */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => toggleSection('financials')}
                            className="w-full px-4 py-4 flex items-center justify-between text-left"
                        >
                            <div className="flex items-center">
                                <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Financial Highlights</h3>
                                    <p className="text-xs text-gray-500">Q3 2024 Results</p>
                                </div>
                            </div>
                            {expandedSection === 'financials' ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                        </button>

                        {expandedSection === 'financials' && (
                            <div className="px-4 pb-4 border-t border-gray-100">
                                <div className="pt-4 space-y-3">
                                    {[
                                        { label: 'Revenue', value: '$89.5B', growth: '+12% YoY' },
                                        { label: 'Net Income', value: '$23.1B', growth: '+18% YoY' },
                                        { label: 'EPS', value: '$2.99', growth: '+20% YoY' },
                                        { label: 'Operating Margin', value: '34.2%', growth: '+2.1%' },
                                    ].map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                            <span className="text-sm text-gray-600">{item.label}</span>
                                            <div className="text-right">
                                                <div className="font-semibold text-gray-900">{item.value}</div>
                                                <div className="text-xs text-green-600">{item.growth}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                                    View Full Financials
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Recent Reports */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => toggleSection('reports')}
                            className="w-full px-4 py-4 flex items-center justify-between text-left"
                        >
                            <div className="flex items-center">
                                <FileText className="w-5 h-5 text-blue-600 mr-3" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Recent Reports</h3>
                                    <p className="text-xs text-gray-500">Latest documents</p>
                                </div>
                            </div>
                            {expandedSection === 'reports' ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                        </button>

                        {expandedSection === 'reports' && (
                            <div className="px-4 pb-4 border-t border-gray-100">
                                <div className="pt-4 space-y-3">
                                    {recentReports.map((report, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm mb-1">{report.title}</h4>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {report.date}
                                                    <span className="mx-2">•</span>
                                                    {report.type}
                                                    <span className="mx-2">•</span>
                                                    {report.size}
                                                </div>
                                            </div>
                                            <button className="ml-2 p-2 text-gray-600 hover:text-blue-600">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <button
                            onClick={() => toggleSection('events')}
                            className="w-full px-4 py-4 flex items-center justify-between text-left"
                        >
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
                                    <p className="text-xs text-gray-500">Calendar</p>
                                </div>
                            </div>
                            {expandedSection === 'events' ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                        </button>

                        {expandedSection === 'events' && (
                            <div className="px-4 pb-4 border-t border-gray-100">
                                <div className="pt-4 space-y-3">
                                    {upcomingEvents.map((event, index) => (
                                        <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                                    {event.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {event.date}
                                                <span className="mx-2">•</span>
                                                {event.time}
                                            </div>
                                            <button className="w-full mt-3 py-2 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
                                                Add to Calendar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <section className="mt-6 bg-white rounded-xl shadow-sm p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Investor Contact</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            <span>Sarah Johnson, Investor Relations Director</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>investors@company.com</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+1 (555) 123-4567</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6">
                <div className="flex justify-between items-center">
                    {[
                        { icon: PieChart, label: 'Portfolio', active: false },
                        { icon: BarChart3, label: 'Markets', active: false },
                        { icon: Building2, label: 'IR', active: true },
                        { icon: FileText, label: 'News', active: false },
                        { icon: Users, label: 'Account', active: false },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={`flex flex-col items-center p-2 ${item.active ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default InvestorRelations;