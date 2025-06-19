import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useFetchHomepage from './hooks/useFetchHomepage';

// Individual Card Carousel Component
const CardCarousel = ({ title, slides, autoRotateDelay }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoRotateDelay);
    
    return () => clearInterval(interval);
  }, [slides.length, autoRotateDelay]);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      {/* Card Title */}
      <h3 className="text-xl font-bold pb-4 text-white relative bg-black">{title}</h3>
      
      {/* Card Carousel */}
      <div className="relative h-64">
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
          <button 
            onClick={handlePrev}
            className="p-1 rounded-full bg-gray-800/70 text-white hover:bg-gray-700/70 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
          <button 
            onClick={handleNext}
            className="p-1 rounded-full bg-gray-800/70 text-white hover:bg-gray-700/70 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Slides */}
        <div className="h-full relative">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="h-full flex flex-col justify-between p-6 bg-blue-600">
                {slide.image_url ? (
                  <div className="mb-3 -mt-2">
                    <img 
                      src={slide.image_url} 
                      alt={slide.sub_title} 
                      className="w-full h-28 object-cover rounded-md"
                    />
                  </div>
                ) : null}
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">{slide.sub_title}</h4>
                  <p className="text-white/80 text-sm">{slide.description}</p>
                </div>
                <div className="mt-3">
                  <button className="px-3 py-1 bg-white/20 text-white text-sm rounded hover:bg-white/30 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots Navigation */}
      <div className="flex justify-center py-3 gap-2 bg-gray-800">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const TripleCarouselObject = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { cardsData, loading, error, retry } = useFetchHomepage();
  
  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="text-white text-center py-12">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="text-red-500 text-center py-12">
          <p>Error loading carousel data: {error}</p>
          <button 
            onClick={retry} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Technologies Showcase</h2>
        <div className={`flex ${isMobile ? 'flex-col gap-8' : 'flex-row gap-4'}`}>
          {cardsData.map((card, index) => (
            <div key={card.id} className={`${isMobile ? 'w-full' : 'w-1/3'}`}>
              <CardCarousel 
                title={card.title} 
                slides={card.slides} 
                autoRotateDelay={card.auto_rotate_delay} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripleCarouselObject;