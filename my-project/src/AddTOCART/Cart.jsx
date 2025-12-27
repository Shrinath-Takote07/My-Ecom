import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Heart,
  Shield,
  Lock,
  Truck,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  X,
  Package,
  Gift,
  Tag,
  AlertCircle,
  CheckCircle,
  Store,
} from "lucide-react";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  // http://localhost:5000/api/carts

  useEffect(() => {
    fetch("https://my-ecommm.vercel.app/api/carts")
      .then((res) => res.json())
      .then((json) => setCartItems(json))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new code
  //
  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [savedForLater, setSavedForLater] = useState([]);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [notification, setNotification] = useState(null);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if item already exists
      const newQuantity = existingItem.quantity + (product.quantity || 1);
      updateQuantity(product.id, newQuantity);
      setNotification({
        type: "info",
        message: "Item quantity updated in cart",
      });
    } else {
      // Add new item to cart via API
      fetch("https://my-ecommm.vercel.app/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          quantity: product.quantity || 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCartItems([...cartItems, data.item || product]);
          setNotification({
            type: "success",
            message: "Item added to cart! ✅",
          });
          console.log("✅ Item added to cart:", data);
        })
        .catch((err) => {
          console.error("❌ Error adding to cart:", err);
          setNotification({
            type: "error",
            message: "Failed to add item to cart",
          });
        });
    }

    setTimeout(() => setNotification(null), 2000);
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.some((item) => !item.isEligibleForFreeShipping)
    ? 9.99
    : 0;
  const tax = subtotal * 0.08;
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount for promo
  const total = subtotal + shipping + tax - discount;

  // Move item to saved for later
  const moveToSavedForLater = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      setSavedForLater([...savedForLater, { ...item, isSavedForLater: true }]);
    }
  };

  // Move item from saved to cart
  const moveToCart = (id) => {
    const item = savedForLater.find((item) => item.id === id);
    if (item) {
      setSavedForLater(savedForLater.filter((item) => item.id !== id));
      setCartItems([...cartItems, { ...item, isSavedForLater: false }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    // Delete from backend using Mongo ID (_id)
    fetch(`https://my-ecommm.vercel.app/api/carts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== id));
        setNotification({
          type: "success",
          message: "Item removed from cart",
        });
        setTimeout(() => setNotification(null), 2000);
      })
      .catch((err) => console.error("❌ Error removing from cart:", err));
  };

  // Remove from saved for later
  const removeFromSaved = (id) => {
    setSavedForLater(savedForLater.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((item) => item._id === id);
    if (item) {
      // Optimistic update
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );

      // Update in backend using Mongo ID
      // Note: Backend might need a PUT route or we just live with local update if backend doesn't have PUT
      // Assuming we need to implement PUT in backend or reusing POST? 
      // Current backend POST blindly adds. 
      // User asked for "add to cart stored separately". 
      // Let's assume update is less critical for the specific "delete" request, but we should try to fix the URL at least.
      // However backend cartRoutes doesn't seem to have PUT /:id currently. 
      // I will implement PUT in backend in next step if needed. 
      // For now fix URL.
      fetch(`https://my-ecommm.vercel.app/api/carts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Quantity updated:", data))
        .catch((err) => console.error("❌ Error updating quantity:", err));
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo(true);
    }
  };

  // Calculate delivery dates
  const getDeliveryDate = (dateString) => {
    const today = new Date();
    const deliveryDate = new Date(dateString);
    const diffTime = deliveryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    return dateString;
  };

  // Empty cart message
  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add items to your cart to start shopping!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-purple-600 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Shopping Cart ({cartItems.length})
              </h1>
            </div>
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base flex items-center gap-1"
            >
              <ArrowLeft size={16} />
              <span className="hidden md:inline">Continue Shopping</span>
              <span className="md:hidden">Back</span>
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center justify-center mb-8">
            <div className="flex items-center w-full max-w-2xl">
              <div className="flex items-center flex-1">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-2 font-semibold text-purple-600">Cart</div>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4">
                <div className="h-full bg-gray-300 w-1/3"></div>
              </div>
              <div className="flex items-center flex-1 text-gray-400">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-2">Shipping</div>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex items-center flex-1 text-gray-400">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-2">Payment</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg text-gray-800">
                    Items in your cart
                  </h2>
                  <span className="text-sm text-gray-600">Price</span>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="p-4 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-xs md:text-sm mt-1">
                                {item.description}
                              </p>

                              {/* Product Specifications */}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {item.color && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    Color: {item.color}
                                  </span>
                                )}
                                {item.size && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    Size: {item.size}
                                  </span>
                                )}
                                {item.storage && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    Storage: {item.storage}
                                  </span>
                                )}
                                {item.condition && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {item.condition}
                                  </span>
                                )}
                              </div>

                              {/* Seller Info */}
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  Sold by:
                                </span>
                                <span className="text-xs font-medium text-gray-700">
                                  {item.seller}
                                </span>
                                {item.isPrimeEligible && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                    Prime
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price - Desktop */}
                            <div className="hidden md:block text-right">
                              <div className="text-lg font-bold text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              {item.originalPrice > item.price && (
                                <div className="text-sm text-gray-400 line-through">
                                  $
                                  {(item.originalPrice * item.quantity).toFixed(
                                    2
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Stock Status & Delivery */}
                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            {item.inStock ? (
                              <div className="flex items-center gap-1 text-green-600 text-sm">
                                <CheckCircle size={14} />
                                <span>In Stock</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600 text-sm">
                                <AlertCircle size={14} />
                                <span>Out of Stock</span>
                              </div>
                            )}

                            {item.isEligibleForFreeShipping && (
                              <div className="flex items-center gap-1 text-blue-600 text-sm">
                                <Truck size={14} />
                                <span>Free Shipping</span>
                              </div>
                            )}

                            <div className="text-sm text-gray-600">
                              Delivery:{" "}
                              <span className="font-medium">
                                {getDeliveryDate(item.deliveryDate)}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls & Actions */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(item._id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="p-1.5 md:p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Minus size={16} />
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  max={item.maxQuantity}
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item._id,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-12 text-center border-x border-gray-300 py-1.5 text-sm focus:outline-none"
                                />
                                <button
                                  onClick={() =>
                                    updateQuantity(item._id, item.quantity + 1)
                                  }
                                  disabled={item.quantity >= item.maxQuantity}
                                  className="p-1.5 md:p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <div className="text-xs text-gray-500">
                                Max: {item.maxQuantity}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => moveToSavedForLater(item._id)}
                                className="text-sm text-gray-600 hover:text-purple-600 flex items-center gap-1"
                              >
                                <Heart size={16} />
                                <span className="hidden sm:inline">
                                  Save for later
                                </span>
                              </button>
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                              >
                                <Trash2 size={16} />
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price - Mobile */}
                      <div className="md:hidden mt-4 flex justify-between items-center">
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Subtotal for Mobile */}
              <div className="md:hidden p-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">
                      Subtotal ({cartItems.length} items):
                    </div>
                    <div className="text-xs text-gray-500">
                      Shipping and tax calculated at checkout
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => setShowMobileSummary(true)}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

            {/* Saved for Later Section */}
            {savedForLater.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg text-gray-800">
                    Saved for Later ({savedForLater.length})
                  </h2>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedForLater.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                              {item.name}
                            </h4>
                            <div className="mt-1 text-sm font-bold text-gray-800">
                              ${item.price.toFixed(2)}
                            </div>
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => moveToCart(item.id)}
                                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                              >
                                <ShoppingCart size={14} />
                                Move to Cart
                              </button>
                              <button
                                onClick={() => removeFromSaved(item.id)}
                                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div className="lg:w-1/3">
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              {/* Order Summary Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg text-gray-800">
                  Order Summary
                </h2>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {shipping > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-green-600">
                    <span>Shipping</span>
                    <span className="font-medium">FREE</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount (10%)</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                {/* Promo Code */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={appliedPromo}
                      className={`px-4 py-2 rounded-lg font-medium text-sm ${appliedPromo
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                    >
                      {appliedPromo ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 text-green-600 text-sm">
                      Promo code SAVE10 applied successfully!
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Incl. ${tax.toFixed(2)} taxes
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  to="/checkout"
                  className="block w-full bg-yellow-400 hover:bg-yellow-500 text-center text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>

                <div className="text-center text-sm text-gray-500">
                  or{" "}
                  <Link
                    to="/"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Security & Trust */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={14} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Secure checkout
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    30-day return policy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Multiple payment options
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Frequently bought together
            </h2>
            <Link
              to="/recommendations"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-3"
              >
                <div className="aspect-square bg-gray-100 rounded mb-2"></div>
                <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                  Accessory Item {i}
                </h4>
                <div className="text-sm font-bold text-gray-800">$29.99</div>
                <button className="w-full mt-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded">
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Order Summary Modal */}
      {showMobileSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  Order Summary
                </h3>
                <button
                  onClick={() => setShowMobileSummary(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {shipping > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-green-600">
                    <span>Shipping</span>
                    <span className="font-medium">FREE</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={appliedPromo}
                      className={`px-4 py-2 rounded-lg font-medium text-sm ${appliedPromo
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                    >
                      {appliedPromo ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  onClick={() => setShowMobileSummary(false)}
                  className="block w-full bg-yellow-400 hover:bg-yellow-500 text-center text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={() => setShowMobileSummary(false)}
                  className="block w-full border border-gray-300 hover:bg-gray-50 text-center text-gray-700 font-medium py-3 rounded-lg"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">
                Total ({cartItems.length} items)
              </div>
              <div className="text-lg font-bold text-gray-800">
                ${total.toFixed(2)}
              </div>
            </div>
            <button
              onClick={() => setShowMobileSummary(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Add bottom padding for mobile fixed bar */}
      <div className="pb-20 lg:pb-0"></div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in ${notification.type === "success"
            ? "bg-green-500"
            : notification.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
            }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Cart;
