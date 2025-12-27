import React, { useState, useEffect } from "react";
import {
    Search,
    Package,
    Truck,
    CheckCircle,
    AlertCircle,
    Clock,
    MapPin,
    Phone,
    Mail,
    ChevronRight,
    Home,
    ShoppingBag,
    CreditCard,
    Shield,
    RefreshCw,
    Download,
    Printer,
    Share2,
    HelpCircle,
    ArrowLeft,
    Star,
    MessageSquare,
    X,
    Filter,
    Calendar,
    User,
    Hash,
    DollarSign,
    Box,
    Layers,
    CheckSquare,
    ArrowRight,
    ExternalLink,
    Bell,
    Heart,
    ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Order = () => {
    const [orderId, setOrderId] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("details");
    const [showAllItems, setShowAllItems] = useState(false);

    // Mock order data - replace with API call
    const mockOrderData = {
        id: "ORD-2024-789456",
        date: "2024-01-15",
        status: "in_transit",
        estimatedDelivery: "2024-01-20",
        customer: {
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "+1 (555) 123-4567",
            shippingAddress: {
                street: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                zipCode: "94107",
                country: "United States",
            },
            billingAddress: {
                street: "456 Corporate Blvd",
                city: "San Francisco",
                state: "CA",
                zipCode: "94107",
                country: "United States",
            },
        },
        payment: {
            method: "Credit Card",
            status: "paid",
            lastFour: "1234",
            amount: 356.99,
        },
        shipping: {
            method: "Express Delivery",
            carrier: "UPS",
            trackingNumber: "1Z999AA1234567890",
            cost: 12.99,
        },
        items: [
            {
                id: 1,
                name: "Wireless Bluetooth Earbuds Pro",
                price: 79.99,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
                status: "shipped",
                deliveryDate: "2024-01-20",
            },
            {
                id: 2,
                name: "Smart Watch Series 8",
                price: 249.99,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
                status: "shipped",
                deliveryDate: "2024-01-20",
            },
            {
                id: 3,
                name: "Phone Case - Clear Matte",
                price: 14.99,
                quantity: 2,
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w-200&h=200&fit=crop",
                status: "processing",
                deliveryDate: "2024-01-22",
            },
            {
                id: 4,
                name: "USB-C Fast Charger 65W",
                price: 29.99,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1595709486770-88c0c8c5f6ca?w=200&h=200&fit=crop",
                status: "shipped",
                deliveryDate: "2024-01-20",
            },
            {
                id: 5,
                name: "Wireless Charging Pad",
                price: 19.99,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=200&h=200&fit=crop",
                status: "delivered",
                deliveryDate: "2024-01-18",
            },
        ],
        timeline: [
            {
                id: 1,
                status: "ordered",
                title: "Order Placed",
                description: "Your order has been received",
                date: "2024-01-15",
                time: "10:30 AM",
                completed: true,
            },
            {
                id: 2,
                status: "confirmed",
                title: "Order Confirmed",
                description: "We've confirmed your order",
                date: "2024-01-15",
                time: "11:45 AM",
                completed: true,
            },
            {
                id: 3,
                status: "processing",
                title: "Processing",
                description: "Your items are being prepared",
                date: "2024-01-16",
                time: "09:15 AM",
                completed: true,
            },
            {
                id: 4,
                status: "shipped",
                title: "Shipped",
                description: "Package handed to carrier",
                date: "2024-01-17",
                time: "02:30 PM",
                completed: true,
            },
            {
                id: 5,
                status: "in_transit",
                title: "In Transit",
                description: "Package is on the way",
                date: "2024-01-18",
                time: "08:00 AM",
                completed: true,
                current: true,
            },
            {
                id: 6,
                status: "out_for_delivery",
                title: "Out for Delivery",
                description: "Package will be delivered today",
                date: "2024-01-20",
                time: "06:00 AM",
                completed: false,
            },
            {
                id: 7,
                status: "delivered",
                title: "Delivered",
                description: "Package delivered successfully",
                date: "2024-01-20",
                time: "Estimated 4-8 PM",
                completed: false,
            },
        ],
        deliveryUpdates: [
            {
                id: 1,
                location: "San Francisco, CA",
                status: "Package arrived at facility",
                time: "Today, 08:30 AM",
                icon: "🏢",
            },
            {
                id: 2,
                location: "Oakland, CA",
                status: "Package departed from facility",
                time: "Yesterday, 05:45 PM",
                icon: "🚚",
            },
            {
                id: 3,
                location: "Los Angeles, CA",
                status: "Package processed",
                time: "Jan 17, 10:20 AM",
                icon: "📦",
            },
        ],
        summary: {
            subtotal: 394.95,
            shipping: 12.99,
            tax: 31.60,
            discount: -82.55,
            total: 356.99,
        },
    };

    const statusConfig = {
        ordered: { label: "Ordered", color: "bg-blue-100 text-blue-800", icon: <Clock size={16} /> },
        confirmed: { label: "Confirmed", color: "bg-purple-100 text-purple-800", icon: <CheckCircle size={16} /> },
        processing: { label: "Processing", color: "bg-amber-100 text-amber-800", icon: <Package size={16} /> },
        shipped: { label: "Shipped", color: "bg-indigo-100 text-indigo-800", icon: <Truck size={16} /> },
        in_transit: { label: "In Transit", color: "bg-sky-100 text-sky-800", icon: <Truck size={16} /> },
        out_for_delivery: { label: "Out for Delivery", color: "bg-orange-100 text-orange-800", icon: <Truck size={16} /> },
        delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: <CheckCircle size={16} /> },
        cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: <AlertCircle size={16} /> },
    };

    const handleTrackOrder = (e) => {
        e.preventDefault();
        if (!orderId.trim()) {
            setError("Please enter an Order ID");
            return;
        }

        setLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            // In real app, fetch from API
            if (orderId === "ORD-2024-789456") {
                setTrackingData(mockOrderData);
            } else {
                setError("Order not found. Please check your Order ID and try again.");
                setTrackingData(null);
            }
            setLoading(false);
        }, 1000);
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "shipped":
            case "in_transit":
            case "out_for_delivery":
                return <Truck className="text-blue-500" size={20} />;
            case "delivered":
                return <CheckCircle className="text-green-500" size={20} />;
            case "processing":
                return <Package className="text-amber-500" size={20} />;
            default:
                return <Package className="text-gray-500" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "text-green-600 bg-green-50 border-green-200";
            case "shipped":
            case "in_transit":
                return "text-blue-600 bg-blue-50 border-blue-200";
            case "processing":
                return "text-amber-600 bg-amber-50 border-amber-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const OrderHeader = () => (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Link to="/orders" className="p-2 bg-white/20 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Track Your Order</h1>
                        <p className="text-purple-100 text-sm">Real-time tracking updates</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                    <button className="p-2 bg-white/20 rounded-lg">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg">
                        <Printer size={20} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Hash size={18} />
                        <span className="font-mono font-bold text-lg">{trackingData.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} />
                        <span>Placed on {formatDate(trackingData.date)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full border ${getStatusColor(trackingData.status)} flex items-center gap-2`}>
                        {getStatusIcon(trackingData.status)}
                        <span className="font-semibold">{statusConfig[trackingData.status]?.label}</span>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-purple-100">Total Amount</div>
                        <div className="text-xl font-bold">${trackingData.summary.total.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const TrackingTimeline = () => (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Delivery Timeline</h2>
                <div className="text-sm text-gray-600">
                    Est. delivery: <span className="font-semibold">{formatDate(trackingData.estimatedDelivery)}</span>
                </div>
            </div>

            <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
                    <div
                        className="bg-blue-500 transition-all duration-300"
                        style={{
                            height: `${(trackingData.timeline.filter(t => t.completed).length / trackingData.timeline.length) * 100}%`
                        }}
                    ></div>
                </div>

                {/* Timeline Steps */}
                <div className="space-y-8">
                    {trackingData.timeline.map((step, index) => (
                        <div key={step.id} className="relative flex gap-4">
                            <div className="relative z-10 flex-shrink-0">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.completed
                                    ? step.current
                                        ? "bg-blue-500 text-white"
                                        : "bg-green-500 text-white"
                                    : "bg-gray-100 text-gray-400"
                                    }`}>
                                    {step.completed ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <Clock size={20} />
                                    )}
                                </div>
                            </div>
                            <div className={`flex-1 pb-8 ${index === trackingData.timeline.length - 1 ? '' : 'border-b border-gray-100'}`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{step.title}</h3>
                                        <p className="text-sm text-gray-600">{step.description}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {step.date} • {step.time}
                                    </div>
                                </div>
                                {step.current && (
                                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                        <Clock size={12} />
                                        Current Status
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Updates */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Updates</h3>
                <div className="space-y-3">
                    {trackingData.deliveryUpdates.map((update) => (
                        <div key={update.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl">{update.icon}</div>
                            <div className="flex-1">
                                <div className="font-medium text-gray-800">{update.status}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={12} />
                                    {update.location}
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">{update.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const OrderItems = () => {
        const displayedItems = showAllItems ? trackingData.items : trackingData.items.slice(0, 3);

        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-800">Order Items ({trackingData.items.length})</h2>
                    <button
                        onClick={() => setShowAllItems(!showAllItems)}
                        className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                        {showAllItems ? 'Show Less' : 'View All'}
                        <ChevronRight size={16} className={showAllItems ? 'rotate-90' : ''} />
                    </button>
                </div>

                <div className="space-y-4">
                    {displayedItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop";
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                                            <div className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                item.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-amber-100 text-amber-800'
                                                }`}>
                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</div>
                                        <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                                        {item.deliveryDate && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                Est: {formatDate(item.deliveryDate)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors">
                                        <ShoppingCart size={14} />
                                        Reorder
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors">
                                        <MessageSquare size={14} />
                                        Support
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-600">
                                        <Heart size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-800">${trackingData.summary.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-800">${trackingData.summary.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax</span>
                            <span className="text-gray-800">${trackingData.summary.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Discount</span>
                            <span className="text-green-600">-${Math.abs(trackingData.summary.discount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-gray-100 font-bold text-lg">
                            <span className="text-gray-800">Total</span>
                            <span className="text-gray-800">${trackingData.summary.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const OrderDetailsTabs = () => (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                    {["details", "shipping", "payment", "support"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? "border-purple-600 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === "details" && (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Shipping Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-gray-400 mt-0.5" size={18} />
                                    <div>
                                        <div className="font-medium text-gray-800">{trackingData.customer.name}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {trackingData.customer.shippingAddress.street}<br />
                                            {trackingData.customer.shippingAddress.city}, {trackingData.customer.shippingAddress.state} {trackingData.customer.shippingAddress.zipCode}<br />
                                            {trackingData.customer.shippingAddress.country}
                                        </div>
                                        <div className="flex items-center gap-4 mt-3 text-sm">
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Phone size={14} />
                                                {trackingData.customer.phone}
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Mail size={14} />
                                                {trackingData.customer.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Shipping Method</h3>
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-blue-500" size={20} />
                                    <div>
                                        <div className="font-medium text-gray-800">{trackingData.shipping.method}</div>
                                        <div className="text-sm text-gray-600">{trackingData.shipping.carrier}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-800">${trackingData.shipping.cost.toFixed(2)}</div>
                                    <div className="text-sm text-gray-600">
                                        Tracking: <span className="font-mono">{trackingData.shipping.trackingNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "shipping" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Truck className="text-blue-600" size={24} />
                                <div>
                                    <div className="font-semibold text-blue-800">Track with Carrier</div>
                                    <div className="text-sm text-blue-600">Get real-time updates from {trackingData.shipping.carrier}</div>
                                </div>
                            </div>
                            <a
                                href={`https://www.ups.com/track?tracknum=${trackingData.shipping.trackingNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                            >
                                Track on UPS
                                <ExternalLink size={14} />
                            </a>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Delivery Instructions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <span className="text-gray-700">Leave at door if no response</span>
                                    <input type="radio" name="instructions" className="w-4 h-4 text-blue-600" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <span className="text-gray-700">Require signature</span>
                                    <input type="radio" name="instructions" defaultChecked className="w-4 h-4 text-blue-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "payment" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <CreditCard className="text-gray-600" size={24} />
                                <div>
                                    <div className="font-medium text-gray-800">{trackingData.payment.method}</div>
                                    <div className="text-sm text-gray-600">•••• {trackingData.payment.lastFour}</div>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${trackingData.payment.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                                }`}>
                                {trackingData.payment.status.charAt(0).toUpperCase() + trackingData.payment.status.slice(1)}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Billing Address</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-600">
                                    {trackingData.customer.billingAddress.street}<br />
                                    {trackingData.customer.billingAddress.city}, {trackingData.customer.billingAddress.state} {trackingData.customer.billingAddress.zipCode}<br />
                                    {trackingData.customer.billingAddress.country}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "support" && (
                    <div className="space-y-6">
                        <div className="text-center py-8">
                            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
                            <p className="text-gray-600 mb-6">Our support team is here to assist you</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2">
                                    <MessageSquare className="text-blue-500" size={24} />
                                    <span className="font-medium text-gray-800">Chat Support</span>
                                    <span className="text-sm text-gray-600">24/7 Available</span>
                                </button>
                                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2">
                                    <Phone className="text-green-500" size={24} />
                                    <span className="font-medium text-gray-800">Call Us</span>
                                    <span className="text-sm text-gray-600">1-800-123-4567</span>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="text-amber-600 mt-0.5" size={18} />
                                <div>
                                    <div className="font-medium text-amber-800">Delivery Issues?</div>
                                    <div className="text-sm text-amber-700 mt-1">
                                        If you experience any issues with delivery, please contact our support team immediately.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const QuickActions = () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                <RefreshCw className="text-blue-500" size={20} />
                <span className="text-sm font-medium text-gray-700">Reorder</span>
            </button>
            <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                <Download className="text-green-500" size={20} />
                <span className="text-sm font-medium text-gray-700">Invoice</span>
            </button>
            <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                <Bell className="text-purple-500" size={20} />
                <span className="text-sm font-medium text-gray-700">Alerts</span>
            </button>
            <button className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                <HelpCircle className="text-amber-500" size={20} />
                <span className="text-sm font-medium text-gray-700">Help</span>
            </button>
        </div>
    );

    // Main render
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Search Header */}
            {!trackingData ? (
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
                            <p className="text-purple-100">Enter your Order ID to track delivery status</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <form onSubmit={handleTrackOrder} className="space-y-4">
                                <div>
                                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                                        Order ID / Tracking Number
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            id="orderId"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            placeholder="Enter ORD-2024-XXXXXX or tracking number"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        You can find your Order ID in your order confirmation email
                                    </p>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                                        <AlertCircle className="text-red-500" size={20} />
                                        <div className="text-red-700">{error}</div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <RefreshCw className="animate-spin" size={20} />
                                            Tracking...
                                        </>
                                    ) : (
                                        <>
                                            <Search size={20} />
                                            Track Order
                                        </>
                                    )}
                                </button>

                                {/* Example IDs */}
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 mb-2">Try these example IDs:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["ORD-2024-789456", "ORD-2024-123456", "ORD-2024-654321"].map((exampleId) => (
                                            <button
                                                key={exampleId}
                                                type="button"
                                                onClick={() => {
                                                    setOrderId(exampleId);
                                                    document.getElementById('orderId').focus();
                                                }}
                                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                                            >
                                                {exampleId}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Package size={24} />
                                </div>
                                <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                                <p className="text-sm text-purple-100">Live updates every step of the way</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Bell size={24} />
                                </div>
                                <h3 className="font-semibold mb-1">Delivery Alerts</h3>
                                <p className="text-sm text-purple-100">Get notified about status changes</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Shield size={24} />
                                </div>
                                <h3 className="font-semibold mb-1">Safe Delivery</h3>
                                <p className="text-sm text-purple-100">Secure and contactless options</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto px-4">
                    {/* Order Header */}
                    <OrderHeader />

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-6 px-4">
                        {/* Left Column - Timeline */}
                        <div className="lg:col-span-2 space-y-6">
                            <TrackingTimeline />
                            <OrderItems />
                        </div>

                        {/* Right Column - Details & Actions */}
                        <div className="space-y-6">
                            <OrderDetailsTabs />
                            <QuickActions />

                            {/* Support Card */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6">
                                <div className="flex items-start gap-3">
                                    <Shield size={24} />
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">Need Immediate Help?</h3>
                                        <p className="text-blue-100 mb-4">Our support team is available 24/7</p>
                                        <div className="flex gap-3">
                                            <button className="flex-1 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg">
                                                Chat Now
                                            </button>
                                            <button className="flex-1 bg-white/20 hover:bg-white/30 font-semibold py-2 px-4 rounded-lg">
                                                Call: 1-800-123-4567
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Actions */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Related Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <span className="text-gray-700">Return Items</span>
                                        <ArrowRight size={16} className="text-gray-400" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <span className="text-gray-700">Request Invoice</span>
                                        <ArrowRight size={16} className="text-gray-400" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <span className="text-gray-700">Write a Review</span>
                                        <ArrowRight size={16} className="text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Search */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setTrackingData(null);
                                setOrderId("");
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg shadow-sm border border-gray-200 transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Track Another Order
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            {trackingData && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600">
                                <Home size={20} />
                                <span className="text-xs">Home</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600">
                                <ShoppingBag size={20} />
                                <span className="text-xs">Orders</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-purple-600">
                                <Package size={20} />
                                <span className="text-xs">Track</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600">
                                <User size={20} />
                                <span className="text-xs">Account</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-purple-600">
                                <HelpCircle size={20} />
                                <span className="text-xs">Help</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add padding for mobile navigation */}
            <div className="pb-16 md:pb-0"></div>
        </div>
    );
};

export default Order;