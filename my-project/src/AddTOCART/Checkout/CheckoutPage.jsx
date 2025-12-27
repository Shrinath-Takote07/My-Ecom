import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Clock,
  RefreshCw,
  ChevronRight,
  Radio,
  Building,
  Home,
  Briefcase,
  Gift,
  Tag,
  Bell,
  Globe,
  Smartphone,
  QrCode,
  Wallet,
  Banknote,
  Receipt,
  FileText,
  Download,
  Printer,
  Share2,
  Eye,
  EyeOff,
  Trash2,
  X,
} from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: Address, 2: Payment, 3: Review, 4: Success
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [savePaymentMethod, setSavePaymentMethod] = useState(true);
  const [showCVV, setShowCVV] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [useDifferentShipping, setUseDifferentShipping] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Fetch cart items from backend
  const [cartItems, setCartItems] = useState([]);

  // Calculate order summary dynamically from cart items using useMemo
  const orderSummary = React.useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    const shipping = 0; // Free shipping
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const discountApplied = appliedPromo ? appliedPromo.discount : 0;
    const total = subtotal + shipping + tax - discountApplied;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: shipping,
      tax: parseFloat(tax.toFixed(2)),
      discount: discountApplied,
      total: parseFloat(total.toFixed(2)),
      items: cartItems.length,
    };
  }, [cartItems, appliedPromo]);

  // Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      name: "Home",
      fullName: "John Doe",
      address: "123 Main Street",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
      icon: Home,
    },
    {
      id: 2,
      type: "work",
      name: "Office",
      fullName: "John Doe",
      address: "456 Business Ave, Suite 500",
      city: "New York, NY 10001",
      phone: "+1 (555) 987-6543",
      isDefault: false,
      icon: Briefcase,
    },
    {
      id: 3,
      type: "other",
      name: "Other",
      fullName: "Jane Smith",
      address: "789 Park Avenue",
      city: "New York, NY 10001",
      phone: "+1 (555) 456-7890",
      isDefault: false,
      icon: Building,
    },
  ]);

  // Fetch cart items from backend on component mount
  useEffect(() => {
    fetch("https://my-ecommm.vercel.app/api/carts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart items");
        return res.json();
      })
      .then((json) => {
        setCartItems(Array.isArray(json) ? json : []);
      })
      .catch((err) => {
        console.error("❌ Error fetching cart items:", err);
        setCartItems([]);
      });
  }, []);

  const [selectedAddress, setSelectedAddress] = useState(1);

  // Payment methods
  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay with Visa, MasterCard, or American Express",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Pay securely with your PayPal account",
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: Smartphone,
      description: "Pay with Apple Pay",
    },
    {
      id: "google-pay",
      name: "Google Pay",
      icon: QrCode,
      description: "Pay with Google Pay",
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when you receive your order",
    },
  ];

  // Card details
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    type: "visa",
  });

  // Contact info
  const [contactInfo, setContactInfo] = useState({
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  // Gift options
  const [giftOptions, setGiftOptions] = useState({
    isGift: false,
    message: "",
    giftWrap: false,
    giftWrapType: "standard",
    giftWrapPrice: 4.99,
  });

  // Delivery options
  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 0,
      time: "3-5 business days",
      description: "Free shipping",
      icon: Truck,
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 9.99,
      time: "1-2 business days",
      description: "Get it faster",
      icon: Clock,
    },
    {
      id: "same-day",
      name: "Same Day Delivery",
      price: 19.99,
      time: "Today",
      description: "Available in select areas",
      icon: Package,
    },
  ];

  const [selectedDelivery, setSelectedDelivery] = useState("standard");

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle promo code
  const applyPromoCode = () => {
    if (promoCode.trim() === "SAVE10") {
      setAppliedPromo({
        code: promoCode,
        discount: 49.0,
      });
      alert("Promo code applied successfully!");
    } else {
      alert("Invalid promo code. Try 'SAVE10' for demo.");
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newOrderId =
        "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(newOrderId);
      setOrderPlaced(true);
      nextStep();
      setIsLoading(false);
    }, 2000);
  };

  // Place order
  const placeOrder = () => {
    handlePayment();
  };

  // Download invoice
  const downloadInvoice = () => {
    alert("Invoice downloaded successfully!");
  };

  // Share order
  const shareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Order",
        text: `Order #${orderId} placed successfully!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Order #${orderId} placed successfully!`);
      alert("Order details copied to clipboard!");
    }
  };

  // Track order
  const trackOrder = () => {
    navigate(`/track-order/${orderId}`);
  };

  // Continue shopping
  const continueShopping = () => {
    navigate("/");
  };

  // Progress steps
  const progressSteps = [
    {
      number: 1,
      label: "Address",
      status: currentStep >= 1 ? "completed" : "pending",
    },
    {
      number: 2,
      label: "Payment",
      status: currentStep >= 2 ? "completed" : "pending",
    },
    {
      number: 3,
      label: "Review",
      status: currentStep >= 3 ? "completed" : "pending",
    },
    {
      number: 4,
      label: "Confirmation",
      status: currentStep >= 4 ? "completed" : "pending",
    },
  ];

  // Mobile back button
  const MobileBackButton = () => (
    <button
      onClick={prevStep}
      className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </button>
  );

  // Order summary sidebar component
  const OrderSummary = ({ isMobile = false }) => (
    <div
      className={`bg-white rounded-lg border border-gray-200 ${isMobile ? "mb-6" : "sticky top-6"
        }`}
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-gray-800">Order Summary</h3>
      </div>

      <div className="p-4">
        {/* Items */}
        <div className="space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{item.color}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-gray-800">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price breakdown */}
        <div className="space-y-2 border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Subtotal ({orderSummary.items} items)
            </span>
            <span>${orderSummary.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span
              className={orderSummary.shipping === 0 ? "text-green-600" : ""}
            >
              {orderSummary.shipping === 0
                ? "FREE"
                : `$${orderSummary.shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Tax</span>
            <span>${orderSummary.tax.toFixed(2)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-green-600">
              <span>Promo Discount ({appliedPromo.code})</span>
              <span>-${appliedPromo.discount.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Including ${orderSummary.tax.toFixed(2)} in taxes
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Shield className="w-4 h-4" />
            <span>30-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 1: Address Selection
  const AddressStep = () => (
    <div className="space-y-6">
      <MobileBackButton />

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select Delivery Address
        </h2>
        <p className="text-gray-600">
          Choose where you want your items delivered
        </p>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.map((address) => {
          const Icon = address.icon;
          return (
            <div
              key={address.id}
              onClick={() => setSelectedAddress(address.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedAddress === address.id
                  ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                  : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${selectedAddress === address.id
                        ? "bg-purple-100"
                        : "bg-gray-100"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${selectedAddress === address.id
                          ? "text-purple-600"
                          : "text-gray-600"
                        }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {address.name}
                      </h3>
                      {address.isDefault && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800">{address.fullName}</p>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">{address.city}</p>
                    <p className="text-gray-600 mt-2">Phone: {address.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-purple-600">
                    <Edit size={18} />
                  </button>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === address.id
                        ? "border-purple-600 bg-purple-600"
                        : "border-gray-300"
                      }`}
                  >
                    {selectedAddress === address.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Address */}
      <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 hover:bg-purple-50 transition-colors">
        <div className="flex items-center justify-center gap-2">
          <Plus size={20} />
          <span className="font-medium text-gray-700">Add New Address</span>
        </div>
      </button>

      {/* Delivery Options */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Delivery Options
        </h3>
        <div className="space-y-3">
          {deliveryOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedDelivery(option.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedDelivery === option.id
                    ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${selectedDelivery === option.id
                          ? "bg-purple-100"
                          : "bg-gray-100"
                        }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${selectedDelivery === option.id
                            ? "text-purple-600"
                            : "text-gray-600"
                          }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">
                          {option.name}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {option.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {option.price === 0
                        ? "FREE"
                        : `$${option.price.toFixed(2)}`}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-2 ml-auto ${selectedDelivery === option.id
                          ? "border-purple-600 bg-purple-600"
                          : "border-gray-300"
                        }`}
                    >
                      {selectedDelivery === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white m-auto mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Different Shipping Address */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">
              Different shipping address?
            </h3>
            <p className="text-sm text-gray-600">Ship to a different address</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useDifferentShipping}
              onChange={(e) => setUseDifferentShipping(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={nextStep}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
      >
        Continue to Payment
      </button>
    </div>
  );

  // Step 2: Payment Method
  const PaymentStep = () => (
    <div className="space-y-6">
      <MobileBackButton />

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Method
        </h2>
        <p className="text-gray-600">Choose your preferred payment method</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPayment === method.id
                  ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                  : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${selectedPayment === method.id
                        ? "bg-purple-100"
                        : "bg-gray-100"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${selectedPayment === method.id
                          ? "text-purple-600"
                          : "text-gray-600"
                        }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {method.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${selectedPayment === method.id
                      ? "border-purple-600 bg-purple-600"
                      : "border-gray-300"
                    }`}
                >
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white m-auto mt-1" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Card Form */}
      {selectedPayment === "credit-card" && (
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Card Details</h3>

          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Card Holder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showCVV ? "text" : "password"}
                    placeholder="123"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowCVV(!showCVV)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showCVV ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Card */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              checked={savePaymentMethod}
              onChange={(e) => setSavePaymentMethod(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="saveCard"
              className="ml-2 block text-sm text-gray-700"
            >
              Save this card for future purchases
            </label>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Contact Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gift Options */}
      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-gray-800">Gift Options</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={giftOptions.isGift}
              onChange={(e) =>
                setGiftOptions({ ...giftOptions, isGift: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {giftOptions.isGift && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gift Message (Optional)
              </label>
              <textarea
                placeholder="Add a personal message..."
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={giftOptions.message}
                onChange={(e) =>
                  setGiftOptions({ ...giftOptions, message: e.target.value })
                }
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="giftWrap"
                checked={giftOptions.giftWrap}
                onChange={(e) =>
                  setGiftOptions({ ...giftOptions, giftWrap: e.target.checked })
                }
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="giftWrap"
                className="ml-2 block text-sm text-gray-700"
              >
                Add gift wrap (+${giftOptions.giftWrapPrice.toFixed(2)})
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
        >
          Back to Address
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          Review Order
        </button>
      </div>
    </div>
  );

  // Step 3: Review Order
  const ReviewStep = () => {
    const selectedAddressObj = addresses.find((a) => a.id === selectedAddress);
    const Icon = selectedAddressObj?.icon || Home;

    return (
      <div className="space-y-6">
        <MobileBackButton />

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Review Your Order
          </h2>
          <p className="text-gray-600">
            Please review all details before placing your order
          </p>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Delivery Information
          </h3>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {selectedAddressObj?.name}
                  </h4>
                  <p className="text-gray-800">
                    {selectedAddressObj?.fullName}
                  </p>
                  <p className="text-gray-600">{selectedAddressObj?.address}</p>
                  <p className="text-gray-600">{selectedAddressObj?.city}</p>
                  <p className="text-gray-600">
                    Phone: {selectedAddressObj?.phone}
                  </p>
                </div>
                <button className="text-purple-600 hover:text-purple-700">
                  <Edit size={18} />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    {
                      deliveryOptions.find((d) => d.id === selectedDelivery)
                        ?.name
                    }
                  </span>
                  <span className="text-gray-600">
                    (
                    {
                      deliveryOptions.find((d) => d.id === selectedDelivery)
                        ?.time
                    }
                    )
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Payment Method
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {paymentMethods.find((p) => p.id === selectedPayment)?.icon &&
                  React.createElement(
                    paymentMethods.find((p) => p.id === selectedPayment)?.icon,
                    {
                      className: "w-5 h-5 text-purple-600",
                    }
                  )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {paymentMethods.find((p) => p.id === selectedPayment)?.name}
                </h4>
                {selectedPayment === "credit-card" && cardDetails.number && (
                  <p className="text-gray-600">
                    Card ending in •••• {cardDetails.number.slice(-4)}
                  </p>
                )}
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-700">
              <Edit size={18} />
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Contact Information
          </h3>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-800">{contactInfo.email}</p>
              <p className="text-gray-600">Phone: {contactInfo.phone}</p>
            </div>
            <button className="text-purple-600 hover:text-purple-700">
              <Edit size={18} />
            </button>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-4">
            Order Items ({cartItems.length})
          </h3>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.color} • {item.seller}
                      </p>
                      <p className="text-sm text-gray-600">
                        Delivery: {item.delivery}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Promo Code</h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              onClick={applyPromoCode}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              Apply
            </button>
          </div>

          {appliedPromo && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Promo code applied
                  </span>
                </div>
                <span className="font-bold text-green-700">
                  -${appliedPromo.discount.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={prevStep}
            className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
          >
            Back to Payment
          </button>
          <button
            onClick={placeOrder}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              `Place Order - $${orderSummary.total.toFixed(2)}`
            )}
          </button>
        </div>

        {/* Security Note */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    );
  };

  // Step 4: Order Confirmation
  const ConfirmationStep = () => (
    <div className="space-y-6 text-center">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block mx-auto">
          <div className="text-sm text-gray-600">Order Number</div>
          <div className="text-xl font-bold text-gray-800">{orderId}</div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 text-left">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Order Details</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Date</span>
            <span className="font-medium">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Date</span>
            <span className="font-medium">Tomorrow, Jan 15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium">
              {paymentMethods.find((p) => p.id === selectedPayment)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-bold text-lg">
              ${orderSummary.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">What's Next?</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Track Your Order</h4>
              <p className="text-sm text-gray-600">
                We'll send tracking information to {contactInfo.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">
                Order Confirmation Email
              </h4>
              <p className="text-sm text-gray-600">
                Check your email for order details and invoice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={trackOrder}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700"
        >
          Track Order
        </button>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={downloadInvoice}
            className="flex flex-col items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs text-gray-700">Invoice</span>
          </button>
          <button
            onClick={shareOrder}
            className="flex flex-col items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs text-gray-700">Share</span>
          </button>
          <button
            onClick={continueShopping}
            className="flex flex-col items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs text-gray-700">Shop More</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="hidden lg:flex items-center justify-center mb-8">
      <div className="flex items-center w-full max-w-3xl">
        {progressSteps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step.status === "completed"
                    ? "bg-purple-600 text-white"
                    : step.status === "current"
                      ? "bg-purple-100 text-purple-600 border-2 border-purple-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
              >
                {step.status === "completed" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <div
                className={`ml-2 font-medium ${step.status === "completed" || step.status === "current"
                    ? "text-purple-600"
                    : "text-gray-400"
                  }`}
              >
                {step.label}
              </div>
            </div>
            {index < progressSteps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 ${step.status === "completed" ? "bg-purple-600" : "bg-gray-200"
                  }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // Mobile Progress Indicator
  const MobileProgress = () => (
    <div className="lg:hidden mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-purple-600">
          Step {currentStep} of 4
        </div>
        <div className="text-sm text-gray-600">
          {progressSteps[currentStep - 1]?.label}
        </div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full mt-2">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
            </div>
            <Link
              to="/cart"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Edit Cart
            </Link>
          </div>

          <ProgressBar />
          <MobileProgress />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {currentStep === 1 && <AddressStep />}
            {currentStep === 2 && <PaymentStep />}
            {currentStep === 3 && <ReviewStep />}
            {currentStep === 4 && <ConfirmationStep />}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:w-1/3">
            <OrderSummary />

            {/* Mobile Order Summary Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total</div>
                  <div className="text-lg font-bold text-gray-800">
                    ${orderSummary.total.toFixed(2)}
                  </div>
                </div>
                {currentStep === 3 ? (
                  <button
                    onClick={placeOrder}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add bottom padding for mobile fixed bar */}
        <div className="pb-20 lg:pb-0"></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
