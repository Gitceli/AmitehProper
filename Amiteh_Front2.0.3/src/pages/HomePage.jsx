import * as React from "react";
import Rcarousel from "@/assets/myComponents/Rcarousel";
import RcarouselObject from '@/assets/myComponents/RcarouselObjectt';
import RcarouselRelated from '@/assets/myComponents/RcarouselRelated';
import Products from "@/assets/myComponents/Products";
import LogoCarouselObject from '@/assets/myComponents/LogoCarouselObject';
import Novo from '@/assets/myComponents/Novo';
import useFetchData from "@/assets/myComponents/hooks/useFetchData";
import Hero from "@/assets/myComponents/herro";
import NavMenuFull from "@/assets/myComponents/NavMenuFull";
import HeroContent from "@/assets/myComponents/herro/HerroContent";
import PremiumShowcase from '@/assets/myComponents/PremiumShowcase';
import TripleCarousel from '@/assets/myComponents/TripleCarousel';
import TripleCarouselObject from "../assets/myComponents/TripleCarouselObject";
import HorizontalScroll from "../assets/myComponents/HorizontalScroll";
import FadeInSection from "@/assets/myComponents/Effects/FadeIn.jsx";






const Homepage = () => {
  const { makes, categories, areas, loading, error } = useFetchData();
  const [scrollY, setScrollY] = React.useState(0);
  const heroRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateOpacity = () => {
    if (!heroRef.current) return 1;
    const heroHeight = heroRef.current.offsetHeight;
    const fadeStart = heroHeight * 0.3; // Start fading when 50% of the hero is scrolled
    const opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / (heroHeight - fadeStart), 0), 1);
    return opacity;
  };

  return (
    <>

    <div className="electronic-pattern">

      <div className="parallax-container">
        <div
          ref={heroRef}
          className="parallax-hero "
          style={{
           transform: `translateY(${scrollY * 0.5}px)`,
            opacity: calculateOpacity()
          }}

        >
          <HeroContent />

        </div>
      </div> 
      <HorizontalScroll />
      <FadeInSection 
        threshold={0.05}
        rootMargin="0px 0px 500px 0px" 
        duration={1200}
        style={{ marginTop: '-250px' }} // Reduce the gap between components
      >
      <TripleCarouselObject />
      </FadeInSection>
      <div className=" content mt-20">
        <LogoCarouselObject className="flex mt-10" title="Proizvajalci" object={makes} loading={loading} />
        <div className="flex mt-5 flex-col items-center">
          <RcarouselObject className="flex mt-1000" title="Kategorije" object={categories} />
        </div>
        <div className="flex mt-5 flex-col items-center">
          <Rcarousel className="flex mt-1000" img="public/63700.png" length={20} name="Novo" />
          <Products />
        </div>
        <div className="flex mt-5 flex-col items-center">
          <Rcarousel className="flex mt-1000" length={100} naslov="Carousel Naslov" />
        </div>
      </div>

      <style jsx>{`
        .parallax-container {
          height: 100vh;
          background-attachment: fixed;
          
          background-image: url('/OIGG.jpeg');
          background-size: cover;
          background-position: center;
        }

        .parallax-hero {
          width: 100vw;
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
          z-index: 1;
        }
         
      `}</style>
    </div>
    </>
  );
};

export default Homepage;