import React, { useEffect, useRef, useState } from 'react';

const MeasurementScrollAnimation = () => {
  // State for animation progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePoint, setActivePoint] = useState(null);
  const [isHorizontalActive, setIsHorizontalActive] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  
  // Refs
  const containerRef = useRef(null);
  
  // Circuit component definition - positioning along the horizontal path
  const circuitPoints = [
    { id: 'input', position: 10, label: 'Input', color: '#60A5FA', description: 'High-impedance input with protection circuitry' },
    { id: 'filter', position: 25, label: 'Filter', color: '#60A5FA', description: 'Precision bandpass filter' },
    { id: 'amp', position: 40, label: 'Amp', color: '#34D399', description: 'Low-noise differential amplifier stage' },
    { id: 'processor', position: 60, label: 'Processor', color: '#F59E0B', description: 'Digital signal processing unit' },
    { id: 'buffer', position: 75, label: 'Buffer', color: '#6B7280', description: 'Output buffer with impedance matching' },
    { id: 'output', position: 90, label: 'Output', color: '#6B7280', description: 'High-precision measurement output' }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate where horizontal scrolling should start and end
      const startTrigger = containerRef.current.offsetTop;
      const endTrigger = startTrigger + containerRef.current.offsetHeight - windowHeight;
      
      if (scrollY >= startTrigger && scrollY <= endTrigger) {
        // Calculate progress (0 to 1)
        const progress = (scrollY - startTrigger) / (endTrigger - startTrigger);
        setScrollProgress(Math.min(1, Math.max(0, progress)));
        setIsHorizontalActive(true);
        
        // Set text change at halfway point
        setShowSecondText(progress > 0.5);
        
        // Find active point based on progress
        let currentActive = null;
        for (let i = circuitPoints.length - 1; i >= 0; i--) {
          if (progress * 100 >= circuitPoints[i].position) {
            currentActive = circuitPoints[i].id;
            break;
          }
        }
        setActivePoint(currentActive);
      } else {
        setIsHorizontalActive(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Generate animated sine wave path
  const generateWavePath = (offset = 0) => {
    const segments = 50;
    const points = [];
    const amplitude = 15;
    const frequency = 0.15;
    
    for (let i = 0; i <= segments * scrollProgress; i++) {
      const x = (i / segments) * 100;
      const phase = offset + scrollProgress * 10;
      const y = 50 + Math.sin((x * frequency) + phase) * amplitude;
      points.push(`${x}% ${y}%`);
    }
    
    return points.length > 0 ? `M ${points.join(' L ')}` : 'M 0 50 L 0 50';
  };
  
  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: '200vh' }}>
      {/* Fixed header section for the text */}
      <div className={`fixed top-0 left-0 w-full z-30 transition-opacity duration-500 pt-16 px-4 
                       ${isHorizontalActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="text-white">Measurement</span>
            <span className="text-blue-400 ml-2">Challenges</span>
          </h2>
          <p className={`text-xl text-gray-300 transition-opacity duration-500 ${showSecondText ? 'opacity-0 absolute' : 'opacity-100'}`}>
            High-precision electronics require advanced testing solutions for accurate measurements.
          </p>
          <p className={`text-xl text-gray-300 transition-opacity duration-500 ${showSecondText ? 'opacity-100' : 'opacity-0 absolute'}`}>
            Our precision measurement systems provide unmatched accuracy for your electronics.
          </p>
        </div>
      </div>
      
      {/* First section to allow scrolling to begin */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-3xl mx-auto px-4">
         
          
          
          {/* Scroll indicator removed as requested */}
        </div>
      </div>
      
      {/* Horizontal scrolling section */}
      <div className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 
                       ${isHorizontalActive ? 'opacity-100 z-20' : 'opacity-0 -z-10'}`}>
        {/* Oscilloscope grid background */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
          {Array.from({ length: 13 }).map((_, i) => (
            <React.Fragment key={`grid-${i}`}>
              <div 
                className={`col-span-12 h-px bg-gray-600 ${i % 3 === 0 ? 'bg-opacity-100' : 'bg-opacity-50'}`} 
                style={{ gridRow: i + 1 }}
              />
              <div 
                className={`row-span-12 w-px bg-gray-600 ${i % 3 === 0 ? 'bg-opacity-100' : 'bg-opacity-50'}`} 
                style={{ gridColumn: i + 1 }}
              />
            </React.Fragment>
          ))}
        </div>
        
        <div className="w-full max-w-5xl mx-auto relative" style={{ height: '10px' }}>
          {/* Main connection line */}
          <div className="absolute left-0 top-1/2 w-full h-3 bg-gray-800 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Active connection */}
          <div 
            className="absolute left-0 top-1/2 h-3 transform -translate-y-1/2 rounded-full transition-all duration-300"
            style={{ 
              width: `${scrollProgress * 100}%`, 
              background: 'linear-gradient(90deg, #60A5FA 0%, #34D399 40%, #F59E0B 60%, #6B7280 100%)',
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
            }}
          ></div>
          
          {/* Signal wave visualization */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={generateWavePath()}
                fill="none"
                stroke="rgba(59, 130, 246, 0.7)"
                strokeWidth="1"
                strokeDasharray="4,2"
              />
              <path
                d={generateWavePath(2)}
                fill="none"
                stroke="rgba(139, 92, 246, 0.5)"
                strokeWidth="1.5"
                style={{ transform: 'translateY(3px)' }}
              />
            </svg>
          </div>
          
          {/* Connection points */}
          {circuitPoints.map((point, index) => {
            const isActive = scrollProgress * 100 >= point.position;
            const isCurrentActive = activePoint === point.id;
            
            // Determine popup position based on which point is active
            const getPopupPosition = (pointIndex) => {
              if (isCurrentActive) {
                // Position popup to the right side of the active point
                // Shift popup more to the right for earlier points (except first)
                if (pointIndex === 0) return { left: "110%" };
                if (pointIndex === 1) return { left: "110%" };
                if (pointIndex === 2) return { left: "110%" };
                if (pointIndex === 3) return { right: "110%" };
                if (pointIndex === 4) return { right: "110%" };
                return { right: "110%" };
              }
              return {};
            };
            
            // Get the arrow position based on popup position
            const getArrowPosition = (pointIndex) => {
              if (pointIndex < 3) {
                return { left: "-6px", borderTop: "1px solid", borderLeft: "1px solid", right: "auto" };
              } else {
                return { right: "-6px", borderTop: "1px solid", borderRight: "1px solid", left: "auto" };
              }
            };
            
            return (
              <div 
                key={point.id}
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
                style={{ left: `${point.position}%` }}
              >
                {/* Connection point */}
                <div 
                  className="rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    width: isCurrentActive ? '2.5rem' : '1.5rem',
                    height: isCurrentActive ? '2.5rem' : '1.5rem',
                    backgroundColor: isActive ? point.color : '#1F2937',
                    boxShadow: isActive ? `0 0 ${isCurrentActive ? '20px' : '10px'} ${point.color}` : 'none',
                    transform: isCurrentActive ? 'scale(1.2)' : 'scale(1)',
                    zIndex: isCurrentActive ? 30 : 20
                  }}
                >
                  {isActive && (
                    <div 
                      className="absolute w-full h-full rounded-full animate-ping opacity-70"
                      style={{ backgroundColor: point.color }}
                    ></div>
                  )}
                </div>
                
                {/* Label */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 mt-1 font-mono text-xs text-center transition-all duration-300"
                  style={{ 
                    color: isActive ? point.color : '#6B7280',
                    opacity: isActive ? 1 : 0.7,
                    fontWeight: isCurrentActive ? 'bold' : 'normal'
                  }}
                >
                  {point.label}
                </div>
                
                {/* Popup description - positioned to the side of the active dot */}
                {isCurrentActive && (
                  <div 
                    className="absolute p-4 bg-gray-900 border rounded-lg shadow-lg z-50 w-64 animate-fadeIn"
                    style={{ 
                      top: '-60px',
                      borderColor: point.color, // Dynamic border color matching the point
                      boxShadow: `0 0 15px ${point.color}40`,
                      ...getPopupPosition(index)
                    }}
                  >
                    <div className="font-bold text-white mb-2">
                      {point.label}
                    </div>
                    <p className="text-gray-300 text-sm">{point.description}</p>
                    <div 
                      className="absolute w-4 h-4 bg-gray-900 transform rotate-45"
                      style={{ 
                        bottom: '15px',
                        ...getArrowPosition(index),
                        borderColor: point.color // Dynamic border color for the arrow
                      }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Moving probe/cursor - enters from the left */}
          <div 
            className="absolute z-40 flex flex-col items-center transition-all duration-300 ease-out" 
            style={{ 
              left: `${scrollProgress * 100}%`, 
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Oscilloscope probe */}
            <div className="w-8 h-16 mb-2 bg-blue-600 rounded-t-full relative overflow-hidden">
              <div className="absolute w-6 h-6 bg-blue-300 rounded-full top-2 left-1 animate-pulse"></div>
            </div>
            <div className="w-3 h-24 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600"></div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
              <div className="w-8 h-8 bg-blue-400 rounded-full animate-ping absolute opacity-50"></div>
              <div className="w-6 h-6 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final section - static at bottom for scroll room */}
      <div className="h-screen mt-screen pt-screen"></div>
      
      {/* Extra space to ensure enough scrolling range */}
      <div className="h-screen"></div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          0% {
            transform: scale(0.2);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MeasurementScrollAnimation;