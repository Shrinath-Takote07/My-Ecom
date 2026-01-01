

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Tag,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footwear = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [footwearData, setFootwearData] = useState([]);
  const [wishlistItems, setWishlistItems] = useState(new Set());

  useEffect(() => {
    // http://localhost:8080/api/footwears
    //
    fetch("http://localhost:8080/api/footwears")
      .then((res) => res.json())
      .then((json) => setFootwearData(json))
      .catch((err) => console.error("Error fetching Footwears:", err));
  }, []);

  // Handle responsive slides
  const updateSlidesPerView = useCallback(() => {
    const width = window.innerWidth;
    let slides = 1; // Default for mobile

    if (width >= 1024) {
      slides = 4; // Desktop
    } else if (width >= 768) {
      slides = 2; // Tablet
    } else {
      slides = 1; // Mobile
    }

    setSlidesPerView(slides);
    setIsMobile(width < 768);
    if (currentSlide > footwearData.length - slides) {
      setCurrentSlide(Math.max(0, footwearData.length - slides));
    }
  }, [currentSlide, footwearData.length]);

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [updateSlidesPerView]);

  const maxSlide = Math.max(0, footwearData.length - slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Mobile swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add to wishlist handler
  const addToWishlist = (product) => {
    // Check if already in wishlist
    if (wishlistItems.has(product.id)) {
      toast.info("Item already in wishlist");
      return;
    }

    // Send to backend
    fetch("http://localhost:8080/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (res.ok) {
          // Add to local state
          setWishlistItems((prev) => new Set([...prev, product.id]));
          toast.success("Item successfully stored in wishlist collection!");
        } else {
          return res.json().then((err) => {
            toast.error(err.message || "Failed to add to wishlist");
          });
        }
      })
      .catch((err) => {
        console.error("Error adding to wishlist:", err);
        toast.error("Error adding to wishlist");
      });
  };

  return (
    <div className="w-full py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-2 mb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Featured Footwear
            </h2>
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Limited time offers - Don't miss out!
          </p>
        </div>

        {/* Desktop Navigation Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentSlide + 1} / {maxSlide + 1}
            </span>
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide === maxSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out touch-pan-y"
          style={{
            transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
          }}
        >
          {footwearData.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <div className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                {/* Product Image */}
                <div className="relative overflow-hidden flex-shrink-0 h-40 sm:h-48 md:h-56">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag size={10} />
                    {product.discount}
                  </div>
                  {/* New Badge */}
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="absolute bottom-3 right-3 flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-colors ${wishlistItems.has(product.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 hover:bg-white text-gray-600"
                        }`}
                    >
                      <Heart
                        size={14}
                        className={
                          wishlistItems.has(product.id) ? "fill-white" : ""
                        }
                      />
                    </button>
                    <button className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white">
                      <Eye size={14} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                  <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1 truncate">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2 sm:mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`${i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                            } sm:w-4 sm:h-4`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4 flex-1">
                    {product.tags
                      .slice(0, isMobile ? 2 : 3)
                      .map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    {product.tags.length > (isMobile ? 2 : 3) && (
                      <span className="text-xs text-gray-400 px-2 py-1">
                        +{product.tags.length - (isMobile ? 2 : 3)}
                      </span>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1 sm:gap-2">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
                          {product.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 line-through truncate">
                          {product.originalPrice}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-semibold truncate">
                        Save $
                        {(
                          parseFloat(product.originalPrice.replace("$", "")) -
                          parseFloat(product.price.replace("$", ""))
                        ).toFixed(2)}
                      </p>
                    </div>
                    <button className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white p-2 sm:px-3 sm:py-2 rounded-lg transition-colors active:scale-95 flex-shrink-0 ml-2">
                      <ShoppingCart size={isMobile ? 16 : 18} />
                      {!isMobile && <span className="ml-2 text-sm">Add</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop gradient fade edges */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      </div>

      {/* Mobile Dots */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center">
        <div className="flex justify-center gap-1.5 mb-3">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-purple-600 w-6" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Padding for bottom bar */}
      <div className="pb-16 sm:pb-0"></div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Footwear;
