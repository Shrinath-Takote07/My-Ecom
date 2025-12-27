// import React, { useState, useEffect, useCallback } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   ShoppingCart,
//   Heart,
//   Eye,
//   Tag,
// } from "lucide-react";

// const Groceries = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [slidesPerView, setSlidesPerView] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);

//   // const products = [
//   //   {
//   //     id: 1,
//   //     name: "Premium Wireless Headphones",
//   //     category: "Electronics",
//   //     price: "$129.99",
//   //     originalPrice: "$199.99",
//   //     discount: "35% OFF",
//   //     rating: 4.5,
//   //     reviewCount: 128,
//   //     imageColor: "bg-gradient-to-r from-blue-400 to-indigo-500",
//   //     tags: ["Wireless", "Noise Cancelling", "30h Battery"],
//   //     isNew: true,
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Summer Cotton T-Shirt",
//   //     category: "Fashion",
//   //     price: "$24.99",
//   //     originalPrice: "$39.99",
//   //     discount: "38% OFF",
//   //     rating: 4.2,
//   //     reviewCount: 89,
//   //     imageColor: "bg-gradient-to-r from-pink-400 to-rose-500",
//   //     tags: ["Cotton", "Comfort Fit"],
//   //     isNew: false,
//   //   },
//   //   {
//   //     id: 3,
//   //     name: "Leather Backpack",
//   //     category: "Bags",
//   //     price: "$89.99",
//   //     originalPrice: "$149.99",
//   //     discount: "40% OFF",
//   //     rating: 4.7,
//   //     reviewCount: 203,
//   //     imageColor: "bg-gradient-to-r from-amber-400 to-orange-500",
//   //     tags: ["Genuine Leather", "Laptop Sleeve"],
//   //     isNew: true,
//   //   },
//   //   {
//   //     id: 4,
//   //     name: "Running Shoes",
//   //     category: "Footwear",
//   //     price: "$79.99",
//   //     originalPrice: "$129.99",
//   //     discount: "38% OFF",
//   //     rating: 4.4,
//   //     reviewCount: 156,
//   //     imageColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
//   //     tags: ["Lightweight", "Breathable"],
//   //     isNew: false,
//   //   },
//   //   {
//   //     id: 5,
//   //     name: "Smart Watch Series 5",
//   //     category: "Electronics",
//   //     price: "$199.99",
//   //     originalPrice: "$299.99",
//   //     discount: "33% OFF",
//   //     rating: 4.6,
//   //     reviewCount: 312,
//   //     imageColor: "bg-gradient-to-r from-purple-400 to-violet-500",
//   //     tags: ["Heart Rate", "Waterproof"],
//   //     isNew: true,
//   //   },
//   //   {
//   //     id: 6,
//   //     name: "Organic Face Cream",
//   //     category: "Beauty",
//   //     price: "$34.99",
//   //     originalPrice: "$49.99",
//   //     discount: "30% OFF",
//   //     rating: 4.3,
//   //     reviewCount: 67,
//   //     imageColor: "bg-gradient-to-r from-green-400 to-lime-500",
//   //     tags: ["Organic", "Vegan"],
//   //     isNew: false,
//   //   },
//   // ];
//   const [groceriesData, setGroceriesData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/Groceries")
//       .then((res) => res.json())
//       .then((json) => setGroceriesData(json))
//       .catch((err) => console.error("Error fetching Groceries:", err));
//   }, []);
//   // Handle responsive slides
//   const updateSlidesPerView = useCallback(() => {
//     const width = window.innerWidth;
//     let slides = 1; // Default for mobile

//     if (width >= 1024) {
//       slides = 4; // Desktop
//     } else if (width >= 768) {
//       slides = 2; // Tablet
//     } else {
//       slides = 1; // Mobile
//     }

//     setSlidesPerView(slides);
//     setIsMobile(width < 768);
//     // Reset to first slide on resize if needed
//     if (currentSlide > products.length - slides) {
//       setCurrentSlide(Math.max(0, products.length - slides));
//     }
//   }, [currentSlide, products.length]);

//   useEffect(() => {
//     updateSlidesPerView();
//     window.addEventListener("resize", updateSlidesPerView);
//     return () => window.removeEventListener("resize", updateSlidesPerView);
//   }, [updateSlidesPerView]);

//   const maxSlide = Math.max(0, products.length - slidesPerView);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => Math.max(prev - 1, 0));
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Mobile swipe functionality
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       nextSlide();
//     }
//     if (isRightSwipe) {
//       prevSlide();
//     }

//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   return (
//     <div className="w-full py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
//       {/* Section Header - Mobile Optimized */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
//         <div className="w-full sm:w-auto">
//           <div className="flex items-center justify-between sm:justify-start gap-2 mb-2">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
//               Featured Products
//             </h2>
//             <div className="sm:hidden flex items-center gap-2">
//               <button
//                 onClick={prevSlide}
//                 disabled={currentSlide === 0}
//                 className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//               >
//                 <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 disabled={currentSlide === maxSlide}
//                 className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//               >
//                 <ChevronRight size={20} className="sm:w-6 sm:h-6" />
//               </button>
//             </div>
//           </div>
//           <p className="text-sm sm:text-base text-gray-600">
//             Limited time offers - Don't miss out!
//           </p>
//         </div>

//         {/* Desktop Navigation Controls */}
//         <div className="hidden sm:flex items-center gap-3">
//           <button
//             onClick={prevSlide}
//             disabled={currentSlide === 0}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-600">
//               {currentSlide + 1} / {maxSlide + 1}
//             </span>
//           </div>
//           <button
//             onClick={nextSlide}
//             disabled={currentSlide === maxSlide}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Filter Tags */}
//       <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 sm:hidden">
//         <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-full whitespace-nowrap">
//           All Products
//         </button>
//         <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap">
//           Electronics
//         </button>
//         <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap">
//           Fashion
//         </button>
//         <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap">
//           Best Sellers
//         </button>
//       </div>

//       {/* Slider Container */}
//       <div
//         className="relative overflow-hidden"
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {/* Slider Track */}
//         <div
//           className="flex transition-transform duration-300 ease-in-out touch-pan-y"
//           style={{
//             transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
//           }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="flex-shrink-0 px-2 sm:px-3"
//               style={{ width: `${100 / slidesPerView}%` }}
//             >
//               <div className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
//                 {/* Product Image */}
//                 <div className="relative overflow-hidden flex-shrink-0">
//                   <div
//                     className={`h-40 sm:h-48 md:h-56 ${product.imageColor} relative`}
//                   >
//                     {/* Discount Badge */}
//                     <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full flex items-center gap-1">
//                       <Tag size={10} />
//                       {product.discount}
//                     </div>

//                     {/* New Badge */}
//                     {product.isNew && (
//                       <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
//                         NEW
//                       </div>
//                     )}

//                     {/* Action Buttons - Mobile optimized */}
//                     <div className="absolute bottom-3 right-3 flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
//                       <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all">
//                         <Heart
//                           size={14}
//                           className="sm:w-4 sm:h-4 text-gray-600"
//                         />
//                       </button>
//                       <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all">
//                         <Eye
//                           size={14}
//                           className="sm:w-4 sm:h-4 text-gray-600"
//                         />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
//                   {/* Category */}
//                   <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1 truncate">
//                     {product.category}
//                   </p>

//                   {/* Product Name */}
//                   <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
//                     {product.name}
//                   </h3>

//                   {/* Rating - Mobile compact */}
//                   <div className="flex items-center gap-1 mb-2 sm:mb-3">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={12}
//                           className={`${
//                             i < Math.floor(product.rating)
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-gray-300"
//                           } sm:w-4 sm:h-4`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-gray-600 ml-1">
//                       {product.rating} ({product.reviewCount})
//                     </span>
//                   </div>

//                   {/* Tags - Mobile optimized */}
//                   <div className="flex flex-wrap gap-1 mb-3 sm:mb-4 flex-1">
//                     {product.tags
//                       .slice(0, isMobile ? 2 : 3)
//                       .map((tag, index) => (
//                         <span
//                           key={index}
//                           className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     {product.tags.length > (isMobile ? 2 : 3) && (
//                       <span className="text-xs text-gray-400 px-2 py-1">
//                         +{product.tags.length - (isMobile ? 2 : 3)}
//                       </span>
//                     )}
//                   </div>

//                   {/* Price & CTA - Mobile optimized */}
//                   <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
//                     <div className="min-w-0">
//                       <div className="flex items-baseline gap-1 sm:gap-2">
//                         <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
//                           {product.price}
//                         </span>
//                         <span className="text-xs sm:text-sm text-gray-400 line-through truncate">
//                           {product.originalPrice}
//                         </span>
//                       </div>
//                       <p className="text-xs text-green-600 font-semibold truncate">
//                         Save $
//                         {(
//                           parseFloat(product.originalPrice.replace("$", "")) -
//                           parseFloat(product.price.replace("$", ""))
//                         ).toFixed(2)}
//                       </p>
//                     </div>

//                     {/* Add to Cart Button - Mobile optimized */}
//                     <button className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white p-2 sm:px-3 sm:py-2 rounded-lg transition-colors active:scale-95 flex-shrink-0 ml-2">
//                       <ShoppingCart size={isMobile ? 16 : 18} />
//                       {!isMobile && <span className="ml-2 text-sm">Add</span>}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Desktop gradient fade edges */}
//         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
//         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
//       </div>

//       {/* Mobile Dots and Info */}
//       <div className="mt-4 sm:mt-6 flex flex-col items-center">
//         {/* Dots for mobile */}
//         <div className="flex justify-center gap-1.5 mb-3">
//           {Array.from({ length: maxSlide + 1 }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 currentSlide === index ? "bg-purple-600 w-6" : "bg-gray-300"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>

//         {/* Slide counter for mobile */}
//         <div className="text-sm text-gray-600 mb-4 sm:hidden">
//           <span className="font-semibold">{currentSlide + 1}</span> of{" "}
//           <span className="font-semibold">{maxSlide + 1}</span> slides
//         </div>

//         {/* View All Button - Mobile optimized */}
//         <div className="w-full text-center">
//           <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base">
//             View All Products ({products.length})
//           </button>
//           <p className="text-xs text-gray-500 mt-2">
//             Free shipping on orders over $50
//           </p>
//         </div>
//       </div>

//       {/* Mobile quick actions bar */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around items-center shadow-lg sm:hidden z-50">
//         <button className="flex flex-col items-center text-gray-600 active:text-purple-600">
//           <ShoppingCart size={20} />
//           <span className="text-xs mt-1">Cart</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-600 active:text-purple-600">
//           <Heart size={20} />
//           <span className="text-xs mt-1">Wishlist</span>
//         </button>
//         <button className="flex flex-col items-center text-purple-600">
//           <Tag size={20} />
//           <span className="text-xs mt-1">Deals</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-600 active:text-purple-600">
//           <Star size={20} />
//           <span className="text-xs mt-1">Top Rated</span>
//         </button>
//       </div>

//       {/* Padding for bottom bar */}
//       <div className="pb-16 sm:pb-0"></div>
//     </div>
//   );
// };

// export default Groceries;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// New code
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

const Groceries = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [groceriesData, setGroceriesData] = useState([]);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [notification, setNotification] = useState(null);

  // Fetch groceries data
  useEffect(() => {
    fetch("https://my-ecommm.vercel.app/api/Groceries")
      .then((res) => res.json())
      .then((json) => setGroceriesData(json))
      .catch((err) => console.error("Error fetching Groceries:", err));
  }, []);

  // Handle responsive slides
  const updateSlidesPerView = useCallback(() => {
    const width = window.innerWidth;
    let slides = 1;

    if (width >= 1024) slides = 4;
    else if (width >= 768) slides = 2;
    else slides = 1;

    setSlidesPerView(slides);
    setIsMobile(width < 768);

    if (currentSlide > groceriesData.length - slides) {
      setCurrentSlide(Math.max(0, groceriesData.length - slides));
    }
  }, [currentSlide, groceriesData.length]);

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [updateSlidesPerView]);

  const maxSlide = Math.max(0, groceriesData.length - slidesPerView);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index) => setCurrentSlide(index);

  // Mobile swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add to wishlist handler
  const addToWishlist = (product) => {
    // Check if already in wishlist
    if (wishlistItems.has(product.id)) {
      setNotification({
        type: "info",
        message: "Item already in wishlist",
      });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    // Send to backend
    fetch("https://my-ecommm.vercel.app/api/wishlist", {
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
          message: "Error adding to wishlist",
        });
        setTimeout(() => setNotification(null), 2000);
      });
  };

  return (
    <div className="w-full py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 ${notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          style={{
            animation: "slideIn 0.3s ease-in-out",
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8 gap-3 sm:gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-2 mb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Limited time offers - Don't miss out!
          </p>
        </div>

        {/* Desktop Controls */}
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

      {/* Mobile Filter Tags */}
      <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 sm:hidden">
        <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-full whitespace-nowrap">
          All Products
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap">
          Electronics
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap">
          Fashion
        </button>
        <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap">
          Best Sellers
        </button>
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
          {groceriesData.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <div className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                <div className="relative overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 sm:h-48 md:h-56 w-full object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Tag size={10} />
                      {product.discount}
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => addToWishlist(product)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all ${wishlistItems.has(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600"
                        }`}
                    >
                      <Heart
                        size={14}
                        className={`sm:w-4 sm:h-4 ${wishlistItems.has(product.id) ? "fill-white" : ""
                          }`}
                      />
                    </button>
                    <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all">
                      <Eye size={14} className="sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                  <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1 truncate">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                  </h3>
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

        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col items-center">
        <div className="flex justify-center gap-1.5 mb-3">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-purple-600 w-6" : "bg-gray-300"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600 mb-4 sm:hidden">
          <span className="font-semibold">{currentSlide + 1}</span> of{" "}
          <span className="font-semibold">{maxSlide + 1}</span> slides
        </div>
        <div className="w-full text-center">
          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base">
            View All Products ({groceriesData.length})
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Free shipping on orders over $50
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around items-center shadow-lg sm:hidden z-50">
        <button className="flex flex-col items-center text-gray-600 active:text-purple-600">
          <ShoppingCart size={20} />
          <span className="text-xs mt-1">Cart</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 active:text-purple-600">
          <Heart size={20} />
          <span className="text-xs mt-1">Wishlist</span>
        </button>
        <button className="flex flex-col items-center text-purple-600">
          <Tag size={20} />
          <span className="text-xs mt-1">Deals</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 active:text-purple-600">
          <Star size={20} />
          <span className="text-xs mt-1">Top Rated</span>
        </button>
      </div>
      <div className="pb-16 sm:pb-0"></div>
    </div>
  );
};

export default Groceries;
