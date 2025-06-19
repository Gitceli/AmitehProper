import * as React from "react";

import HeroContent from "@/assets/myComponents/herro/HerroContent";



const Parallax = ({ backgroundImage, text }) => {
    const [scrollY, setScrollY] = React.useState(0);
    const heroRef = React.useRef(null);
  
    React.useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const calculateOpacity = () => {
      if (!heroRef.current) return 1;
      const heroHeight = heroRef.current.offsetHeight;
      const fadeStart = heroHeight * 0.3;
      const opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / (heroHeight - fadeStart), 0), 1);
      return opacity;
    };
  
    return (
      <div className="parallax-container">
        <div
          ref={heroRef}
          className="parallax-hero"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: calculateOpacity(),
          }}
        >
          <div className="content">{text}</div>
        </div>
  
        <style jsx>{`
          .parallax-container {
            height: 100vh;
            background-attachment: fixed;
            width: 100vw;
            overflow: hidden;
            position: relative;
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
          }
  
          .parallax-hero {
            width: 100vw;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease;
          }
  
          .content {
            position: absolute;
            z-index: 1;
            background-color: white;
            padding: 20px;
            font-size: 2rem;
          }
        `}</style>
      </div>
    );
  };
  
  export default Parallax;