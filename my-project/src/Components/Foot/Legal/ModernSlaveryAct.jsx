import React, { useState } from 'react';

const ModernSlaveryAct = () => {
    const [activeSection, setActiveSection] = useState('statement');
    const [showSupplierForm, setShowSupplierForm] = useState(false);
    const [readMore, setReadMore] = useState(false);

    // Key sections
    const sections = [
        { id: 'statement', title: 'Our Statement', icon: '📜' },
        { id: 'policies', title: 'Our Policies', icon: '📋' },
        { id: 'due-diligence', title: 'Due Diligence', icon: '🔍' },
        { id: 'risk-assessment', title: 'Risk Areas', icon: '⚠️' },
        { id: 'training', title: 'Training', icon: '🎓' },
        { id: 'metrics', title: 'Progress', icon: '📊' },
        { id: 'reporting', title: 'Reporting', icon: '📞' },
        { id: 'suppliers', title: 'Suppliers', icon: '🏭' }
    ];

    // Policy framework
    const policies = [
        {
            title: 'Supplier Code of Conduct',
            description: 'Mandatory standards for all business partners',
            status: 'Implemented',
            lastUpdated: '2023',
            icon: '🤝'
        },
        {
            title: 'Human Rights Policy',
            description: 'Comprehensive human rights commitments',
            status: 'Implemented',
            lastUpdated: '2023',
            icon: '👥'
        },
        {
            title: 'Whistleblower Policy',
            description: 'Safe reporting channels for concerns',
            status: 'Implemented',
            lastUpdated: '2023',
            icon: '📢'
        },
        {
            title: 'Recruitment Policy',
            description: 'Ethical recruitment and fair employment',
            status: 'Implemented',
            lastUpdated: '2023',
            icon: '💼'
        },
        {
            title: 'Remediation Framework',
            description: 'Process for addressing identified issues',
            status: 'In Progress',
            lastUpdated: '2024',
            icon: '🔄'
        },
        {
            title: 'Audit Protocol',
            description: 'Regular assessment of supply chain',
            status: 'Implemented',
            lastUpdated: '2023',
            icon: '📋'
        }
    ];

    // Risk assessment areas
    const riskAreas = [
        {
            category: 'High Risk',
            areas: [
                { name: 'Raw Material Sourcing', level: 'high', icon: '⛏️' },
                { name: 'Manufacturing Partners', level: 'high', icon: '🏭' },
                { name: 'Seasonal Workers', level: 'high', icon: '🌾' }
            ]
        },
        {
            category: 'Medium Risk',
            areas: [
                { name: 'Logistics Providers', level: 'medium', icon: '🚚' },
                { name: 'Packaging Suppliers', level: 'medium', icon: '📦' },
                { name: 'Warehousing', level: 'medium', icon: '🏪' }
            ]
        },
        {
            category: 'Low Risk',
            areas: [
                { name: 'Office Operations', level: 'low', icon: '🏢' },
                { name: 'Digital Services', level: 'low', icon: '💻' },
                { name: 'Local Retail', level: 'low', icon: '🛍️' }
            ]
        }
    ];

    // Due diligence measures
    const dueDiligenceMeasures = [
        {
            stage: '1. Risk Assessment',
            measures: ['Supply chain mapping', 'Country risk analysis', 'Industry risk evaluation'],
            icon: '🗺️'
        },
        {
            stage: '2. Supplier Screening',
            measures: ['Background checks', 'Compliance verification', 'Financial stability review'],
            icon: '🔍'
        },
        {
            stage: '3. Contractual Controls',
            measures: ['MSA compliance clauses', 'Right to audit', 'Termination provisions'],
            icon: '📝'
        },
        {
            stage: '4. Ongoing Monitoring',
            measures: ['Regular audits', 'Performance reviews', 'Continuous improvement'],
            icon: '📊'
        },
        {
            stage: '5. Remediation',
            measures: ['Corrective action plans', 'Support for improvement', 'Partnership termination'],
            icon: '🔄'
        }
    ];

    // Training programs
    const trainingPrograms = [
        {
            audience: 'Senior Leadership',
            hours: '4 hours/year',
            completion: '100%',
            icon: '👨‍💼'
        },
        {
            audience: 'Procurement Team',
            hours: '8 hours/year',
            completion: '95%',
            icon: '👩‍💼'
        },
        {
            audience: 'Supply Chain Managers',
            hours: '6 hours/year',
            completion: '92%',
            icon: '👷'
        },
        {
            audience: 'All Employees',
            hours: '2 hours/year',
            completion: '88%',
            icon: '👥'
        },
        {
            audience: 'New Suppliers',
            hours: 'Mandatory training',
            completion: '100%',
            icon: '🤝'
        }
    ];

    // Performance metrics
    const metrics = [
        {
            metric: 'Suppliers Assessed',
            value: '89%',
            target: '95%',
            trend: 'up',
            icon: '📈'
        },
        {
            metric: 'High-Risk Audits',
            value: '76',
            target: '80',
            trend: 'up',
            icon: '🔍'
        },
        {
            metric: 'Training Completion',
            value: '92%',
            target: '90%',
            trend: 'up',
            icon: '🎓'
        },
        {
            metric: 'Issues Resolved',
            value: '94%',
            target: '95%',
            trend: 'stable',
            icon: '✅'
        },
        {
            metric: 'Supplier Compliance',
            value: '87%',
            target: '90%',
            trend: 'up',
            icon: '📋'
        }
    ];

    // Supplier form component
    const SupplierForm = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Supplier Disclosure</h3>
                        <button
                            onClick={() => setShowSupplierForm(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6 text-sm">
                        We require all suppliers to disclose their modern slavery compliance measures.
                    </p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="contact@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Type</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Select type</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="raw-materials">Raw Materials</option>
                                <option value="logistics">Logistics</option>
                                <option value="packaging">Packaging</option>
                                <option value="services">Services</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Countries of Operation *</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="List countries separated by commas"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Does your company have a Modern Slavery Act statement?
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input type="radio" name="hasStatement" value="yes" className="mr-2" />
                                    <span>Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="hasStatement" value="no" className="mr-2" />
                                    <span>No</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="hasStatement" value="in-progress" className="mr-2" />
                                    <span>In Progress</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Modern Slavery Statement (PDF)
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">📄</div>
                                <p className="text-gray-600 text-sm">Drag & drop or click to upload</p>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowSupplierForm(false)}
                                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                            >
                                Submit Disclosure
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    // Get risk level color
    const getRiskColor = (level) => {
        switch (level) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center mb-2">
                        <button className="mr-3 p-2 rounded-lg bg-white/20">
                            ←
                        </button>
                        <h1 className="text-2xl font-bold">Modern Slavery Act</h1>
                    </div>
                    <p className="text-blue-100 text-sm">
                        Transparency Statement & Compliance Framework
                    </p>
                </div>
            </header>

            <div className="p-4 pb-24">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">156</div>
                        <div className="text-sm text-gray-600">Suppliers Assessed</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">2023-2024</div>
                        <div className="text-sm text-gray-600">Reporting Period</div>
                    </div>
                </div>

                {/* Section Navigation */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Navigate Statement</h2>
                    <div className="flex overflow-x-auto pb-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex-shrink-0 px-4 py-3 mr-2 rounded-lg flex items-center ${activeSection === section.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-200'
                                    }`}
                            >
                                <span className="mr-2">{section.icon}</span>
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Statement Section */}
                    {activeSection === 'statement' && (
                        <section>
                            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Our Commitment</h2>
                                <p className="text-gray-700 mb-4">
                                    We are committed to ensuring that modern slavery and human trafficking have no place in our business or supply chains. This statement sets out the steps we have taken during the financial year ending December 2023 to prevent modern slavery in our operations.
                                </p>

                                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                    <h3 className="font-bold text-gray-800 mb-2">Organizational Structure</h3>
                                    <p className="text-gray-700 text-sm">
                                        We operate as an e-commerce retailer with supply chains spanning multiple countries. Our products are sourced from manufacturers and suppliers across Asia, Europe, and North America.
                                    </p>
                                </div>

                                {!readMore ? (
                                    <button
                                        onClick={() => setReadMore(true)}
                                        className="text-blue-600 font-medium flex items-center"
                                    >
                                        Read Full Statement ↓
                                    </button>
                                ) : (
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-3 mt-4">Our Approach</h3>
                                        <p className="text-gray-700 mb-3">
                                            We recognize that certain industries and regions present higher risks of modern slavery. Our approach is based on the United Nations Guiding Principles on Business and Human Rights and includes:
                                        </p>

                                        <ul className="space-y-2 mb-4">
                                            <li className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className="text-gray-700">Risk assessment and due diligence</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className="text-gray-700">Supplier engagement and capacity building</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className="text-gray-700">Continuous monitoring and improvement</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-500 mr-2">✓</span>
                                                <span className="text-gray-700">Transparent reporting and accountability</span>
                                            </li>
                                        </ul>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-bold text-gray-800 mb-2">Statement Approval</h4>
                                            <p className="text-gray-700 text-sm">
                                                This statement was approved by the Board of Directors on December 1, 2023, and will be reviewed annually.
                                            </p>
                                            <div className="flex items-center mt-3">
                                                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                                    <span className="text-blue-600">👤</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Sarah Johnson</p>
                                                    <p className="text-gray-600 text-sm">Chief Sustainability Officer</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setReadMore(false)}
                                            className="text-blue-600 font-medium mt-4 flex items-center"
                                        >
                                            Show Less ↑
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 text-white">
                                <h3 className="text-lg font-bold mb-3">Legal Compliance</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    This statement is made pursuant to section 54(1) of the Modern Slavery Act 2015 and constitutes our slavery and human trafficking statement for the financial year ending December 2023.
                                </p>
                                <div className="flex items-center">
                                    <span className="mr-3">⚖️</span>
                                    <span className="text-sm">UK Modern Slavery Act 2015 | California Transparency Act</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Policies Section */}
                    {activeSection === 'policies' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Policy Framework</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {policies.map((policy, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                                        <div className="text-2xl mb-2">{policy.icon}</div>
                                        <h3 className="font-bold text-gray-800 text-sm mb-1">{policy.title}</h3>
                                        <p className="text-gray-600 text-xs mb-2">{policy.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-xs px-2 py-1 rounded ${policy.status === 'Implemented'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {policy.status}
                                            </span>
                                            <span className="text-gray-500 text-xs">{policy.lastUpdated}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Due Diligence Section */}
                    {activeSection === 'due-diligence' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Due Diligence Process</h2>
                            <div className="space-y-4">
                                {dueDiligenceMeasures.map((stage, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
                                        <div className="flex items-start mb-3">
                                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                                <span className="text-blue-600 text-xl">{stage.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800">{stage.stage}</h3>
                                                <ul className="mt-2 space-y-1">
                                                    {stage.measures.map((measure, i) => (
                                                        <li key={i} className="flex items-center text-gray-700 text-sm">
                                                            <span className="text-gray-400 mr-2">•</span>
                                                            {measure}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Risk Assessment Section */}
                    {activeSection === 'risk-assessment' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Risk Assessment</h2>
                            <div className="space-y-6">
                                {riskAreas.map((category, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-800 mb-3">{category.category}</h3>
                                        <div className="space-y-3">
                                            {category.areas.map((area, i) => (
                                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center">
                                                            <span className="text-xl mr-3">{area.icon}</span>
                                                            <span className="font-medium text-gray-800">{area.name}</span>
                                                        </div>
                                                        <span className={`text-xs px-3 py-1 rounded-full ${getRiskColor(area.level)}`}>
                                                            {area.level.toUpperCase()} RISK
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Training Section */}
                    {activeSection === 'training' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Training & Awareness</h2>
                            <div className="space-y-4">
                                {trainingPrograms.map((program, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-3">{program.icon}</span>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{program.audience}</h3>
                                                    <p className="text-gray-600 text-sm">{program.hours}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-800">{program.completion}</div>
                                                <div className="text-gray-600 text-sm">Completion</div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{ width: program.completion }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Metrics Section */}
                    {activeSection === 'metrics' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {metrics.map((metric, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                                        <div className="text-2xl mb-2">{metric.icon}</div>
                                        <h3 className="font-bold text-gray-800 text-sm mb-1">{metric.metric}</h3>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
                                                <div className="text-gray-600 text-xs">Target: {metric.target}</div>
                                            </div>
                                            <div className={`text-2xl ${metric.trend === 'up' ? 'text-green-500' :
                                                    metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                                                }`}>
                                                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Reporting Section */}
                    {activeSection === 'reporting' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Reporting Concerns</h2>

                            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                                <h3 className="font-bold text-gray-800 mb-3">Confidential Reporting</h3>
                                <p className="text-gray-700 mb-4">
                                    We encourage all employees, suppliers, and stakeholders to report any concerns about modern slavery practices.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                            <span className="text-blue-600">📞</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">24/7 Hotline</h4>
                                            <p className="text-gray-600">+1 (800) 555-0123</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                                            <span className="text-green-600">📧</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Email</h4>
                                            <p className="text-gray-600">ethics@example.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                            <span className="text-purple-600">🌐</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Online Portal</h4>
                                            <p className="text-gray-600">example.com/report</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-5 text-white">
                                <h3 className="text-lg font-bold mb-3">Protection for Reporters</h3>
                                <p className="text-green-100 text-sm">
                                    We guarantee confidentiality and protection against retaliation for anyone reporting in good faith.
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Suppliers Section */}
                    {activeSection === 'suppliers' && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Supplier Engagement</h2>

                            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                                <h3 className="font-bold text-gray-800 mb-3">Supplier Requirements</h3>
                                <p className="text-gray-700 mb-4">
                                    All suppliers must adhere to our Supplier Code of Conduct, which prohibits:
                                </p>

                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span className="text-gray-700">Forced or compulsory labor</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span className="text-gray-700">Child labor</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span className="text-gray-700">Withholding of identity documents</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span className="text-gray-700">Excessive working hours</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span className="text-gray-700">Withholding of wages</span>
                                    </li>
                                </ul>

                                <button
                                    onClick={() => setShowSupplierForm(true)}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                                >
                                    Submit Supplier Disclosure
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-5">
                                <h3 className="font-bold text-gray-800 mb-3">Supplier Support</h3>
                                <p className="text-gray-700 text-sm mb-4">
                                    We provide training and resources to help suppliers improve their practices.
                                </p>

                                <div className="flex space-x-3">
                                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                                        Download Code of Conduct
                                    </button>
                                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                                        Training Materials
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* Supplier Form Modal */}
                {showSupplierForm && <SupplierForm />}
            </div>

            {/* Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">Need assistance?</p>
                            <p className="text-sm text-gray-600">Contact our compliance team</p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900"
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main App Component


export default ModernSlaveryAct;