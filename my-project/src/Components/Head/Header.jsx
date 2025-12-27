import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  HelpCircle,
  Truck,
  Globe,
  Menu,
  X,
  User,
  Heart,
} from "lucide-react";
// import Slider from "./src/Components/Mid/Slider";
// import Slider from "../Mid/Slider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const endpoints = [
          "http://localhost:5000/api/products",
          "http://localhost:5000/api/Bags",
          "http://localhost:5000/api/electronics",
          "http://localhost:5000/api/Fashions",
          "http://localhost:5000/api/footwears",
          "http://localhost:5000/api/Groceries",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(endpoint)
              .then((res) => res.json())
              .catch(() => [])
          )
        );

        const products = responses.flat();
        setAllProducts(products);
        console.log("✅ Loaded", products.length, "products from database");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const query_lower = query.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(query_lower) ||
        product.description?.toLowerCase().includes(query_lower) ||
        product.category?.toLowerCase().includes(query_lower)
    );

    setSearchResults(filtered.slice(0, 8)); // Show max 8 results
  };

  // Handle search submit - navigate to search results page
  const handleSearchSubmit = () => {
    if (searchQuery.trim() && searchResults.length > 0) {
      navigate("/search", {
        state: { results: searchResults, query: searchQuery },
      });
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Handle product click from search dropdown
  const handleProductClick = (product) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate("/search", { state: { results: [product], query: product.name } });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Fashion", path: "/fashion" },
    { name: "Electronics", path: "/electronics" },
    { name: "Bags", path: "/bags" },
    { name: "Footwear", path: "/footwear" },
    { name: "Groceries", path: "/groceries" },
    { name: "Beauty", path: "/beauty" },
    { name: "Wellness", path: "/wellness" },
    { name: "Jewellery", path: "/jewellery" },
  ];

  const categories = [
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Kids", path: "/category/kids" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Home", path: "/category/home" },
    { name: "Beauty", path: "/category/beauty" },
    { name: "Sports", path: "/category/sports" },
    { name: "Books", path: "/category/books" },
    { name: "Toys", path: "/category/toys" },
    { name: "Automotive", path: "/category/automotive" },
  ];

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className=" bg-gray-50">
      {/* Top Announcement Bar - Hidden on mobile */}
      <div className="hidden md:flex bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="font-semibold truncate">
            Get up to 50% off new season styles, limited time only
          </div>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 px-4 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <div className="absolute right-3 top-2.5 text-gray-400">Q</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center hover:text-gray-200 cursor-pointer">
              <HelpCircle size={16} className="mr-1" />
              <span className="hidden lg:inline"><a href="/help">Help Center</a></span>
            </div>
            <div className="flex items-center hover:text-gray-200 cursor-pointer">
              <Truck size={16} className="mr-1" />
              <span className="hidden lg:inline"><a href="/order">Order Tracking</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile top bar with condensed info */}
      <div className="md:hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4">
        <div className="flex justify-between items-center text-xs">
          <div className="font-semibold truncate max-w-[70%]">
            Up to 50% off new styles
          </div>
          <div className="flex items-center space-x-3">
            <HelpCircle size={14} className="cursor-pointer" title="Help" />
            <Truck size={14} className="cursor-pointer" title="Track Order" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Top Row: Logo, Search, Icons */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden mr-2 p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Mobile adjusted */}
            <div className="flex items-center flex-1 md:flex-none">
              <button
                onClick={handleLogoClick}
                className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-purple-700 transition-colors"
              >
                <span className="text-purple-600">=</span> CLASSYSHOP
              </button>
            </div>

            {/* Icons - Mobile optimized */}
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 ml-2">
              {/* Mobile Search Icon */}
              <div className="md:hidden">
                <Search size={20} className="text-gray-600 cursor-pointer" />
              </div>

              <div className="hidden sm:block">
                <Link to="/account">
                  <div className="relative group cursor-pointer">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                      <User size={16} className="text-gray-700" />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="hidden sm:block">
                <Link to="/wishlist">
                  <div className="relative group cursor-pointer">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                      <Heart size={16} className="text-gray-700" />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                    <ShoppingCart size={16} className="text-gray-700" />
                  </div>
                  {/* <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"> */}

                  {/* {cartItems.length} */}
                  {/* </div> */}
                </Link>
              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile (shown as icon instead) */}
          <div className="hidden md:block mb-4 relative">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setIsSearching(true)}
                className="w-full py-2 px-4 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
              <div className="absolute right-3 top-2.5 text-gray-400">Q</div>

              {/* Search Results Dropdown */}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 px-3 py-2">
                      Found {searchResults.length} result
                      {searchResults.length !== 1 ? "s" : ""}
                    </p>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <Search size={16} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">
                            {product.name}
                          </h4>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {product.category}
                            </span>
                            <span className="text-sm font-semibold text-purple-600">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* View All Results Button */}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full mt-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View All {searchResults.length} Results
                    </button>
                  </div>
                </div>
              )}

              {/* No results message */}
              {searchQuery &&
                searchResults.length === 0 &&
                allProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 text-center">
                    <p className="text-sm text-gray-600">
                      No products found matching "{searchQuery}"
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Mobile Search Input - Shows when search is active */}
          <div className="md:hidden mb-3 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full py-2 px-4 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-sm"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />

              {/* Mobile Search Results */}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 px-3 py-2">
                      Found {searchResults.length} result
                      {searchResults.length !== 1 ? "s" : ""}
                    </p>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded transition-colors"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <Search size={14} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-800 truncate">
                            {product.name}
                          </h4>
                          <span className="text-xs text-purple-600 font-semibold">
                            {product.price}
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* Mobile View All Results Button */}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full mt-2 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded transition-colors"
                    >
                      View All {searchResults.length} Results
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile No results message */}
              {searchQuery &&
                searchResults.length === 0 &&
                allProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-3 text-center">
                    <p className="text-xs text-gray-600">No products found</p>
                  </div>
                )}
            </div>
          </div>

          {/* Bottom Row: Navigation */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left: Shop by Categories */}
            <div className="flex items-center">
              <div className="relative group">
                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// code is correct */}
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <span className="mr-2">=</span>
                  SHOP BY CATEGORIES
                  <span className="ml-2 text-lg">▼</span>
                </button>

                {/* Categories Dropdown */}
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="px-3 py-2 text-sm bg-gray-50 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors"
                          onClick={() => setIsCategoriesOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              {/* Navigation Links */}
              <nav className="ml-4 lg:ml-8 flex space-x-4 lg:space-x-6 overflow-x-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors whitespace-nowrap text-sm lg:text-base"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: International Delivery */}
            <div className="flex items-center text-gray-700">
              <Globe size={18} className="mr-2 text-purple-600" />
              <span className="font-medium hidden lg:inline">
                Free International Delivery
              </span>
              <span className="font-medium lg:hidden">Free Delivery</span>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 border-t border-gray-200 pt-3">
              {/* Mobile Categories Button */}
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-purple-50 text-purple-700 rounded-lg mb-3"
              >
                <div className="flex items-center">
                  <span className="mr-2">=</span>
                  SHOP BY CATEGORIES
                </div>
                <span>{isCategoriesOpen ? "▲" : "▼"}</span>
              </button>

              {/* Categories Dropdown for Mobile */}
              {isCategoriesOpen && (
                <div className="mb-4 bg-white rounded-lg shadow border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-800 mb-3">
                    All Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="px-3 py-2 text-sm bg-gray-50 hover:bg-purple-50 hover:text-purple-600 rounded transition-colors"
                        onClick={() => {
                          setIsCategoriesOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <nav className="grid grid-cols-2 gap-2 mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Delivery Info */}
              <div className="flex items-center justify-center text-gray-700 bg-gray-100 py-2 rounded-lg">
                <Globe size={16} className="mr-2 text-purple-600" />
                <span className="font-medium">Free International Delivery</span>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Main Content - Store Banner */}
      <main className="container mx-auto px-3 sm:px-4 mt-6 sm:mt-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              BIG MEGA STORE
            </h1>
            <p className="text-base sm:text-xl opacity-90">
              Everything you need in one place
            </p>
          </div>
        </div>
      </main>
      {/* <div className="pb-16 md:pb-0"></div> */}
      {/* <Slider /> */}
    </div>
  );
};

export default Header;
