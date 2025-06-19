
import * as React from "react"

import { Button } from "@/components/ui/button"


import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel"

//length je za test     
const LogoCarousel = ({ length, img, alt, name }) => {
    return (
        <>
            <h2 className=" items-center justify-center text-4xl font-bold text-gray-900 m-5" ><a>{name}</a></h2>
            <Carousel
             opts={{
                align: "start",
                loop: true,
                slidesToScroll: 5, // Default number of items to scroll
                breakpoints: {
                    640: { slidesToScroll: 1 }, // Mobile: 1 item
                    768: { slidesToScroll: 2 }, // Tablet: 2 items
                    1024: { slidesToScroll: 3 }, // Desktop: 3 items
                  },
            }}
            
                className="w-full max-w-xl m-5">
                <CarouselContent className="-ml-1">
                    {Array.from({ length }).map((_, index) => (
                        <CarouselItem key={index} className="pl-1  md:basis-1/2 lg:basis-1/3 xl:basis-1/5 ">
                            <div className="p-1">
                                <Card className="border-0 shadow-none">
                                    <CardContent className="flex items-center justify-center p-5">
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
    )
}

export default LogoCarousel



//<Button>CTA</Button>
