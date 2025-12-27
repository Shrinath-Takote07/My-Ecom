import React, { useState } from 'react';

// Careers Component
const Career = () => {
    const [activeTab, setActiveTab] = useState('openings');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [filterDepartment, setFilterDepartment] = useState('all');

    // Job openings data
    const jobOpenings = [
        {
            id: 1,
            title: 'Frontend Developer',
            department: 'Engineering',
            type: 'Full-time',
            location: 'Remote',
            experience: '2+ years',
            postedDate: '2 days ago',
            salary: '$80,000 - $110,000',
            description: 'Build responsive e-commerce interfaces using React and modern web technologies.',
            requirements: ['React/Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
            popular: true
        },
        {
            id: 2,
            title: 'UX/UI Designer',
            department: 'Design',
            type: 'Full-time',
            location: 'New York, NY',
            experience: '3+ years',
            postedDate: '1 week ago',
            salary: '$75,000 - $100,000',
            description: 'Create beautiful, user-centered designs for our e-commerce platform.',
            requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Mobile First'],
            popular: true
        },
        {
            id: 3,
            title: 'Customer Support Specialist',
            department: 'Support',
            type: 'Full-time',
            location: 'Remote',
            experience: '1+ years',
            postedDate: '3 days ago',
            salary: '$45,000 - $60,000',
            description: 'Provide exceptional support to our customers via chat, email, and phone.',
            requirements: ['Customer Service', 'Communication', 'Problem Solving', 'E-commerce'],
            popular: false
        },
        {
            id: 4,
            title: 'Digital Marketing Manager',
            department: 'Marketing',
            type: 'Full-time',
            location: 'San Francisco, CA',
            experience: '4+ years',
            postedDate: '2 weeks ago',
            salary: '$90,000 - $120,000',
            description: 'Develop and execute digital marketing strategies to drive growth.',
            requirements: ['SEO/SEM', 'Social Media', 'Analytics', 'Campaign Management', 'Content Strategy'],
            popular: false
        },
        {
            id: 5,
            title: 'DevOps Engineer',
            department: 'Engineering',
            type: 'Full-time',
            location: 'Remote',
            experience: '3+ years',
            postedDate: '5 days ago',
            salary: '$95,000 - $130,000',
            description: 'Build and maintain our cloud infrastructure and CI/CD pipelines.',
            requirements: ['AWS/Azure', 'Docker/Kubernetes', 'CI/CD', 'Infrastructure as Code', 'Monitoring'],
            popular: true
        },
        {
            id: 6,
            title: 'Product Manager',
            department: 'Product',
            type: 'Full-time',
            location: 'Austin, TX',
            experience: '4+ years',
            postedDate: '1 week ago',
            salary: '$110,000 - $140,000',
            description: 'Lead product development and strategy for our e-commerce platform.',
            requirements: ['Product Strategy', 'Agile/Scrum', 'Data Analysis', 'User Research', 'Roadmapping'],
            popular: false
        },
        {
            id: 7,
            title: 'Data Analyst',
            department: 'Analytics',
            type: 'Full-time',
            location: 'Remote',
            experience: '2+ years',
            postedDate: '4 days ago',
            salary: '$70,000 - $95,000',
            description: 'Analyze customer data to provide insights for business decisions.',
            requirements: ['SQL', 'Python/R', 'Data Visualization', 'Statistics', 'Business Intelligence'],
            popular: false
        },
        {
            id: 8,
            title: 'Content Writer',
            department: 'Marketing',
            type: 'Part-time',
            location: 'Remote',
            experience: '1+ years',
            postedDate: '1 day ago',
            salary: '$30 - $45/hour',
            description: 'Create engaging content for our blog, product pages, and marketing materials.',
            requirements: ['Copywriting', 'SEO', 'Content Strategy', 'E-commerce', 'Blogging'],
            popular: false
        }
    ];

    // Company values
    const companyValues = [
        {
            title: 'Customer First',
            description: 'Everything we do starts with our customers\' needs',
            icon: '❤️'
        },
        {
            title: 'Innovation',
            description: 'We embrace change and continuously improve',
            icon: '💡'
        },
        {
            title: 'Collaboration',
            description: 'We win together as one team',
            icon: '🤝'
        },
        {
            title: 'Ownership',
            description: 'We take responsibility for our results',
            icon: '🎯'
        },
        {
            title: 'Transparency',
            description: 'Open and honest communication',
            icon: '🔍'
        },
        {
            title: 'Work-Life Balance',
            description: 'We value personal time and flexibility',
            icon: '⚖️'
        }
    ];

    // Benefits
    const benefits = [
        { title: 'Health Insurance', icon: '🏥', description: 'Comprehensive medical, dental, and vision' },
        { title: 'Remote Work', icon: '🏠', description: 'Flexible remote work options' },
        { title: 'Learning Budget', icon: '📚', description: '$2,000 annual learning stipend' },
        { title: '401(k) Match', icon: '💰', description: '4% company match' },
        { title: 'Unlimited PTO', icon: '🌴', description: 'Take time when you need it' },
        { title: 'Parental Leave', icon: '👶', description: '16 weeks paid parental leave' },
        { title: 'Stock Options', icon: '📈', description: 'Employee stock option plan' },
        { title: 'Wellness Stipend', icon: '🧘', description: '$100 monthly wellness budget' }
    ];

    // Departments for filter
    const departments = [
        { id: 'all', name: 'All Departments', count: jobOpenings.length },
        { id: 'Engineering', name: 'Engineering', count: jobOpenings.filter(job => job.department === 'Engineering').length },
        { id: 'Design', name: 'Design', count: jobOpenings.filter(job => job.department === 'Design').length },
        { id: 'Marketing', name: 'Marketing', count: jobOpenings.filter(job => job.department === 'Marketing').length },
        { id: 'Product', name: 'Product', count: jobOpenings.filter(job => job.department === 'Product').length },
        { id: 'Support', name: 'Support', count: jobOpenings.filter(job => job.department === 'Support').length },
        { id: 'Analytics', name: 'Analytics', count: jobOpenings.filter(job => job.department === 'Analytics').length }
    ];

    // Filter jobs by department
    const filteredJobs = filterDepartment === 'all'
        ? jobOpenings
        : jobOpenings.filter(job => job.department === filterDepartment);

    // Handle job selection
    const handleJobSelect = (job) => {
        setSelectedJob(job);
        setShowApplicationForm(false);
    };

    // Handle apply now
    const handleApplyNow = () => {
        setShowApplicationForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Application form component
    const ApplicationForm = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Apply for {selectedJob?.title}</h3>
                        <button
                            onClick={() => setShowApplicationForm(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>

                    <form className="space-y-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                            <input
                                type="url"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <div className="text-3xl mb-2">📄</div>
                                <p className="text-gray-600 mb-2">Drag & drop or click to upload</p>
                                <p className="text-gray-500 text-sm">PDF, DOC up to 5MB</p>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="4"
                                placeholder="Tell us why you're interested in this position..."
                            />
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="consent"
                                className="mt-1 mr-2"
                                required
                            />
                            <label htmlFor="consent" className="text-sm text-gray-600">
                                I agree to the processing of my personal data for recruitment purposes.
                            </label>
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowApplicationForm(false)}
                                className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold mb-3">Build Your Career With Us</h1>
                    <p className="text-blue-100 mb-6">
                        Join our mission to revolutionize e-commerce. Work with talented people on meaningful projects.
                    </p>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setActiveTab('openings')}
                            className={`flex-1 py-3 rounded-lg font-medium ${activeTab === 'openings'
                                    ? 'bg-white text-blue-600'
                                    : 'bg-white/20 hover:bg-white/30'
                                }`}
                        >
                            Open Positions
                        </button>
                        <button
                            onClick={() => setActiveTab('culture')}
                            className={`flex-1 py-3 rounded-lg font-medium ${activeTab === 'culture'
                                    ? 'bg-white text-blue-600'
                                    : 'bg-white/20 hover:bg-white/30'
                                }`}
                        >
                            Our Culture
                        </button>
                    </div>
                </div>
            </section>

            <div className="p-4 pb-24">
                {/* Job Openings Tab */}
                {activeTab === 'openings' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                <div className="text-2xl font-bold text-gray-800">{jobOpenings.length}</div>
                                <div className="text-sm text-gray-600">Open Positions</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                <div className="text-2xl font-bold text-gray-800">12</div>
                                <div className="text-sm text-gray-600">Countries</div>
                            </div>
                        </div>

                        {/* Department Filter */}
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-3">Filter by Department</h2>
                            <div className="flex overflow-x-auto pb-2">
                                {departments.map((dept) => (
                                    <button
                                        key={dept.id}
                                        onClick={() => setFilterDepartment(dept.id)}
                                        className={`flex-shrink-0 px-4 py-2 mr-2 rounded-full font-medium ${filterDepartment === dept.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 border border-gray-200'
                                            }`}
                                    >
                                        {dept.name} ({dept.count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Job Listings */}
                        <div className="space-y-4 mb-8">
                            {filteredJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className={`bg-white rounded-xl border-2 p-4 ${selectedJob?.id === job.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    onClick={() => handleJobSelect(job)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-800">{job.title}</h3>
                                        {job.popular && (
                                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                                                🔥 Popular
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            {job.department}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            {job.type}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                            📍 {job.location}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3">{job.description}</p>

                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            <span className="mr-3">🕐 {job.postedDate}</span>
                                            <span>💰 {job.salary}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleJobSelect(job);
                                                handleApplyNow();
                                            }}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Jobs Message */}
                        {filteredJobs.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="font-bold text-gray-800 mb-2">No openings in this department</h3>
                                <p className="text-gray-600 mb-6">Check back soon or browse other departments.</p>
                                <button
                                    onClick={() => setFilterDepartment('all')}
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                                >
                                    View All Positions
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Culture Tab */}
                {activeTab === 'culture' && (
                    <>
                        {/* Values */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {companyValues.map((value, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                                        <div className="text-2xl mb-2">{value.icon}</div>
                                        <h3 className="font-bold text-gray-800 mb-1">{value.title}</h3>
                                        <p className="text-gray-600 text-sm">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Benefits */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits & Perks</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                                        <div className="text-2xl mb-2">{benefit.icon}</div>
                                        <h3 className="font-bold text-gray-800 mb-1">{benefit.title}</h3>
                                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Team Photos */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Life at Our Company</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 aspect-square flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🏢</div>
                                        <p className="font-medium text-gray-800">Modern Offices</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-6 aspect-square flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🎉</div>
                                        <p className="font-medium text-gray-800">Team Events</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-6 aspect-square flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">💻</div>
                                        <p className="font-medium text-gray-800">Remote Friendly</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-xl p-6 aspect-square flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🌱</div>
                                        <p className="font-medium text-gray-800">Growth Focused</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Testimonial */}
                        <section className="mb-8">
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
                                <div className="text-4xl mb-4">💬</div>
                                <p className="text-lg italic mb-4">
                                    "The best part about working here is the trust and autonomy. I have the freedom to experiment and innovate while being supported by an amazing team."
                                </p>
                                <div>
                                    <div className="font-bold">Alex Morgan</div>
                                    <div className="text-gray-300 text-sm">Senior Product Designer, 3 years</div>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* Selected Job Details */}
                {selectedJob && !showApplicationForm && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
                        <div className="max-w-md mx-auto">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-800">{selectedJob.title}</h3>
                                    <p className="text-sm text-gray-600">{selectedJob.department} • {selectedJob.location}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedJob.requirements.map((req, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {req}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleApplyNow}
                                    className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Application Form Modal */}
                {showApplicationForm && <ApplicationForm />}
            </div>

            {/* Fixed CTA */}
            {!selectedJob && !showApplicationForm && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-800">Don't see the perfect role?</p>
                                <p className="text-sm text-gray-600">Send us your resume anyway</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900">
                                General Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            <Careers />
        </div>
    );
};

export default Career;