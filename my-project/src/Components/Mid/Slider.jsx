import React, { useState, useEffect } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "40+ Lives Lost, Thousands Missing",
      subtitle: "Jammu & Punjab Floods Relief",
      cta: "Donate Now",
      bgImage:
        "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      overlay: "rgba(0,0,0,0.5)",
    },
    {
      title: "Help Flood Victims",
      subtitle: "Emergency Relief Needed",
      cta: "Support Now",
      bgImage:
        "https://images.unsplash.com/photo-1577896851231-70ef18861754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      overlay: "rgba(79,70,229,0.6)",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-lg shadow-md container mx-auto px-3 sm:px-4 mt-6 sm:mt-8">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: slide.overlay }}
          />

          {/* Content - Ultra Compact */}
          <div className="relative z-10 flex flex-col justify-center h-full text-white px-4 sm:px-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              {/* Text Content */}
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-bold leading-tight line-clamp-2">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm opacity-90 mt-1 line-clamp-2">
                  {slide.subtitle}
                </p>
              </div>

              {/* CTA Button */}
              <button className="mt-3 sm:mt-0 bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 sm:py-2 sm:px-5 rounded-full text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Only - No Arrows */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Emergency Badge - Small */}
      <div className="absolute top-2 right-2 z-20">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          URGENT
        </span>
      </div>
    </div>
  );
};

export default Slider;
