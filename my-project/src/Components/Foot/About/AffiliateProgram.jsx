// AffiliateProgram.jsx
import React, { useState } from 'react';
import {
    TrendingUp,
    Users,
    DollarSign,
    BarChart3,
    Link as LinkIcon,
    CreditCard,
    Shield,
    Clock,
    CheckCircle,
    ChevronRight,
    Star,
    Percent,
    ShoppingCart,
    Globe,
    Smartphone,
    Mail,
    MessageSquare,
    FileText,
    HelpCircle,
    ExternalLink,
    Copy,
    Download,
    Filter,
    Search,
    ChevronDown,
    Calendar,
    TrendingDown,
    Award,
    Target
} from 'lucide-react';

const AffiliateProgram = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [copiedLink, setCopiedLink] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // User stats
    const userStats = {
        earnings: '$2,845.50',
        referrals: 48,
        conversionRate: '12.5%',
        commissionRate: '30%',
        pendingPayout: '$425.00',
        totalClicks: 1250
    };

    // Commission tiers
    const commissionTiers = [
        {
            level: 'Starter',
            sales: '0 - $999',
            rate: '20%',
            perks: ['Basic Dashboard', 'Monthly Payouts']
        },
        {
            level: 'Pro',
            sales: '$1,000 - $4,999',
            rate: '25%',
            perks: ['Advanced Analytics', 'Weekly Payouts', 'Priority Support']
        },
        {
            level: 'Expert',
            sales: '$5,000+',
            rate: '30%',
            perks: ['All Pro Features', 'Daily Payouts', 'Dedicated Manager', 'Early Access']
        }
    ];

    // Referral methods
    const referralMethods = [
        {
            icon: <Globe className="w-6 h-6" />,
            title: 'Website/Blog',
            description: 'Add links to your content',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: 'Social Media',
            description: 'Share on your social platforms',
            color: 'bg-purple-100 text-purple-600'
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email Marketing',
            description: 'Include in your newsletters',
            color: 'bg-green-100 text-green-600'
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: 'Direct Referral',
            description: 'Share directly with contacts',
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    // Recent referrals
    const recentReferrals = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@example.com',
            date: '2024-03-15',
            status: 'Converted',
            amount: '$149.99',
            commission: '$44.99'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            date: '2024-03-14',
            status: 'Pending',
            amount: '$79.99',
            commission: '$23.99'
        },
        {
            id: 3,
            name: 'Mike Chen',
            email: 'mike@example.com',
            date: '2024-03-13',
            status: 'Converted',
            amount: '$299.99',
            commission: '$89.99'
        }
    ];

    // Promotional materials
    const promoMaterials = [
        {
            type: 'Banner',
            name: '728x90 Leaderboard',
            formats: ['PNG', 'JPG', 'HTML'],
            code: '<a href="[your-link]"><img src="banner.png"></a>'
        },
        {
            type: 'Text Link',
            name: 'Standard Text Link',
            formats: ['HTML'],
            code: '<a href="[your-link]">Check out this product</a>'
        },
        {
            type: 'Product Widget',
            name: 'Interactive Product Card',
            formats: ['JavaScript', 'HTML'],
            code: '<div class="product-widget" data-affiliate="[your-id]"></div>'
        }
    ];

    // Copy referral link
    const copyReferralLink = () => {
        navigator.clipboard.writeText('https://example.com/ref/abc123');
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    // Quick stats cards
    const statCards = [
        {
            title: 'Total Earnings',
            value: userStats.earnings,
            icon: <DollarSign className="w-5 h-5" />,
            change: '+12.5%',
            trend: 'up',
            color: 'bg-green-50 text-green-700'
        },
        {
            title: 'Active Referrals',
            value: userStats.referrals,
            icon: <Users className="w-5 h-5" />,
            change: '+8',
            trend: 'up',
            color: 'bg-blue-50 text-blue-700'
        },
        {
            title: 'Conversion Rate',
            value: userStats.conversionRate,
            icon: <TrendingUp className="w-5 h-5" />,
            change: '+2.1%',
            trend: 'up',
            color: 'bg-purple-50 text-purple-700'
        },
        {
            title: 'Commission Rate',
            value: userStats.commissionRate,
            icon: <Percent className="w-5 h-5" />,
            change: 'Current Tier',
            trend: 'neutral',
            color: 'bg-orange-50 text-orange-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Affiliate Program</h1>
                                <p className="text-sm text-gray-500">Earn commissions by promoting our products</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Available Balance</p>
                                <p className="font-bold text-lg text-gray-900">{userStats.earnings}</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Withdraw Funds
                            </button>
                        </div>
                        <button className="md:hidden p-2 rounded-lg bg-gray-100">
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-2 rounded-lg ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' :
                                stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="lg:w-2/3">
                        {/* Navigation Tabs */}
                        <div className="mb-8">
                            <div className="flex overflow-x-auto space-x-1 bg-gray-100 p-1 rounded-lg">
                                {['overview', 'referrals', 'promote', 'earnings', 'resources'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-3 rounded-md whitespace-nowrap transition-all ${activeTab === tab
                                            ? 'bg-white text-blue-600 shadow-sm font-medium'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Your Referral Link - Always Visible */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="text-xl font-bold mb-2">Your Unique Referral Link</h3>
                                    <p className="text-blue-100">Share this link to start earning commissions</p>
                                </div>
                                <div className="flex-1 max-w-2xl">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-3 font-mono text-sm break-all">
                                            https://example.com/ref/abc123
                                        </div>
                                        <button
                                            onClick={copyReferralLink}
                                            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium ${copiedLink
                                                ? 'bg-green-500 hover:bg-green-600'
                                                : 'bg-white text-blue-600 hover:bg-gray-100'
                                                } transition-colors`}
                                        >
                                            {copiedLink ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    <span>Copy Link</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Commission Tiers */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Commission Tiers</h2>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Award className="w-4 h-4 mr-1" />
                                            Current: Expert Tier (30%)
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {commissionTiers.map((tier, index) => (
                                            <div key={index} className={`border rounded-xl p-6 ${tier.level === 'Expert'
                                                ? 'border-blue-500 border-2 bg-blue-50'
                                                : 'border-gray-200'
                                                }`}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-bold text-lg text-gray-900">{tier.level}</h3>
                                                    <span className="text-2xl font-bold text-blue-600">{tier.rate}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-4">Sales: {tier.sales}</p>
                                                <ul className="space-y-2">
                                                    {tier.perks.map((perk, idx) => (
                                                        <li key={idx} className="flex items-center text-sm">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                            {perk}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* How It Works */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">How It Works</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <LinkIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">1. Get Your Link</h4>
                                            <p className="text-sm text-gray-600">Copy your unique referral link</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Globe className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">2. Share & Promote</h4>
                                            <p className="text-sm text-gray-600">Share with your audience</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <ShoppingCart className="w-6 h-6 text-green-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">3. Earn Commissions</h4>
                                            <p className="text-sm text-gray-600">Get paid for every sale</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CreditCard className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 mb-2">4. Get Paid</h4>
                                            <p className="text-sm text-gray-600">Receive your earnings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'referrals' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Recent Referrals</h2>
                                        <button
                                            onClick={() => setShowFilters(!showFilters)}
                                            className="flex items-center text-sm text-gray-600 hover:text-gray-900 mt-2 sm:mt-0"
                                        >
                                            <Filter className="w-4 h-4 mr-1" />
                                            Filters
                                        </button>
                                    </div>

                                    {showFilters && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                                                    <option>All</option>
                                                    <option>Converted</option>
                                                    <option>Pending</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                                <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                                                    <option>Last 30 days</option>
                                                    <option>Last 90 days</option>
                                                    <option>All time</option>
                                                </select>
                                            </div>
                                            <div className="flex items-end">
                                                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                                    Apply Filters
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-left text-sm text-gray-500 border-b">
                                                    <th className="pb-3 px-4">Name</th>
                                                    <th className="pb-3 px-4">Date</th>
                                                    <th className="pb-3 px-4">Status</th>
                                                    <th className="pb-3 px-4">Amount</th>
                                                    <th className="pb-3 px-4">Commission</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentReferrals.map((referral) => (
                                                    <tr key={referral.id} className="border-b hover:bg-gray-50">
                                                        <td className="py-4 px-4">
                                                            <div>
                                                                <div className="font-medium text-gray-900">{referral.name}</div>
                                                                <div className="text-sm text-gray-500">{referral.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 text-gray-600">{referral.date}</td>
                                                        <td className="py-4 px-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${referral.status === 'Converted'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {referral.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-4 font-medium text-gray-900">{referral.amount}</td>
                                                        <td className="py-4 px-4">
                                                            <div className="font-bold text-blue-600">{referral.commission}</div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'promote' && (
                            <div className="space-y-6">
                                {/* Promotion Methods */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Promotion Methods</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {referralMethods.map((method, index) => (
                                            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                                                <div className="flex items-start space-x-4">
                                                    <div className={`p-3 rounded-lg ${method.color}`}>
                                                        {method.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 mb-2">{method.title}</h4>
                                                        <p className="text-gray-600 text-sm">{method.description}</p>
                                                        <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                                            Get Started
                                                            <ChevronRight className="w-4 h-4 ml-1" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Promotional Materials */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Promotional Materials</h2>
                                    <div className="space-y-4">
                                        {promoMaterials.map((material, index) => (
                                            <div key={index} className="border border-gray-200 rounded-xl p-6">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                                    <div>
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                                                {material.type}
                                                            </span>
                                                            <h4 className="font-semibold text-gray-900">{material.name}</h4>
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Formats: {material.formats.join(', ')}
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2 mt-4 md:mt-0">
                                                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                            <Download className="w-4 h-4" />
                                                            <span>Download</span>
                                                        </button>
                                                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                            <Copy className="w-4 h-4" />
                                                            <span>Copy Code</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                                    {material.code}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Dashboard */}
                    <div className="lg:w-1/3">
                        <div className="space-y-6">
                            {/* Performance Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2" />
                                    Performance Summary
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Total Clicks</span>
                                            <span className="font-medium text-gray-900">{userStats.totalClicks}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Conversion Rate</span>
                                            <span className="font-medium text-gray-900">{userStats.conversionRate}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Pending Payout</span>
                                            <span className="font-medium text-gray-900">{userStats.pendingPayout}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <FileText className="w-5 h-5 text-gray-600 mr-3" />
                                            <span>Generate Report</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <Download className="w-5 h-5 text-gray-600 mr-3" />
                                            <span>Download Assets</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
                                            <span>Get Support</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Program Benefits */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Program Benefits</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <Shield className="w-5 h-5 text-green-500 mr-3" />
                                        <span className="text-sm text-gray-700">90-day cookie duration</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock className="w-5 h-5 text-blue-500 mr-3" />
                                        <span className="text-sm text-gray-700">Fast weekly payouts</span>
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-purple-500 mr-3" />
                                        <span className="text-sm text-gray-700">High commission rates</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-500 mr-3" />
                                        <span className="text-sm text-gray-700">Exclusive bonuses</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <TrendingUp className="w-6 h-6" />
                                <span className="font-bold">Affiliate Program</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Earn competitive commissions by promoting our products.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Program</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-white">Commission Rates</a></li>
                                <li><a href="#" className="hover:text-white">Payment Methods</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Marketing Materials</a></li>
                                <li><a href="#" className="hover:text-white">API Documentation</a></li>
                                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Affiliate Support</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">Status</a></li>
                                <li><a href="#" className="hover:text-white">Report Issue</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">

                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AffiliateProgram;