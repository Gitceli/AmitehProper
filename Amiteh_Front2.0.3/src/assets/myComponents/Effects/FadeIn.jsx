import React, { useEffect, useRef, useState } from 'react';

/**
 * FadeInSection - A wrapper component that fades in its children when scrolled into view
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be displayed
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.threshold - Visibility threshold to trigger fade-in (0-1)
 * @param {string} props.rootMargin - Margin around the root
 * @param {number} props.delay - Delay before starting the fade-in animation (ms)
 * @param {number} props.duration - Duration of the fade-in animation (ms)
 * @param {Object} props.style - Additional inline styles
 */
const FadeInSection = ({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0,
  duration = 1000,
  style = {},
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        // If already animated once, don't trigger again
        if (!hasAnimated && entry.isIntersecting) {
          // Set a small delay to ensure DOM is ready
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        root: null, // Use viewport
        rootMargin,
        threshold
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, rootMargin, threshold, delay]);

  const combinedStyle = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`
  };

  return (
    <div 
      ref={domRef}
      className={`fade-in-section ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeInSection;