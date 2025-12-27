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

const Electronics = () => {
  const [electronicsData, setElectronicsData] = useState([]);
  const [wishlistItems, setWishlistItems] = useState(new Set());

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  /* ============================
     Fetch Products & Wishlist
  ============================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch(
          "https://my-ecommm.vercel.app/api/Electronics"
        );
        const products = await productsRes.json();
        setElectronicsData(products || []);

        const wishlistRes = await fetch(
          "https://my-ecommm.vercel.app/api/wishlist"
        );
        const wishlist = await wishlistRes.json();

        if (Array.isArray(wishlist)) {
          const ids = new Set(wishlist.map((item) => item.id || item._id));
          setWishlistItems(ids);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  /* ============================
     Responsive Slides
  ============================ */
  const updateSlidesPerView = useCallback(() => {
    const width = window.innerWidth;
    let slides = 1;

    if (width >= 1024) slides = 4;
    else if (width >= 768) slides = 2;

    setSlidesPerView(slides);
    setIsMobile(width < 768);

    setCurrentSlide((prev) =>
      Math.min(prev, Math.max(0, electronicsData.length - slides))
    );
  }, [electronicsData.length]);

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [updateSlidesPerView]);

  const maxSlide = Math.max(0, electronicsData.length - slidesPerView);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () =>
    setCurrentSlide((prev) => Math.max(prev - 1, 0));

  /* ============================
     Touch Swipe
  ============================ */
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  /* ============================
     Wishlist Handler
  ============================ */
  const addToWishlist = async (product) => {
    const productId = product.id || product._id;

    if (wishlistItems.has(productId)) {
      toast.info("Item already in wishlist");
      return;
    }

    try {
      const res = await fetch(
        "https://my-ecommm.vercel.app/api/wishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (res.ok) {
        setWishlistItems((prev) => new Set([...prev, productId]));
        toast.success("Added to wishlist");
      } else if (res.status === 409) {
        setWishlistItems((prev) => new Set([...prev, productId]));
        toast.info("Item already exists");
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Wishlist error");
    }
  };

  /* ============================
     Render
  ============================ */
  return (
    <div className="w-full py-6 px-4 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${
              (currentSlide * 100) / slidesPerView
            }%)`,
          }}
        >
          {electronicsData.map((product) => {
            const productId = product.id || product._id;

            return (
              <div
                key={productId}
                className="px-2"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() => addToWishlist(product)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                        wishlistItems.has(productId)
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-600"
                      }`}
                    >
                      <Heart size={16} />
                    </button>

                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        <Tag size={10} className="inline mr-1" />
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-xs ml-2">
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-lg font-bold">
                        {product.price}
                      </span>

                      <button className="bg-purple-600 text-white p-2 rounded-lg">
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === maxSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronRight />
        </button>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Electronics;
