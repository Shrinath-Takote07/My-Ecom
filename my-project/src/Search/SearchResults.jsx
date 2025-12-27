import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Tag,
  Search as SearchIcon,
  ArrowLeft,
} from "lucide-react";
import API_ENDPOINTS from "../config/api";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevant");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [notification, setNotification] = useState(null);

  // Get search results from location state
  useEffect(() => {
    if (location.state?.results) {
      setSearchResults(location.state.results);
      setFilteredResults(location.state.results);
      setSearchQuery(location.state.query || "");
    }
  }, [location.state]);

  // Filter results based on criteria
  useEffect(() => {
    let filtered = [...searchResults];

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = parseFloat(String(product.price).replace(/[^0-9.-]+/g, ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort results
    if (sortBy === "price_low") {
      filtered.sort(
        (a, b) =>
          parseFloat(String(a.price).replace(/[^0-9.-]+/g, "")) -
          parseFloat(String(b.price).replace(/[^0-9.-]+/g, ""))
      );
    } else if (sortBy === "price_high") {
      filtered.sort(
        (a, b) =>
          parseFloat(String(b.price).replace(/[^0-9.-]+/g, "")) -
          parseFloat(String(a.price).replace(/[^0-9.-]+/g, ""))
      );
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredResults(filtered);
  }, [searchResults, priceRange, selectedCategory, sortBy]);

  // Add to wishlist
  const addToWishlist = (product) => {
    if (wishlistItems.has(product.id)) {
      setNotification({
        type: "info",
        message: "Item already in wishlist",
      });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    fetch(API_ENDPOINTS.wishlist, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (res.ok) {
          setWishlistItems((prev) => new Set([...prev, product.id]));
          setNotification({
            type: "success",
            message: "Item successfully added to wishlist!",
          });
          setTimeout(() => setNotification(null), 2000);
        } else {
          return res.json().then((err) => {
            setNotification({
              type: "error",
              message: err.message || "Failed to add to wishlist",
            });
            setTimeout(() => setNotification(null), 2000);
          });
        }
      })
      .catch((err) => {
        console.error("Error adding to wishlist:", err);
        setNotification({
          type: "error",
          message: "Failed to add to wishlist",
        });
        setTimeout(() => setNotification(null), 2000);
      });
  };

  // Get unique categories from results
  const categories = ["all", ...new Set(searchResults.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Search Results for "{searchQuery}"
            </h1>
            <div className="w-20"></div>
          </div>
          <p className="text-sm text-gray-600">
            Found {filteredResults.length} product
            {filteredResults.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {category === "all" ? "All Categories" : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <span className="text-sm text-gray-600">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <div className="h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
                        <SearchIcon size={32} className="text-gray-400" />

                        {/* Discount Badge */}
                        {product.discount && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Tag size={10} />
                            {product.discount}
                          </div>
                        )}

                        {/* New Badge */}
                        {product.isNew && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            NEW
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => addToWishlist(product)}
                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
                          >
                            <Heart
                              size={16}
                              className={`${wishlistItems.has(product.id)
                                ? "fill-red-600 text-red-600"
                                : "text-gray-600"
                                }`}
                              fill={
                                wishlistItems.has(product.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all">
                            <Eye size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Category */}
                      <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1">
                        {product.category}
                      </p>

                      {/* Product Name */}
                      <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${i < Math.floor(product.rating || 0)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviewCount || 0})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-lg font-bold text-gray-800">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through ml-2">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors active:scale-95">
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SearchIcon size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">
                  No products found matching your filters
                </p>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default SearchResults;
