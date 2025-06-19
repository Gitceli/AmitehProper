import '../../tailwind.css';
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const RcarouselObject = ({ object, title, loading }) => {
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

  const slidesToShow = Math.min(slidesToScroll, object.length);

  if (loading || !object || !object.results) {
    return <div>Loading... </div>;
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-gray-900 m-5">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll,
        }}
        className="w-full max-w-full m-5"
      >
        <CarouselContent className="-ml-1">
          {object.results.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
            >
              <div className="p-1">
                <Card className="w-full h-full max-h-80 border-0 shadow-0"> {/* Ensure cards have a consistent size */}
                  <CardContent className="flex flex-col justify-center items-center h-full">
                    <img
                      src={item.image || '/herroimg.png'}
                      alt={item.name || "Image not found"}
                      className="h-32 w-32 object-cover mb-4"  
                    />
                    <span className="text-lg font-medium mt-2 text-center"> {/* Center aligned title */}
                      {item.name}
                    </span>
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

export default RcarouselObject;
