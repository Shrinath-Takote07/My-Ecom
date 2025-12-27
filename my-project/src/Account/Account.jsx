import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Package,
  Truck,
  CheckCircle,
  Star,
  Edit,
  Camera,
  Shield,
  Lock,
  Mail,
  Phone,
  Calendar,
  Award,
  Wallet,
  Gift,
  Tag,
  RefreshCw,
  MessageSquare,
  FileText,
  Home,
  Globe,
  Users,
} from "lucide-react";

const AccountSection = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    birthday: "1990-05-15",
    gender: "Male",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
  });

  // Recent orders
  const recentOrders = [
    {
      id: "ORD-789456",
      date: "Jan 12, 2024",
      items: 3,
      total: 299.99,
      status: "Delivered",
      statusColor: "text-green-600 bg-green-50",
      itemsDetails: [
        { name: "Wireless Headphones", qty: 1 },
        { name: "Phone Case", qty: 2 },
      ],
    },
    {
      id: "ORD-123456",
      date: "Jan 5, 2024",
      items: 2,
      total: 149.99,
      status: "Processing",
      statusColor: "text-blue-600 bg-blue-50",
      itemsDetails: [
        { name: "Smart Watch", qty: 1 },
        { name: "Charging Cable", qty: 1 },
      ],
    },
    {
      id: "ORD-654321",
      date: "Dec 28, 2023",
      items: 1,
      total: 89.99,
      status: "Shipped",
      statusColor: "text-purple-600 bg-purple-50",
      itemsDetails: [{ name: "Running Shoes", qty: 1 }],
    },
  ];

  // Saved addresses
  const savedAddresses = [
    {
      id: 1,
      type: "Home",
      name: "Alex Johnson",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Alex Johnson",
      address: "456 Business Ave, Suite 500",
      city: "New York, NY 10001",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      number: "**** **** **** 4321",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "MasterCard",
      number: "**** **** **** 8765",
      expiry: "08/24",
      isDefault: false,
    },
    {
      id: 3,
      type: "PayPal",
      email: "alex.johnson@example.com",
      isDefault: false,
    },
  ];

  // Statistics
  const stats = {
    totalOrders: 24,
    totalSpent: 2549.99,
    wishlistItems: 12,
    loyaltyPoints: 1250,
  };

  // Navigation tabs
  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "orders", name: "My Orders", icon: ShoppingBag },
    { id: "wishlist", name: "Wishlist", icon: Heart },
    { id: "addresses", name: "Addresses", icon: MapPin },
    { id: "payments", name: "Payment Methods", icon: CreditCard },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "settings", name: "Settings", icon: Settings },
    { id: "help", name: "Help Center", icon: HelpCircle },
  ];

  // Quick actions
  const quickActions = [
    { icon: Package, label: "Track Order", color: "bg-blue-100 text-blue-600" },
    {
      icon: RefreshCw,
      label: "Return Items",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MessageSquare,
      label: "Support Chat",
      color: "bg-purple-100 text-purple-600",
    },
    { icon: FileText, label: "Invoices", color: "bg-amber-100 text-amber-600" },
  ];

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    alert("You have been logged out successfully!");
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "orders":
        return <OrdersContent />;
      case "wishlist":
        return <WishlistContent />;
      case "addresses":
        return <AddressesContent />;
      case "payments":
        return <PaymentsContent />;
      case "notifications":
        return <NotificationsContent />;
      case "settings":
        return <SettingsContent />;
      case "help":
        return <HelpContent />;
      default:
        return <DashboardContent />;
    }
  };

  // Dashboard Content Component
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {profileData.name}!
            </h2>
            <p className="opacity-90">
              Manage your account, track orders, and explore exclusive offers
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Award className="w-6 h-6" />
            <span className="font-semibold">Gold Member</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.totalOrders}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <ShoppingBag className="text-purple-600 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                ${stats.totalSpent.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <Wallet className="text-green-600 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.wishlistItems}
              </div>
              <div className="text-sm text-gray-600">Wishlist Items</div>
            </div>
            <Heart className="text-red-600 w-8 h-8" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.loyaltyPoints}
              </div>
              <div className="text-sm text-gray-600">Loyalty Points</div>
            </div>
            <Award className="text-amber-600 w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${action.color} mb-2`}
                >
                  <Icon size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">Recent Orders</h3>
          <Link
            to="/orders"
            className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {order.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.items} items • Total: ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Track Order
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="text-purple-600 w-5 h-5" />
              <h3 className="font-bold text-lg text-gray-800">
                Special Offers Just For You
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Get 20% off on your next purchase. Limited time offer!
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
              Claim Offer
            </button>
          </div>
          <div className="hidden md:block">
            <Tag className="w-16 h-16 text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );

  // Orders Content Component
  const OrdersContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Orders</h2>
          <p className="text-gray-600">Track, return, or buy things again</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Orders</option>
            <option>Last 30 days</option>
            <option>Last 6 months</option>
            <option>2024</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Filter Orders
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {[...recentOrders, ...recentOrders].map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-800">{order.id}</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.items} items
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Items Ordered
                </h4>
                <div className="space-y-2">
                  {order.itemsDetails.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">{item.name}</span>
                      <span className="text-gray-800">Qty: {item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Track Package
                </button>
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  View Invoice
                </button>
                <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Buy Again
                </button>
                {order.status === "Delivered" && (
                  <button className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                    Return Items
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Wishlist Content Component
  const WishlistContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Wishlist</h2>
          <p className="text-gray-600">Items you've saved for later</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{stats.wishlistItems} items</span>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Share Wishlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Product Name {item}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600">4.5 (128 reviews)</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-gray-800">$99.99</div>
                  <div className="text-sm text-gray-400 line-through">
                    $129.99
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm">
                  Remove
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Addresses Content Component
  const AddressesContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Saved Addresses
          </h2>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          + Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-800">
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-800">{address.name}</p>
                <p className="text-gray-600">{address.address}</p>
                <p className="text-gray-600">{address.city}</p>
                <p className="text-gray-600 mt-2">Phone: {address.phone}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-purple-600">
                <Edit size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              {address.isDefault ? (
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Address
                </button>
              ) : (
                <>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Set as Default
                  </button>
                  <button className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Payments Content Component
  const PaymentsContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Methods
          </h2>
          <p className="text-gray-600">Manage your saved payment options</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          + Add New Card
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {method.type === "PayPal" ? (
                    <span className="text-blue-600 font-bold">PP</span>
                  ) : (
                    <CreditCard className="text-gray-600" size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">
                      {method.type}
                    </span>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    {method.type === "PayPal" ? method.email : method.number}
                  </p>
                  {method.expiry && (
                    <p className="text-gray-600 text-sm">
                      Expires {method.expiry}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    Set Default
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <TrashIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 w-6 h-6 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Payment Security</h3>
            <p className="text-gray-600 text-sm mb-3">
              Your payment information is encrypted and securely stored. We
              never share your financial details with third parties.
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Learn more about security
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Notifications Content Component
  const NotificationsContent = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Notifications</h2>
        <p className="text-gray-600">Manage your notification preferences</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Notification Settings
        </h3>

        <div className="space-y-4">
          {[
            {
              label: "Order Updates",
              desc: "Get notified about order status changes",
            },
            {
              label: "Price Drops",
              desc: "Alert when items in your wishlist go on sale",
            },
            {
              label: "New Arrivals",
              desc: "Be the first to know about new products",
            },
            {
              label: "Promotional Offers",
              desc: "Receive special offers and discounts",
            },
            {
              label: "Security Alerts",
              desc: "Important updates about your account security",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <div className="font-medium text-gray-800">{item.label}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings Content Component
  const SettingsContent = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Account Settings
        </h2>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-gray-800">
            Profile Information
          </h3>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            {isEditingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditingProfile && (
                <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      handleProfileUpdate("name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.name}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      handleProfileUpdate("email", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditingProfile ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      handleProfileUpdate("phone", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="text-gray-800">{profileData.phone}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Birthday
                </label>
                {isEditingProfile ? (
                  <input
                    type="date"
                    value={profileData.birthday}
                    onChange={(e) =>
                      handleProfileUpdate("birthday", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="text-gray-800">
                    {new Date(profileData.birthday).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            {isEditingProfile && (
              <div className="pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-800">Change Password</div>
              <div className="text-sm text-gray-600">
                Update your account password
              </div>
            </div>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="font-medium text-gray-800">
                Two-Factor Authentication
              </div>
              <div className="text-sm text-gray-600">
                Add an extra layer of security
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium text-gray-800">Connected Devices</div>
              <div className="text-sm text-gray-600">
                Manage your active sessions
              </div>
            </div>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Account Actions
        </h3>

        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
            Delete Account
          </button>
          <button className="w-full text-left px-4 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
            Download Account Data
          </button>
        </div>
      </div>
    </div>
  );

  // Help Content Component
  const HelpContent = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Help Center</h2>
        <p className="text-gray-600">Get help with your account and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <HelpCircle className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">FAQs</h3>
          <p className="text-gray-600 text-sm mb-4">
            Find answers to common questions
          </p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Browse FAQs →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <MessageSquare className="text-green-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-4">
            Chat with our support team
          </p>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Start Chat →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Phone className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
          <p className="text-gray-600 text-sm mb-4">
            Get in touch with our team
          </p>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Contact Support →
          </button>
        </div>
      </div>
    </div>
  );

  // Trash Icon Component
  const TrashIcon = ({ size }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <User className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  My Account
                </h1>
                <p className="text-gray-600">
                  Manage your profile, orders, and preferences
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>

          {/* Mobile Profile Summary */}
          <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{profileData.name}</h3>
                <p className="text-sm text-gray-600">{profileData.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    Gold Member
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {stats.loyaltyPoints} points
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation - Desktop */}
          <div className="lg:w-1/4">
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              {/* Profile Summary - Desktop */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {profileData.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{profileData.email}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                      Gold Member
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {stats.loyaltyPoints} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? "bg-purple-50 text-purple-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={20} />
                            <span className="font-medium">{tab.name}</span>
                          </div>
                          <ChevronRight size={16} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Support Section */}
              <div className="p-4 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="text-blue-600 w-5 h-5" />
                    <span className="font-medium text-gray-800">
                      Need Help?
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Our support team is here to help you 24/7
                  </p>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Tabs */}
            <div className="lg:hidden">
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-3 px-3">
                {tabs.slice(0, 4).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center p-3 rounded-lg min-w-[80px] transition-colors ${
                        activeTab === tab.id
                          ? "bg-purple-50 text-purple-700"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-xs mt-1 font-medium">
                        {tab.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-3 px-3 mt-2">
                {tabs.slice(4).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center p-3 rounded-lg min-w-[80px] transition-colors ${
                        activeTab === tab.id
                          ? "bg-purple-50 text-purple-700"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-xs mt-1 font-medium">
                        {tab.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
