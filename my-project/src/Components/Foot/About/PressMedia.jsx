// PressMedia.jsx
import React, { useState } from 'react';
import {
    Calendar,
    Newspaper,
    Download,
    Video,
    Image as ImageIcon,
    Search,
    Filter,
    ChevronDown,
    ExternalLink,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const PressMedia = () => {
    const [activeTab, setActiveTab] = useState('press-releases');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data for press releases
    const pressReleases = [
        {
            id: 1,
            title: 'Company Launches New Product Line',
            date: '2024-03-15',
            category: 'Product',
            summary: 'Introducing our innovative new product suite designed for modern businesses.',
            downloadLink: '#'
        },
        {
            id: 2,
            title: 'Q4 Financial Results Announcement',
            date: '2024-02-28',
            category: 'Financial',
            summary: 'Record quarterly results with 25% year-over-year growth.',
            downloadLink: '#'
        },
        {
            id: 3,
            title: 'Partnership with Global Tech Leader',
            date: '2024-02-15',
            category: 'Partnership',
            summary: 'New strategic partnership to expand market reach.',
            downloadLink: '#'
        }
    ];

    // Sample media assets
    const mediaAssets = [
        {
            id: 1,
            type: 'logo',
            title: 'Company Logo Pack',
            format: 'PNG, SVG',
            size: '15MB',
            downloads: 245
        },
        {
            id: 2,
            type: 'photo',
            title: 'Product Photos',
            format: 'JPG, PNG',
            size: '45MB',
            downloads: 189
        },
        {
            id: 3,
            type: 'video',
            title: 'Company Overview Video',
            format: 'MP4',
            size: '120MB',
            downloads: 312
        }
    ];

    // Sample news articles
    const newsArticles = [
        {
            id: 1,
            source: 'Tech News Daily',
            title: 'How Company X is Revolutionizing the Industry',
            date: '2024-03-10',
            link: '#'
        },
        {
            id: 2,
            source: 'Business Today',
            title: 'Leadership Insights from Our CEO',
            date: '2024-03-05',
            link: '#'
        },
        {
            id: 3,
            source: 'Innovation Journal',
            title: 'The Future of Technology',
            date: '2024-02-28',
            link: '#'
        }
    ];

    // Contact information
    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: 'Email',
            value: 'press@company.com',
            link: 'mailto:press@company.com'
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: 'Phone',
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: 'Office',
            value: '123 Media Street, San Francisco, CA',
            link: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <Newspaper className="w-8 h-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Press & Media</h1>
                        </div>
                        <button className="md:hidden p-2 rounded-lg bg-gray-100">
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search press releases, media, and news..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="flex overflow-x-auto space-x-1 bg-gray-100 p-1 rounded-lg">
                        {['press-releases', 'media-assets', 'news-coverage', 'contact'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 rounded-md whitespace-nowrap transition-all ${activeTab === tab
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">

                    {/* Press Releases */}
                    {activeTab === 'press-releases' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <Newspaper className="w-6 h-6 mr-2" />
                                Press Releases
                            </h2>
                            <div className="space-y-4">
                                {pressReleases.map((release) => (
                                    <div key={release.id} className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                            <div>
                                                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                                                    {release.category}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900">{release.title}</h3>
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm mt-2 sm:mt-0">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {release.date}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{release.summary}</p>
                                        <div className="flex items-center justify-between">
                                            <a
                                                href={release.downloadLink}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Download PDF
                                            </a>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Media Assets */}
                    {activeTab === 'media-assets' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <ImageIcon className="w-6 h-6 mr-2" />
                                Media Assets
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mediaAssets.map((asset) => (
                                    <div key={asset.id} className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-lg ${asset.type === 'logo' ? 'bg-blue-100' :
                                                asset.type === 'photo' ? 'bg-green-100' : 'bg-purple-100'
                                                }`}>
                                                {asset.type === 'video' ? (
                                                    <Video className="w-6 h-6" />
                                                ) : asset.type === 'photo' ? (
                                                    <ImageIcon className="w-6 h-6" />
                                                ) : (
                                                    <Newspaper className="w-6 h-6" />
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-500">{asset.downloads} downloads</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{asset.title}</h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <div>Format: {asset.format}</div>
                                            <div>Size: {asset.size}</div>
                                        </div>
                                        <button className="w-full mt-4 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* News Coverage */}
                    {activeTab === 'news-coverage' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">News Coverage</h2>
                            <div className="space-y-4">
                                {newsArticles.map((article) => (
                                    <div key={article.id} className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-medium text-blue-600">{article.source}</span>
                                            <span className="text-sm text-gray-500">{article.date}</span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-3">{article.title}</h3>
                                        <a
                                            href={article.link}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                        >
                                            Read Article
                                            <ExternalLink className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Contact */}
                    {activeTab === 'contact' && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Contact</h2>
                            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Press Inquiries</h3>
                                <div className="space-y-4">
                                    {contactInfo.map((contact, index) => (
                                        <a
                                            key={index}
                                            href={contact.link}
                                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                {contact.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500">{contact.label}</div>
                                                <div className="font-medium text-gray-900">{contact.value}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Subscribe to Updates</h3>
                                <p className="text-gray-600 mb-4">
                                    Get the latest press releases and media updates directly to your inbox.
                                </p>
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                    />
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <div className="text-sm text-gray-600">Press Releases</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <div className="text-sm text-gray-600">Media Downloads</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div className="text-2xl font-bold text-blue-600">48</div>
                        <div className="text-sm text-gray-600">News Features</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-gray-600">Events</div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center space-x-2">
                                <Newspaper className="w-6 h-6" />
                                <span className="font-bold">Press & Media Center</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-2"></p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-300 hover:text-white">Press Kit</a>
                            <a href="#" className="text-gray-300 hover:text-white">Brand Guidelines</a>
                            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PressMedia;