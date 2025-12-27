// TermsOfService.jsx
import React, { useState } from 'react';
import {
    Shield,
    AlertCircle,
    FileText,
    CheckCircle,
    XCircle,
    ChevronDown,
    ChevronUp,
    Search,
    BookOpen,
    User,
    Globe,
    Lock,
    Clock,
    Mail,
    HelpCircle,
    ExternalLink,
    Download,
    Printer,
    ArrowLeft,
    Scale,
    Eye,
    Bell,
    FileWarning,
    Calendar
} from 'lucide-react';

const TermsOfService = () => {
    const [activeSection, setActiveSection] = useState('acceptance');
    const [searchTerm, setSearchTerm] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        acceptance: true,
        accounts: false,
        content: false,
        prohibited: false,
        termination: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Table of Contents
    const tableOfContents = [
        { id: 'acceptance', title: '1. Acceptance of Terms', icon: <CheckCircle className="w-4 h-4" /> },
        { id: 'accounts', title: '2. User Accounts', icon: <User className="w-4 h-4" /> },
        { id: 'services', title: '3. Services Description', icon: <Globe className="w-4 h-4" /> },
        { id: 'content', title: '4. User Content', icon: <FileText className="w-4 h-4" /> },
        { id: 'prohibited', title: '5. Prohibited Activities', icon: <XCircle className="w-4 h-4" /> },
        { id: 'intellectual', title: '6. Intellectual Property', icon: <Shield className="w-4 h-4" /> },
        { id: 'termination', title: '7. Termination', icon: <Lock className="w-4 h-4" /> },
        { id: 'disclaimer', title: '8. Disclaimer of Warranties', icon: <AlertCircle className="w-4 h-4" /> },
        { id: 'liability', title: '9. Limitation of Liability', icon: <Scale className="w-4 h-4" /> },
        { id: 'indemnification', title: '10. Indemnification', icon: <Shield className="w-4 h-4" /> },
        { id: 'governing', title: '11. Governing Law', icon: <Scale className="w-4 h-4" /> },
        { id: 'changes', title: '12. Changes to Terms', icon: <Clock className="w-4 h-4" /> },
        { id: 'contact', title: '13. Contact Information', icon: <Mail className="w-4 h-4" /> }
    ];

    // Last updated info
    const lastUpdated = "March 15, 2024";
    const effectiveDate = "April 1, 2024";

    // Important notices
    const importantNotices = [
        {
            type: 'warning',
            icon: <AlertCircle className="w-5 h-5" />,
            title: 'Binding Agreement',
            content: 'By using our services, you agree to be bound by these terms.'
        },
        {
            type: 'info',
            icon: <Bell className="w-5 h-5" />,
            title: 'Updates',
            content: 'We may update these terms periodically. Continued use constitutes acceptance.'
        },
        {
            type: 'legal',
            icon: <FileWarning className="w-5 h-5" />,
            title: 'Arbitration',
            content: 'Disputes will be resolved through binding arbitration (see Section 11).'
        }
    ];

    // Quick jump sections
    const quickLinks = [
        { label: 'Privacy Policy', href: '#', icon: <Eye className="w-4 h-4" /> },
        { label: 'Cookie Policy', href: '#', icon: <FileText className="w-4 h-4" /> },
        { label: 'Acceptable Use', href: '#', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Data Processing', href: '#', icon: <Shield className="w-4 h-4" /> }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Terms of Service</h1>
                                <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="hidden sm:flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Printer className="w-4 h-4" />
                                <span className="text-sm">Print</span>
                            </button>
                            <button className="hidden sm:flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Download className="w-4 h-4" />
                                <span className="text-sm">PDF</span>
                            </button>
                            <button className="md:hidden p-2 rounded-lg bg-gray-100">
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li><a href="/" className="hover:text-gray-900">Home</a></li>
                        <li><ChevronRight className="w-4 h-4" /></li>
                        <li><a href="/legal" className="hover:text-gray-900">Legal</a></li>
                        <li><ChevronRight className="w-4 h-4" /></li>
                        <li className="text-gray-900 font-medium">Terms of Service</li>
                    </ol>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Table of Contents */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 space-y-6">
                            {/* Search */}
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search terms..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table of Contents */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                                    <h3 className="font-bold text-gray-900 flex items-center">
                                        <BookOpen className="w-5 h-5 mr-2" />
                                        Table of Contents
                                    </h3>
                                </div>
                                <nav className="p-2">
                                    <ul className="space-y-1">
                                        {tableOfContents.map((item) => (
                                            <li key={item.id}>
                                                <button
                                                    onClick={() => {
                                                        setActiveSection(item.id);
                                                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className={`w-full text-left px-3 py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeSection === item.id
                                                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className={`p-1.5 rounded ${activeSection === item.id ? 'bg-blue-100' : 'bg-gray-100'
                                                        }`}>
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-sm font-medium">{item.title}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            {/* Important Notices */}
                            <div className="bg-white rounded-xl shadow-sm p-5">
                                <h4 className="font-bold text-gray-900 mb-4">Important Notices</h4>
                                <div className="space-y-4">
                                    {importantNotices.map((notice, index) => (
                                        <div key={index} className={`p-4 rounded-lg border ${notice.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                                                notice.type === 'info' ? 'border-blue-200 bg-blue-50' :
                                                    'border-red-200 bg-red-50'
                                            }`}>
                                            <div className="flex items-start space-x-3">
                                                <div className={`p-1.5 rounded ${notice.type === 'warning' ? 'text-yellow-600' :
                                                        notice.type === 'info' ? 'text-blue-600' :
                                                            'text-red-600'
                                                    }`}>
                                                    {notice.icon}
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-gray-900 text-sm">{notice.title}</h5>
                                                    <p className="text-gray-600 text-xs mt-1">{notice.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Acceptance Toggle */}
                            <div className="bg-white rounded-xl shadow-sm p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-gray-900">Accept Terms</h4>
                                    <div className={`w-12 h-6 rounded-full transition-colors ${accepted ? 'bg-green-500' : 'bg-gray-300'
                                        }`}>
                                        <button
                                            onClick={() => setAccepted(!accepted)}
                                            className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${accepted ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Toggle to indicate you have read and agree to our Terms of Service.
                                </p>
                                <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Continue with Acceptance
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Introduction */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
                            <div className="max-w-3xl">
                                <h2 className="text-2xl font-bold mb-4">Terms of Service Agreement</h2>
                                <p className="text-blue-100 mb-6">
                                    Please read these Terms of Service carefully before using our services. By accessing or using our services, you agree to be bound by these terms.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <Calendar className="w-5 h-5" />
                                            <div>
                                                <p className="text-sm text-blue-200">Effective Date</p>
                                                <p className="font-semibold">{effectiveDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="w-5 h-5" />
                                            <div>
                                                <p className="text-sm text-blue-200">Version</p>
                                                <p className="font-semibold">3.2.1</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <Clock className="w-5 h-5" />
                                            <div>
                                                <p className="text-sm text-blue-200">Reading Time</p>
                                                <p className="font-semibold">15-20 minutes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {quickLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="flex items-center justify-center space-x-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                                    >
                                        {link.icon}
                                        <span className="text-sm font-medium text-gray-700">{link.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Terms Sections */}
                        <div className="space-y-6">
                            {/* Section 1: Acceptance */}
                            <section id="acceptance" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleSection('acceptance')}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h3>
                                            <p className="text-gray-600 text-sm">By accessing or using our services, you agree to these terms.</p>
                                        </div>
                                    </div>
                                    {expandedSections.acceptance ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>

                                {expandedSections.acceptance && (
                                    <div className="px-6 pb-6">
                                        <div className="prose prose-sm max-w-none text-gray-700">
                                            <p className="mb-4">
                                                Welcome to our platform. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services"). Please read these Terms carefully before using our Services.
                                            </p>

                                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                                                <div className="flex">
                                                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-yellow-800">Important</p>
                                                        <p className="text-yellow-700 text-sm mt-1">
                                                            By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <h4 className="font-semibold text-gray-900 mt-6 mb-3">1.1 Eligibility</h4>
                                            <p className="mb-3">
                                                You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                                <li>You are at least 18 years old</li>
                                                <li>You have the legal capacity to enter into a binding agreement</li>
                                                <li>You are not prohibited from receiving our Services under applicable laws</li>
                                            </ul>

                                            <h4 className="font-semibold text-gray-900 mt-6 mb-3">1.2 Modifications to Terms</h4>
                                            <p className="mb-3">
                                                We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-2">
                                                <li>Posting the updated Terms on our website</li>
                                                <li>Sending an email notification to registered users</li>
                                                <li>Displaying a prominent notice within our Services</li>
                                            </ul>
                                            <p className="mt-4 text-sm text-gray-600">
                                                Continued use of our Services after changes constitutes acceptance of the modified Terms.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Section 2: User Accounts */}
                            <section id="accounts" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleSection('accounts')}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <User className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">2. User Accounts</h3>
                                            <p className="text-gray-600 text-sm">Account creation, security, and responsibilities.</p>
                                        </div>
                                    </div>
                                    {expandedSections.accounts ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>

                                {expandedSections.accounts && (
                                    <div className="px-6 pb-6">
                                        <div className="prose prose-sm max-w-none text-gray-700">
                                            <h4 className="font-semibold text-gray-900 mb-3">2.1 Account Registration</h4>
                                            <p className="mb-4">
                                                To access certain features of our Services, you may be required to create an account. You agree to:
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex items-center mb-2">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                                        <span className="font-medium">You Must</span>
                                                    </div>
                                                    <ul className="text-sm space-y-1">
                                                        <li>• Provide accurate information</li>
                                                        <li>• Maintain account security</li>
                                                        <li>• Update information promptly</li>
                                                        <li>• Use strong passwords</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex items-center mb-2">
                                                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                                        <span className="font-medium">You Must Not</span>
                                                    </div>
                                                    <ul className="text-sm space-y-1">
                                                        <li>• Share account credentials</li>
                                                        <li>• Create multiple accounts</li>
                                                        <li>• Use others' accounts</li>
                                                        <li>• Impersonate others</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <h4 className="font-semibold text-gray-900 mt-6 mb-3">2.2 Account Security</h4>
                                            <p className="mb-3">
                                                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                                <li>Immediately notify us of any unauthorized use of your account</li>
                                                <li>Ensure you log out from your account at the end of each session</li>
                                                <li>Use two-factor authentication when available</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Section 3: Services Description */}
                            <section id="services" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleSection('services')}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Globe className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">3. Services Description</h3>
                                            <p className="text-gray-600 text-sm">What we provide and service limitations.</p>
                                        </div>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </button>
                            </section>

                            {/* Section 4: User Content */}
                            <section id="content" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleSection('content')}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <FileText className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">4. User Content</h3>
                                            <p className="text-gray-600 text-sm">Your content rights and responsibilities.</p>
                                        </div>
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </button>
                            </section>

                            {/* Section 5: Prohibited Activities */}
                            <section id="prohibited" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleSection('prohibited')}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <XCircle className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">5. Prohibited Activities</h3>
                                            <p className="text-gray-600 text-sm">What you cannot do on our platform.</p>
                                        </div>
                                    </div>
                                    {expandedSections.prohibited ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>

                                {expandedSections.prohibited && (
                                    <div className="px-6 pb-6">
                                        <div className="prose prose-sm max-w-none text-gray-700">
                                            <p className="mb-4">
                                                You agree not to engage in any of the following prohibited activities:
                                            </p>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                    <h5 className="font-semibold text-red-800 mb-2">Illegal Activities</h5>
                                                    <p className="text-red-700 text-sm">
                                                        Using our Services for any unlawful purpose or in violation of any local, state, national, or international law.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                    <h5 className="font-semibold text-red-800 mb-2">Security Violations</h5>
                                                    <p className="text-red-700 text-sm">
                                                        Attempting to probe, scan, or test the vulnerability of any system or network or breach any security or authentication measures.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                                    <h5 className="font-semibold text-red-800 mb-2">Spam & Abuse</h5>
                                                    <p className="text-red-700 text-sm">
                                                        Sending unsolicited communications, promotions or advertisements, or engaging in spam or abusive behavior.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Continue with other sections in similar format... */}

                            {/* Contact Information Section */}
                            <section id="contact" className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Mail className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">13. Contact Information</h3>
                                            <p className="text-gray-600 text-sm">How to reach us with questions.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-5 rounded-xl">
                                            <h4 className="font-semibold text-gray-900 mb-4">Legal Notices</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">Company Name</p>
                                                    <p className="font-medium">Tech Solutions Inc.</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Address</p>
                                                    <p className="font-medium">123 Business Street, San Francisco, CA 94107</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <a href="mailto:legal@company.com" className="font-medium text-blue-600 hover:text-blue-800">
                                                        legal@company.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-5 rounded-xl">
                                            <h4 className="font-semibold text-gray-900 mb-4">Questions?</h4>
                                            <p className="text-gray-600 mb-4 text-sm">
                                                If you have any questions about these Terms, please contact our legal department.
                                            </p>
                                            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium">
                                                <HelpCircle className="w-4 h-4" />
                                                <span>Contact Legal Support</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Acceptance Footer */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">Acceptance Required</h3>
                                    <p className="text-gray-600">
                                        You must accept these Terms to continue using our services.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                    <button
                                        onClick={() => setAccepted(true)}
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                    >
                                        I Accept Terms
                                    </button>
                                    <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                                        Save for Later
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Version History */}
                        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Version History</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Version 3.2.1</p>
                                        <p className="text-sm text-gray-500">Current version</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{lastUpdated}</p>
                                        <p className="text-xs text-gray-500">Effective: {effectiveDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Version 3.2.0</p>
                                        <p className="text-sm text-gray-500">Previous version</p>
                                    </div>
                                    <p className="text-sm text-gray-500">January 15, 2024</p>
                                </div>
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
                                <Shield className="w-6 h-6" />
                                <span className="font-bold">Legal Center</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Protecting your rights and ensuring transparent service.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal Documents</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-white">Data Processing Agreement</a></li>
                                <li><a href="#" className="hover:text-white">Acceptable Use Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Compliance</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">GDPR Compliance</a></li>
                                <li><a href="#" className="hover:text-white">CCPA Information</a></li>
                                <li><a href="#" className="hover:text-white">Accessibility Statement</a></li>
                                <li><a href="#" className="hover:text-white">Security Practices</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">Legal Questions</a></li>
                                <li><a href="#" className="hover:text-white">Report Violation</a></li>
                                <li><a href="#" className="hover:text-white">DMCA Notice</a></li>
                                <li><a href="#" className="hover:text-white">Contact Legal</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>© 2024 Tech Solutions Inc. All rights reserved. These Terms of Service were last updated on {lastUpdated}.</p>
                        <p className="mt-2">This document is provided for informational purposes and does not constitute legal advice.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Add missing ChevronRight component
const ChevronRight = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

export default TermsOfService;