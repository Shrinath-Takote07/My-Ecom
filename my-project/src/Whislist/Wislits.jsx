import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Eye,
  Bell,
  Share2,
  Tag,
  Truck,
  CheckCircle,
  AlertCircle,
  Star,
  Clock,
  TrendingUp,
  Package,
  ChevronRight,
  ArrowLeft,
  X,
  Filter,
  SortAsc,
  Search,
  Grid,
  List,
  Gift,
  Shield,
  Sparkles,
} from "lucide-react";
import API_ENDPOINTS from "../config/api";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartSuccessMessage, setCartSuccessMessage] = useState("");
  const [cartErrorMessage, setCartErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);

  // Function to fetch wishlist items
  const fetchWishlistItems = () => {
    fetch(API_ENDPOINTS.wishlist)
      .then((res) => res.json())
      .then((json) => setWishlistItems(json))
      .catch((err) => console.error("Error fetching wishlist items:", err));
  };

  // Function to fetch recommended items
  const fetchRecommendedItems = () => {
    fetch(API_ENDPOINTS.recommendations)
      .then((res) => res.json())
      .then((json) => setRecommendedItems(json))
      .catch((err) => console.error("Error fetching recommendations:", err));
  };

  useEffect(() => {
    // Fetch on initial mount
    fetchWishlistItems();
    fetchRecommendedItems();

    // Refresh every 2 seconds to show real-time updates
    const interval = setInterval(fetchWishlistItems, 2000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Add item to cart function
  const addToCart = async (item) => {
    setIsLoading(true);
    setLoadingItemId(item.id);
    setCartSuccessMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.carts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication token if needed
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartSuccessMessage(`"${item.name}" successfully added to cart!`);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setCartSuccessMessage("");
        }, 3000);
      } else {
        const errMsg = `Failed to add item to cart: ${data.message || "Unknown error"}`;
        setCartErrorMessage(errMsg);
        // Clear error after 4 seconds
        setTimeout(() => {
          setCartErrorMessage("");
        }, 4000);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      const errMsg = "Failed to add item to cart. Please try again.";
      setCartErrorMessage(errMsg);
      setTimeout(() => {
        setCartErrorMessage("");
      }, 4000);
    } finally {
      setIsLoading(false);
      setLoadingItemId(null);
    }
  };

  // Function to add item to wishlist
  const addToWishlist = async (item) => {
    try {
      const response = await fetch(API_ENDPOINTS.wishlist, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category || "General",
          image: item.image,
          description: item.description || "",
          rating: item.rating || 0,
          reviewCount: item.reviewCount || 0
        }),
      });

      if (response.ok) {
        alert(`"${item.name}" added to your wishlist!`);
        fetchWishlistItems(); // Refresh the list
      } else if (response.status === 409) {
        alert(`"${item.name}" is already in your wishlist.`);
      } else {
        alert("Failed to add item to wishlist");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      alert("Error adding item to wishlist");
    }
  };

  // Move selected items to cart
  const moveSelectedToCart = async () => {
    if (selectedItems.length === 0) {
      alert("Please select items to add to cart");
      return;
    }

    setIsLoading(true);
    setCartSuccessMessage("");

    try {
      const promises = selectedItems.map(async (id) => {
        const item = wishlistItems.find((i) => i.id === id);
        if (!item) return null;

        const response = await fetch(API_ENDPOINTS.carts, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            productId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
          }),
        });

        return { response, item };
      });

      const results = await Promise.all(promises);
      const successfulItems = results.filter(
        (result) => result && result.response.ok
      );

      if (successfulItems.length > 0) {
        setCartSuccessMessage(
          `${successfulItems.length} item(s) successfully added to cart!`
        );

        // Clear selection after successful addition
        setSelectedItems([]);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setCartSuccessMessage("");
        }, 3000);
      }

      // Check if any items failed to add
      const failedItems = results.filter(
        (result) => result && !result.response.ok
      );
      if (failedItems.length > 0) {
        alert(`Failed to add ${failedItems.length} item(s) to cart`);
      }
    } catch (err) {
      console.error("Error adding items to cart:", err);
      alert("Failed to add items to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter items based on selected filter
  const filteredItems = wishlistItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "inStock") return item.inStock;
    if (filter === "onSale") return item.isOnSale;
    if (filter === "watched") return item.isPriceWatched;
    if (filter === "prime") return item.isPrimeEligible;
    return item.category === filter;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "recent")
      return new Date(b.addedDate || 0) - new Date(a.addedDate || 0);
    return 0;
  });

  // Calculate totals
  const totalItems = wishlistItems.length;
  const totalValue = wishlistItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );
  const totalSavings = wishlistItems.reduce(
    (sum, item) => sum + ((item.originalPrice || 0) - (item.price || 0)),
    0
  );
  const itemsInStock = wishlistItems.filter((item) => item.inStock).length;

  // Toggle item selection
  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Remove selected items
  const removeSelectedItems = async () => {
    if (selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map(async (id) => {
        const response = await fetch(
          API_ENDPOINTS.wishlistById(id),
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.ok;
      });

      const results = await Promise.all(promises);
      const allSuccessful = results.every((result) => result === true);

      if (allSuccessful) {
        setWishlistItems(
          wishlistItems.filter((item) => !selectedItems.includes(item.id))
        );
        setSelectedItems([]);
        alert(`${selectedItems.length} item(s) removed from wishlist`);
      } else {
        alert("Failed to remove some items from wishlist");
      }
    } catch (err) {
      console.error("Error removing items:", err);
      alert("Error removing items from wishlist");
    }
  };

  // Remove single item
  const removeItem = async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.wishlistById(id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      } else {
        console.error("Failed to delete item from wishlist");
        alert("Failed to remove item from wishlist");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Error removing item from wishlist");
    }
  };

  // Share wishlist
  const shareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Wishlist",
        text: "Check out my wishlist!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Wishlist link copied to clipboard!");
    }
  };

  // Success message component
  const CartSuccessMessage = () => {
    if (!cartSuccessMessage) return null;

    return (
      <div className="fixed top-4 right-4 z-50 animate-fade-in">
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <CheckCircle className="text-green-500" size={24} />
          <div>
            <p className="font-semibold">{cartSuccessMessage}</p>
            <p className="text-sm text-green-600">
              Item(s) successfully stored in cart collection
            </p>
          </div>
          <button
            onClick={() => setCartSuccessMessage("")}
            className="ml-4 text-green-700 hover:text-green-900"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  };

  const CartErrorMessage = () => {
    if (!cartErrorMessage) return null;
    return (
      <div className="fixed top-16 right-4 z-50 animate-fade-in">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <AlertCircle className="text-red-500" size={24} />
          <div>
            <p className="font-semibold">{cartErrorMessage}</p>
          </div>
          <button
            onClick={() => setCartErrorMessage("")}
            className="ml-4 text-red-700 hover:text-red-900"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  };

  // Loading overlay
  const LoadingOverlay = () => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-700">Adding to cart...</p>
        </div>
      </div>
    );
  };

  // Empty wishlist message
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Save items you love for later. Click the heart icon on any product
              to add it here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <LoadingOverlay />
      <CartSuccessMessage />

      <div className="container mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart className="text-red-500 fill-red-500 w-7 h-7 md:w-8 md:h-8" />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Your Wishlist
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Save items for later or share with friends
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={shareWishlist}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Share2 size={18} />
                Share List
              </button>
              <Link
                to="/"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {totalItems}
                </div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${totalSavings.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {itemsInStock}
                </div>
                <div className="text-sm text-gray-600">In Stock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  ${totalValue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Selection Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={
                    selectedItems.length === filteredItems.length &&
                    filteredItems.length > 0
                  }
                  onChange={() => {
                    if (selectedItems.length === filteredItems.length) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems(filteredItems.map((item) => item.id));
                    }
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="selectAll" className="text-sm text-gray-700">
                  Select All ({selectedItems.length})
                </label>
              </div>

              {selectedItems.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={moveSelectedToCart}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ShoppingCart size={16} />
                    {isLoading ? "Adding..." : "Add to Cart"}
                  </button>
                  <button
                    onClick={removeSelectedItems}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filter & Sort Mobile Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg"
              >
                <Filter size={18} />
                <span>Filter</span>
              </button>

              {/* Desktop Filter & Sort */}
              <div className="hidden md:flex items-center gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Items</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home</option>
                  <option value="inStock">In Stock</option>
                  <option value="onSale">On Sale</option>
                  <option value="watched">Price Watched</option>
                  <option value="prime">Prime Eligible</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="recent">Recently Added</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by
                  </label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Items</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home</option>
                    <option value="inStock">In Stock</option>
                    <option value="onSale">On Sale</option>
                    <option value="watched">Price Watched</option>
                    <option value="prime">Prime Eligible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${selectedItems.includes(item.id) ? "ring-2 ring-purple-500" : ""
                }`}
            >
              <div className="p-4">
                {/* Item Header */}
                <div className="flex gap-4">
                  {/* Selection Checkbox */}
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/api/placeholder/200/200"}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/200/200";
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">
                          {item.description || "No description available"}
                        </p>

                        {/* Product Specifications */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.color && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {item.color}
                            </span>
                          )}
                          {item.storage && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {item.storage}
                            </span>
                          )}
                          {item.memory && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {item.memory}
                            </span>
                          )}
                          {item.screenSize && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {item.screenSize}
                            </span>
                          )}
                        </div>

                        {/* Seller & Prime */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            Sold by:
                          </span>
                          <span className="text-xs font-medium text-gray-700">
                            {item.seller || "Unknown Seller"}
                          </span>
                          {item.isPrimeEligible && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              Prime
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`${i < Math.floor(item.rating || 0)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1">
                            {(item.rating || 0).toFixed(1)} (
                            {(item.reviewCount || 0).toLocaleString()})
                          </span>
                        </div>

                        {/* Price Drop Alert */}
                        {item.lastPriceDrop > 0 && (
                          <div className="mt-2 flex items-center gap-1 text-green-600 text-sm">
                            <TrendingUp size={14} />
                            <span>
                              Price dropped ${item.lastPriceDrop}{" "}
                              {item.priceDropDate}
                            </span>
                          </div>
                        )}

                        {/* Price Watch Alert */}
                        {item.isPriceWatched &&
                          item.watchedPrice &&
                          item.price > item.watchedPrice && (
                            <div className="mt-1 flex items-center gap-1 text-blue-600 text-sm">
                              <Bell size={14} />
                              <span>
                                Above watched price of $
                                {item.watchedPrice.toFixed(2)}
                              </span>
                            </div>
                          )}

                        {/* Restock Alert */}
                        {!item.inStock && item.restockDate && (
                          <div className="mt-2 flex items-center gap-1 text-amber-600 text-sm">
                            <Package size={14} />
                            <span>Restocking on {item.restockDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Price & Actions - Desktop */}
                      <div className="hidden md:flex flex-col items-end">
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-800">
                            ${(item.price || 0).toFixed(2)}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              ${(item.originalPrice || 0).toFixed(2)}
                            </div>
                          )}
                          {item.isOnSale && (
                            <div className="text-sm text-green-600 font-semibold">
                              Save $
                              {(
                                (item.originalPrice || 0) - (item.price || 0)
                              ).toFixed(2)}
                            </div>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="mt-4 flex items-center gap-2">
                          {item.inStock ? (
                            <div className="flex items-center gap-1 text-green-600 text-sm">
                              <CheckCircle size={14} />
                              <span>In Stock</span>
                              {item.stockLeft < 10 && (
                                <span className="text-xs text-amber-600">
                                  ({item.stockLeft || 0} left)
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600 text-sm">
                              <AlertCircle size={14} />
                              <span>Out of Stock</span>
                            </div>
                          )}
                        </div>

                        {/* Delivery Info */}
                        <div className="mt-2 text-sm text-gray-600">
                          {item.hasFreeShipping ? (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Truck size={14} />
                              <span>Free shipping</span>
                            </div>
                          ) : (
                            <span>
                              Delivery: {item.deliveryDate || "Unknown"}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            disabled={loadingItemId === item.id || isLoading}
                            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm rounded-lg transition-colors disabled:opacity-50"
                          >
                            <ShoppingCart size={14} />
                            {loadingItemId === item.id ? "Adding..." : "Add to Cart"}
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isLoading}
                            className="p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions - Mobile */}
                    <div className="md:hidden mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            ${(item.price || 0).toFixed(2)}
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              ${(item.originalPrice || 0).toFixed(2)}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            disabled={isLoading}
                            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm rounded-lg disabled:opacity-50"
                          >
                            <ShoppingCart size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isLoading}
                            className="p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Stock & Delivery - Mobile */}
                      <div className="mt-2 flex items-center justify-between text-sm">
                        {item.inStock ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle size={12} />
                            <span>In Stock</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertCircle size={12} />
                            <span>Out of Stock</span>
                          </div>
                        )}
                        <div className="text-gray-600">
                          {item.hasFreeShipping
                            ? "Free shipping"
                            : item.deliveryDate || "Unknown"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Actions - Mobile View Only */}
                <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <button className="flex items-center gap-1 text-sm text-gray-600">
                      <Eye size={14} />
                      Quick Look
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600">
                      <Bell size={14} />
                      Price Alert
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600">
                      <Share2 size={14} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Filter State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No items found
            </h3>
            <p className="text-gray-600 mb-6">
              Try changing your filters or browse for more items
            </p>
            <button
              onClick={() => setFilter("all")}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            >
              Show All Items
            </button>
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Based on your wishlist
            </h2>
            <Link
              to="/recommendations"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              See more
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-3"
              >
                <div className="aspect-square bg-gray-100 rounded mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/200/200";
                    }}
                  />
                </div>
                <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                  {item.name}
                </h4>
                <div className="text-sm font-bold text-gray-800">
                  ${item.price.toFixed(2)}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => addToCart(item)}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm rounded-lg disabled:opacity-50"
                  >
                    <ShoppingCart size={14} />
                  </button>
                  <button
                    onClick={() => addToWishlist(item)}
                    className="p-1.5 text-gray-400 hover:text-red-600"
                  >
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Actions Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">
                  Selected ({selectedItems.length})
                </div>
                <div className="text-lg font-bold text-gray-800">
                  $
                  {selectedItems
                    .reduce((sum, id) => {
                      const item = wishlistItems.find((item) => item.id === id);
                      return sum + (item?.price || 0);
                    }, 0)
                    .toFixed(2)}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={moveSelectedToCart}
                  disabled={isLoading || selectedItems.length === 0}
                  className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm rounded-lg disabled:opacity-50"
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
                <button
                  onClick={shareWishlist}
                  className="p-2 text-gray-600 hover:text-purple-600"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add bottom padding for mobile fixed bar */}
        <div className="pb-20 md:pb-0"></div>
      </div>
    </div>
  );
};

export default WishlistPage;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
