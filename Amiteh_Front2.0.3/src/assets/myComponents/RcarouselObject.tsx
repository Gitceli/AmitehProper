"use client";

import * as React from "react";
import PropTypes from "prop-types"; // Added PropTypes import
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

// Define the PropTypes for the component
const RcarouselObject = ({ object, title, loading }) => {
  const [slidesToShow, setSlidesToShow] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setSlidesToShow(5);
      else if (window.innerWidth >= 1024) setSlidesToShow(4);
      else if (window.innerWidth >= 768) setSlidesToShow(3);
      else if (window.innerWidth >= 640) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CardSkeleton = () => (
    <Card className="w-full h-full">
      <CardContent className="flex flex-col items-center justify-center p-4 h-full">
        <Skeleton className="w-full h-3/4 mb-4" />
        <Skeleton className="w-3/4 h-4" />
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {loading
            ? Array.from({ length: slidesToShow }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="aspect-square">
                    <CardSkeleton />
                  </div>
                </CarouselItem>
              ))
            : object.results.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="aspect-square">
                    <Card className="w-full h-full">
                      <CardContent className="flex flex-col items-center justify-between p-4 h-full">
                        <div className="w-full h-3/4 mb-4 overflow-hidden">
                          <img
                            src={item.image || "/herroimg.png"}
                            alt={item.name || "Image not found"}
                            className="w-full h-full object-contain "
                          />
                        </div>
                        <div className="w-full text-center">
                          <span className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

// PropTypes definition
RcarouselObject.propTypes = {
  object: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string, // Added name as it's used in the component
      })
    ),
  }).isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RcarouselObject;
