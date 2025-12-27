
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Tag,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_ENDPOINTS from "../config/api";

const Trendings = () => {
  // ----------------------- FIXED: PRODUCTS STATE --------------------
  const [products, setProducts] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");

  // Slider & UI state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Toast state
  const [showWishlistToast, setShowWishlistToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastProduct, setToastProduct] = useState(null);

  const autoSlideRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Helper function to fetch wishlist status
  const fetchWishlistStatus = () => {
    fetch(API_ENDPOINTS.wishlist)
      .then((res) => res.json())
      .then((wishlistData) => {
        const wishlistMap = {};
        wishlistData.forEach((item) => {
          wishlistMap[item.id] = true;
        });
        setWishlistStatus(wishlistMap);
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  };

  // ----------------------- FETCH PRODUCTS & WISHLIST --------------------
  useEffect(() => {
    // Fetch products
    fetch(API_ENDPOINTS.products)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch wishlist items
    fetch(API_ENDPOINTS.wishlist)
      .then((res) => res.json())
      .then((wishlistData) => {
        // Create a map of wishlist items by product ID
        const wishlistMap = {};
        wishlistData.forEach((item) => {
          wishlistMap[item.id] = true;
        });
        setWishlistStatus(wishlistMap);
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, []);

  // ----------------------- CATEGORIES --------------------
  const categories = [
    { id: "all", name: "All Products", count: products.length },
    {
      id: "electronics",
      name: "Electronics",
      count: products.filter((p) => p.category === "electronics").length,
    },
    {
      id: "fashion",
      name: "Fashion",
      count: products.filter((p) =>
        ["fashion", "bags", "footwear"].includes(p.category)
      ).length,
    },
    {
      id: "beauty",
      name: "Beauty",
      count: products.filter((p) => p.category === "beauty").length,
    },
    {
      id: "featured",
      name: "Featured",
      count: products.filter((p) => p.isFeatured).length,
    },
    {
      id: "new",
      name: "New Arrivals",
      count: products.filter((p) => p.isNew).length,
    },
    {
      id: "wishlist",
      name: "In Wishlist",
      count: Object.values(wishlistStatus).filter(Boolean).length,
    },
  ];

  // ----------------------- FILTERED PRODUCTS --------------------
  const filteredProducts =
    activeCategory === "all"
      ? products
      : activeCategory === "featured"
        ? products.filter((p) => p.isFeatured)
        : activeCategory === "new"
          ? products.filter((p) => p.isNew)
          : activeCategory === "wishlist"
            ? products.filter((p) => wishlistStatus[p.id])
            : products.filter((p) => p.category === activeCategory);

  // ----------------------- RESPONSIVE SLIDES --------------------
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width >= 1280) setSlidesPerView(4);
      else if (width >= 1024) setSlidesPerView(3);
      else if (width >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // ----------------------- AUTO SLIDER --------------------
  useEffect(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);

    if (!isHovered) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const max = Math.max(0, filteredProducts.length - slidesPerView);
          return prev >= max ? 0 : prev + 1;
        });
      }, 4000);
    }

    return () => clearInterval(autoSlideRef.current);
  }, [isHovered, filteredProducts, slidesPerView]);

  const maxSlide = Math.max(0, filteredProducts.length - slidesPerView);

  // ----------------------- WISHLIST --------------------

  // ////////////////////////////////////////////////////////////////////////////////

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const wishlistCount = Object.values(wishlistStatus).filter(Boolean).length;

  // ----------------------- RENDER --------------------
  return (
    <div className="w-full py-10 px-4 bg-gradient-to-b from-gray-50 to-white">
      {/* ---- Toast ---- */}
      {showWishlistToast && toastProduct && (
        <div className="fixed top-5 right-5 bg-white shadow-lg border p-4 rounded-lg z-50 animate-fade-in">
          <div className="flex gap-2">
            <img src={toastProduct.image} className="w-12 h-12 rounded" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{toastMessage}</p>
              <Link
                to="/wishlist"
                className="text-xs text-purple-600 mt-1 inline-block"
              >
                View Wishlist ({wishlistCount})
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- HEADER ---------------- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="text-purple-600" /> Trending Products
        </h2>

        <Link
          to="/wishlist"
          className="relative flex items-center text-gray-700"
        >
          <Heart className="w-6 h-6" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {wishlistCount}
            </span>
          )}
        </Link>
      </div>

      {/* ---------------- CATEGORY FILTER ---------------- */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentSlide(0);
            }}
            className={`px-4 py-2 rounded-full ${activeCategory === cat.id
              ? "bg-purple-600 text-white"
              : "bg-gray-100"
              }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* ---------------- PRODUCTS SLIDER ---------------- */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="px-3"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              {/* Product Card */}
              <div className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    className="w-full h-60 object-cover"
                  />

                  {/* Discount */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded-full flex items-center gap-1">
                    <Tag size={12} /> {product.discount}% OFF
                  </div>
                  {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Wishlish chnages */}
                  {/* Wishlist */}

                  <button
                    onClick={async () => {
                      try {
                        const isAlreadyInWishlist = wishlistStatus[product.id];

                        if (isAlreadyInWishlist) {
                          // Remove from wishlist
                          const response = await axios.delete(
                            API_ENDPOINTS.wishlistById(product.id)
                          );
                          setToastMessage(
                            `Removed "${product.name}" from wishlist`
                          );
                          setToastProduct(product);
                        } else {
                          // Add to wishlist
                          const response = await axios.post(
                            API_ENDPOINTS.wishlist,
                            {
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              category: product.category,
                              image: product.image,
                              originalPrice: product.originalPrice,
                              discount: product.discount,
                              rating: product.rating,
                            }
                          );
                          setToastMessage(
                            `Added "${product.name}" to wishlist!`
                          );
                          setToastProduct(product);
                        }

                        // Refetch wishlist status from database
                        fetchWishlistStatus();

                        setShowWishlistToast(true);

                        if (toastTimeoutRef.current) {
                          clearTimeout(toastTimeoutRef.current);
                        }
                        toastTimeoutRef.current = setTimeout(() => {
                          setShowWishlistToast(false);
                        }, 2000);
                      } catch (error) {
                        console.error("Error updating wishlist:", error);
                        if (error.response?.status === 409) {
                          setToastMessage("Already in your wishlist!");
                        } else if (error.response?.status === 400) {
                          setToastMessage(
                            error.response.data.error || "Invalid request"
                          );
                        } else {
                          setToastMessage("Error updating wishlist");
                        }
                        setToastProduct(product);
                        setShowWishlistToast(true);
                      }
                    }}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:shadow-lg transition"
                  >
                    <Heart
                      size={18}
                      className={
                        wishlistStatus[product.id]
                          ? "text-red-500 fill-red-500"
                          : "text-gray-600 hover:text-red-500"
                      }
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-purple-600 uppercase">
                    {product.category}
                  </p>

                  <h3 className="font-bold line-clamp-2">{product.name}</h3>

                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {product.rating}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs line-through text-gray-400 ml-1">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1">
                      <ShoppingCart size={16} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={() => setCurrentSlide((p) => (p <= 0 ? maxSlide : p - 1))}
            className="bg-white border shadow p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => setCurrentSlide((p) => (p >= maxSlide ? 0 : p + 1))}
            className="bg-white border shadow p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trendings;
