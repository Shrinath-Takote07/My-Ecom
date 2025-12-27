// components/BulkOrders.jsx
import React, { useState, useEffect } from 'react';
import {
    Package,
    ShoppingCart,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle,
    Plus,
    Search,
    Filter,
    Download,
    Edit,
    Trash2,
    Eye,
    ChevronRight,
    ChevronDown,
    X,
    Users,
    Percent,
    Calendar,
    BarChart3,
    FileText,
    RefreshCw,
    MoreVertical
} from 'lucide-react';

const BulkOrders = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showNewOrderModal, setShowNewOrderModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0
    });

    // Filter states
    const [filters, setFilters] = useState({
        status: 'all',
        dateRange: 'all',
        minAmount: '',
        maxAmount: '',
        customerType: 'all'
    });

    // Sample orders data
    const sampleOrders = [
        {
            id: 'BULK-001',
            customer: 'ABC Corp',
            items: 5,
            quantity: 250,
            amount: '$12,450',
            date: '2024-01-15',
            status: 'processing',
            priority: 'high',
            contact: 'John Doe',
            phone: '+1 (555) 123-4567'
        },
        {
            id: 'BULK-002',
            customer: 'XYZ Ltd',
            items: 3,
            quantity: 500,
            amount: '$8,750',
            date: '2024-01-14',
            status: 'pending',
            priority: 'medium',
            contact: 'Jane Smith',
            phone: '+1 (555) 987-6543'
        },
        {
            id: 'BULK-003',
            customer: 'Retail Chain Inc',
            items: 8,
            quantity: 1200,
            amount: '$45,200',
            date: '2024-01-13',
            status: 'shipped',
            priority: 'high',
            contact: 'Robert Johnson',
            phone: '+1 (555) 456-7890'
        },
        {
            id: 'BULK-004',
            customer: 'Global Imports',
            items: 12,
            quantity: 800,
            amount: '$32,500',
            date: '2024-01-12',
            status: 'delivered',
            priority: 'low',
            contact: 'Sarah Williams',
            phone: '+1 (555) 234-5678'
        },
        {
            id: 'BULK-005',
            customer: 'Tech Solutions',
            items: 4,
            quantity: 150,
            amount: '$6,800',
            date: '2024-01-11',
            status: 'processing',
            priority: 'medium',
            contact: 'Mike Brown',
            phone: '+1 (555) 345-6789'
        },
        {
            id: 'BULK-006',
            customer: 'Medical Supplies Co',
            items: 6,
            quantity: 400,
            amount: '$18,300',
            date: '2024-01-10',
            status: 'pending',
            priority: 'high',
            contact: 'Dr. Lisa Chen',
            phone: '+1 (555) 567-8901'
        },
        {
            id: 'BULK-007',
            customer: 'Educational Institute',
            items: 15,
            quantity: 2000,
            amount: '$67,500',
            date: '2024-01-09',
            status: 'delivered',
            priority: 'high',
            contact: 'Prof. David Lee',
            phone: '+1 (555) 678-9012'
        },
        {
            id: 'BULK-008',
            customer: 'Restaurant Chain',
            items: 7,
            quantity: 600,
            amount: '$14,250',
            date: '2024-01-08',
            status: 'shipped',
            priority: 'medium',
            contact: 'Chef Maria Garcia',
            phone: '+1 (555) 789-0123'
        }
    ];

    useEffect(() => {
        // Initialize with sample data
        setOrders(sampleOrders);
        calculateStats(sampleOrders);
    }, []);

    const calculateStats = (ordersList) => {
        const stats = {
            total: ordersList.length,
            pending: ordersList.filter(o => o.status === 'pending').length,
            processing: ordersList.filter(o => o.status === 'processing').length,
            shipped: ordersList.filter(o => o.status === 'shipped').length,
            delivered: ordersList.filter(o => o.status === 'delivered').length
        };
        setStats(stats);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-3 h-3" />;
            case 'processing': return <RefreshCw className="w-3 h-3" />;
            case 'shipped': return <Truck className="w-3 h-3" />;
            case 'delivered': return <CheckCircle className="w-3 h-3" />;
            default: return <AlertCircle className="w-3 h-3" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-orange-100 text-orange-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleSelectOrder = (orderId) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        } else {
            setSelectedOrders([...selectedOrders, orderId]);
        }
    };

    const handleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(filteredOrders.map(order => order.id));
        }
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        calculateStats(updatedOrders);
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            calculateStats(updatedOrders);
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        }
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab !== 'all' && order.status !== activeTab) return false;
        if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !order.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        if (filters.status !== 'all' && order.status !== filters.status) return false;
        if (filters.dateRange !== 'all') {
            const orderDate = new Date(order.date);
            const today = new Date();
            let startDate = new Date();

            switch (filters.dateRange) {
                case 'today':
                    startDate.setDate(today.getDate() - 1);
                    break;
                case 'week':
                    startDate.setDate(today.getDate() - 7);
                    break;
                case 'month':
                    startDate.setMonth(today.getMonth() - 1);
                    break;
                default:
                    return true;
            }

            if (orderDate < startDate) return false;
        }

        return true;
    });

    const statusTabs = [
        { id: 'all', label: 'All', count: stats.total, icon: Package },
        { id: 'pending', label: 'Pending', count: stats.pending, icon: Clock },
        { id: 'processing', label: 'Processing', count: stats.processing, icon: RefreshCw },
        { id: 'shipped', label: 'Shipped', count: stats.shipped, icon: Truck },
        { id: 'delivered', label: 'Delivered', count: stats.delivered, icon: CheckCircle }
    ];

    const NewOrderModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Create New Bulk Order</h3>
                    <button onClick={() => setShowNewOrderModal(false)} className="p-1">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Enter customer name" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Enter contact person" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Enter phone number" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Enter email address" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="3" placeholder="Enter delivery address" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Items</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity</label>
                            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount ($)</label>
                        <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0.00" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                        <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows="2" placeholder="Any special requirements..." />
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowNewOrderModal(false)}
                            className="flex-1 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Create Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const FilterPanel = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-end">
            <div className="bg-white w-full max-w-sm h-full overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <button onClick={() => setShowFilter(false)} className="p-1">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                        <div className="space-y-2">
                            {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
                                <label key={status} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={filters.status === status}
                                        onChange={() => setFilters({ ...filters, status })}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 capitalize">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <select
                            value={filters.dateRange}
                            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order Amount</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <input
                                    type="number"
                                    placeholder="Min $"
                                    value={filters.minAmount}
                                    onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Max $"
                                    value={filters.maxAmount}
                                    onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
                        <select
                            value={filters.customerType}
                            onChange={(e) => setFilters({ ...filters, customerType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="all">All Customers</option>
                            <option value="corporate">Corporate</option>
                            <option value="retail">Retail Chain</option>
                            <option value="institution">Institutional</option>
                            <option value="government">Government</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setFilters({
                                    status: 'all',
                                    dateRange: 'all',
                                    minAmount: '',
                                    maxAmount: '',
                                    customerType: 'all'
                                })}
                                className="flex-1 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Reset All
                            </button>
                            <button
                                onClick={() => setShowFilter(false)}
                                className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const OrderDetailsModal = ({ order }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Order Details - {order.id}</h3>
                    <button onClick={() => setOrderDetails(null)} className="p-1">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Status</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
                                <span className="flex items-center">
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1 capitalize">{order.status}</span>
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Priority</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(order.priority)} capitalize`}>
                                {order.priority}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h4>
                            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Company:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Contact:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.contact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Phone:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h4>
                            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Total Items:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.items}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Total Quantity:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Total Amount:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.amount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Order Date:</span>
                                    <span className="text-sm font-medium text-gray-900">{order.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Update Status</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {['pending', 'processing', 'shipped', 'delivered'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(order.id, status)}
                                    className={`py-2 text-xs font-medium rounded-lg border ${order.status === status ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
                    <div className="flex space-x-3">
                        <button
                            onClick={() => {
                                handleDeleteOrder(order.id);
                                setOrderDetails(null);
                            }}
                            className="flex-1 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                        >
                            Delete Order
                        </button>
                        <button
                            onClick={() => {
                                // In a real app, this would open edit mode
                                alert('Edit functionality would open here');
                            }}
                            className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Edit Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-30">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Bulk Orders</h1>
                            <p className="text-sm text-gray-500">Manage wholesale and bulk purchases</p>
                        </div>
                        <button
                            onClick={() => setShowNewOrderModal(true)}
                            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            New Order
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders by ID or customer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </header>

            <main className="px-4 pt-4">
                {/* Stats Overview */}
                <section className="mb-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-xl shadow-sm p-3">
                            <div className="flex items-center justify-between mb-2">
                                <Package className="w-5 h-5 text-blue-600" />
                                <span className="text-xs font-medium text-gray-500">Total Orders</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                            <div className="text-xs text-gray-500">This month</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-3">
                            <div className="flex items-center justify-between mb-2">
                                <ShoppingCart className="w-5 h-5 text-green-600" />
                                <span className="text-xs font-medium text-gray-500">Total Value</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">$197,750</div>
                            <div className="text-xs text-gray-500">+15% from last month</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-3">
                            <div className="flex items-center justify-between mb-2">
                                <Users className="w-5 h-5 text-purple-600" />
                                <span className="text-xs font-medium text-gray-500">Active Clients</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">24</div>
                            <div className="text-xs text-gray-500">8 new this month</div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-3">
                            <div className="flex items-center justify-between mb-2">
                                <Percent className="w-5 h-5 text-orange-600" />
                                <span className="text-xs font-medium text-gray-500">Avg. Discount</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">12.5%</div>
                            <div className="text-xs text-gray-500">For bulk orders</div>
                        </div>
                    </div>
                </section>

                {/* Status Tabs */}
                <section className="mb-4">
                    <div className="overflow-x-auto">
                        <div className="flex space-x-2 pb-2 min-w-max">
                            {statusTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                        : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4 mr-1.5" />
                                    {tab.label}
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Action Bar */}
                <section className="mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleSelectAll}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                {selectedOrders.length === filteredOrders.length ? 'Deselect All' : 'Select All'}
                            </button>
                            {selectedOrders.length > 0 && (
                                <span className="text-sm text-gray-500">
                                    {selectedOrders.length} selected
                                </span>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowFilter(true)}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            >
                                <Filter className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Orders List */}
                <section>
                    <div className="space-y-3">
                        {filteredOrders.map((order) => (
                            <div
                                key={order.id}
                                className={`bg-white rounded-xl shadow-sm overflow-hidden border ${selectedOrders.includes(order.id) ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}`}
                            >
                                <div className="p-3">
                                    {/* Order Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders.includes(order.id)}
                                                    onChange={() => handleSelectOrder(order.id)}
                                                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                                                    <p className="text-sm text-gray-600">{order.customer}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setOrderDetails(order)}
                                            className="p-1 text-gray-400 hover:text-gray-600"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Order Details */}
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Items:</span>
                                                <span className="font-medium text-gray-900">{order.items}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Quantity:</span>
                                                <span className="font-medium text-gray-900">{order.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Amount:</span>
                                                <span className="font-medium text-gray-900">{order.amount}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-medium text-gray-900">{order.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status and Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                <span className="flex items-center">
                                                    {getStatusIcon(order.status)}
                                                    <span className="ml-1 capitalize">{order.status}</span>
                                                </span>
                                            </span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(order.priority)} capitalize`}>
                                                {order.priority}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={() => setOrderDetails(order)}
                                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => alert('Edit order: ' + order.id)}
                                                className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-8">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-gray-500 font-medium">No orders found</h3>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 z-20">
                <div className="flex justify-between items-center">
                    {[
                        { icon: BarChart3, label: 'Dashboard', active: false },
                        { icon: Package, label: 'Orders', active: true },
                        { icon: ShoppingCart, label: 'Catalog', active: false },
                        { icon: FileText, label: 'Invoices', active: false },
                        { icon: Users, label: 'Clients', active: false },
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

            {/* Modals */}
            {showFilter && <FilterPanel />}
            {showNewOrderModal && <NewOrderModal />}
            {orderDetails && <OrderDetailsModal order={orderDetails} />}
        </div>
    );
};

export default BulkOrders;