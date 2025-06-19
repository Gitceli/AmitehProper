import '../../tailwind.css';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const RcarouselPart = ({ length, img, naslov }) => {
  return (
    <Carousel className="w-full max-w-xl m-5">
      <h2 className="items-center justify-center text-4xl font-bold text-gray-900 m-5">
        <a>{naslov}</a><p>{length}</p>
      </h2>
      <CarouselContent className=" ">
        {img.map((image, index) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                  <img src={image} alt={`carousel-item-${index}`} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RcarouselPart;
