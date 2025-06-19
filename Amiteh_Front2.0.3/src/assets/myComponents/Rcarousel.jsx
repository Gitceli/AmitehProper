import '../../tailwind.css';
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const Rcarousel = ({ length, img, alt, name }) => {
  // Determine the number of slides to show and scroll based on screen size
  const getSlidesToScroll = () => {
    if (window.innerWidth >= 1280) return 5; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 768) return 2; // md
    return 1; // default
  };

  // Initialize slidesToScroll value
  const [slidesToScroll, setSlidesToScroll] = React.useState(getSlidesToScroll());

  // Update slidesToScroll on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setSlidesToScroll(getSlidesToScroll());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesToShow = Math.min(slidesToScroll, length);

  return (
    <>
      <h2 className="items-center justify-center text-4xl font-bold text-gray-900 m-5">
        <a>{name}</a>
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll, // Set dynamically based on screen size
        }}
        className="w-full max-w-xl m-5 container mx-auto my-8 px-6 py-8"
      >
        <CarouselContent className="flex items-stretch -ml-1">
          {Array.from({ length }).map((_, index) => (
            <CarouselItem
              key={index}
              className="  pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 xxl:basis-1/6"
            >
              <div className="p-1 flex flex-col h-full">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-4">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                    <img src={img} alt={alt} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default Rcarousel;
