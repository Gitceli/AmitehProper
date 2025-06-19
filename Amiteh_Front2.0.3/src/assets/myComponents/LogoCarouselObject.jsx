import '../../tailwind.css';
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";


const LogoCarouselObject = ({ object, title, loading }) => {
    if (loading || !object || !object.results) {
        return <div>Loading... </div>;
    }

    // Determine the number of slides to show and scroll based on screen size
    const getSlidesToScroll = () => {
        if (window.innerWidth >= 1280) return 6; // xl
        if (window.innerWidth >= 1024) return 4; // lg
        if (window.innerWidth >= 768) return 3; // md
        if (window.innerWidth >= 768) return 2; // md

        return 1; // default
    };

    // Initialize slidesToScroll value
    const [slidesToScroll, setSlidesToScroll] = React.useState(getSlidesToScroll());

    // Update slidesToScroll on window resize with debounce for performance
    React.useEffect(() => {
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setSlidesToScroll(getSlidesToScroll());
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    const navigate = useNavigate();
    const handleCardClick = (item) => {
        navigate(`/Proizvajalci/${item.name}`, { state: { item } });
    };


    const slidesToShow = Math.min(slidesToScroll, object.results.length);

    
       
    return (
        <>
            <div className="w-full    my-8">
                {/* Carousel Title */}
                <h2 className="text-center text-2xl font-bold text-gray-900 my-5">{title}</h2>

                {/* Carousel Container */}
                <Carousel
                
                    plugins={[
                         Autoplay({
                           delay: 3000,
                         }),
                    ]}
                    opts={{
                        align: "start",
                        
                        loop: true,
                        slidesToShow: slidesToShow,
                        slidesToScroll: slidesToScroll, // Set dynamically based on screen size
                    }}
                    className=" w-full  px-6 py-8"
                >
                    {/* Carousel Content */}
                    <CarouselContent className="flex items-stretch">
                        {object.results.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 flex flex-col"
                            >
                                <div className="p-1 flex flex-col h-full">
                                    <Card
                                        onClick={() => handleCardClick(item)}
                                        className="flex-grow border-0 shadow-none bg-transparent  hover:scale-105 transition-transform cursor-pointer"
                                    >
                                        <CardContent className=" flex flex-col mx-2 aspect-square items-center justify-center mt-1 p-1">
                                            <img
                                                className="w-full h-full object-contain p-1"
                                                src={item.image || "/63700.png"}
                                                alt={item.name || "Image"}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Carousel Navigation Buttons 
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity">
                        &#8249;
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity">
                        &#8250;
                    </CarouselNext>*/}
                </Carousel>
            </div>

            <style jsx>{`
            .logocaro {
              transform: rotate(15deg);
              transform-origin: 20% 40%;
              z-index: -1;
            }
            
          `}</style>

        </>
    );

};



export default LogoCarouselObject;
