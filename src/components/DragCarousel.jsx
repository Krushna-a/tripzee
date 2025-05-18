import { useState, useRef, useEffect } from "react";

const DragCarousel = ({ slides, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes("touch") ? e.touches[0].clientX : e.clientX);
    e.preventDefault();
    clearInterval(autoPlayRef.current);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes("touch")
      ? e.touches[0].clientX
      : e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = carouselRef.current.offsetWidth * 0.3;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      } else {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
    }
    setTranslateX(0);
    startAutoPlay();
  };

  const startAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("mousedown", handleDragStart);
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);

    carousel.addEventListener("touchstart", handleDragStart, {
      passive: false,
    });
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      carousel.removeEventListener("mousedown", handleDragStart);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      carousel.removeEventListener("touchstart", handleDragStart);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, translateX]);

  return (
    <div className="relative w-full h-[250px] sm:h-[400px] md:h-[600px] overflow-hidden select-none">
      <div
        ref={carouselRef}
        className="flex h-full w-full cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          transition: isDragging ? "none" : "transform 0.5s ease",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-4 sm:p-8 md:p-16">
              <h2 className="text-white text-2xl sm:text-4xl md:text-6xl font-bold text-center leading-tight">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DragCarousel;
