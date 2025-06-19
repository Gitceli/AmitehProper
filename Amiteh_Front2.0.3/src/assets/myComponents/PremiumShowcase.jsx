import React, { useState, useRef, useEffect } from 'react';

const products = [
  {
    id: 1,
    name: "Premium Wireless Speaker",
    description: "Experience immersive sound with our premium wireless speaker. Features 360-degree audio technology and 20-hour battery life.",
    image: "/api/placeholder/400/320",
    price: "€199.99",
    category: "Audio"
  },
  {
    id: 2,
    name: "Ultra HD Smart Display",
    description: "Transform your viewing experience with our 4K Ultra HD display with HDR technology. Smart interface with voice control built-in.",
    image: "/api/placeholder/400/320",
    price: "€499.99",
    category: "Displays"
  },
  {
    id: 3,
    name: "Professional Camera Bundle",
    description: "Capture perfect moments with our professional-grade camera. Includes three specialty lenses and advanced image stabilization.",
    image: "/api/placeholder/400/320",
    price: "€899.99",
    category: "Photography"
  },
  {
    id: 4,
    name: "Advanced Gaming Console",
    description: "Next-generation gaming with 8K support, ray tracing, and ultra-fast loading times. Includes two wireless controllers.",
    image: "/api/placeholder/400/320",
    price: "€599.99",
    category: "Gaming"
  }
];

export default function PremiumShowcase() {
  const [hoveredId, setHoveredId] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Dynamically determine grid columns based on container width
  const getGridColumns = () => {
    if (containerWidth < 640) return 'grid-cols-1';
    if (containerWidth < 1024) return 'grid-cols-2';
    if (containerWidth < 1280) return 'grid-cols-3';
    return 'grid-cols-4';
  };
  
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-primary/80">
      <div ref={containerRef} className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 sm:mb-0">Premium Selection</h2>
          <a href="#" className="text-primary-foreground hover:text-accent-foreground transition-colors duration-300 font-medium text-base md:text-lg">
            View All &rarr;
          </a>
        </div>
        
        <div className={`grid ${getGridColumns()} gap-4 md:gap-6 lg:gap-8`}>
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-card/80 backdrop-filter backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden shadow-md md:shadow-xl transition-all duration-300 hover:shadow-2xl border border-border"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredId === product.id ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              
              <div className="p-4 md:p-6 flex flex-col h-48">
                <h3 className="text-lg md:text-xl font-semibold text-card-foreground mb-2">{product.name}</h3>
                <div className="flex-grow overflow-hidden">
                  <p className="text-muted-foreground text-xs md:text-sm line-clamp-3">{product.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl md:text-2xl font-bold text-primary">{product.price}</span>
                  <button 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md transition-colors duration-300 text-sm md:text-base ${
                      hoveredId === product.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}