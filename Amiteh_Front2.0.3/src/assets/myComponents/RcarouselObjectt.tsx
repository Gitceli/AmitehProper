'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselObject {
  results: Array<{
    image?: string
    name: string
  }>
}

interface RcarouselObjectProps {
  object: CarouselObject
  title: string
  loading: boolean
}

export default function Component({ object, title, loading }: RcarouselObjectProps) {
  const [slidesToShow, setSlidesToShow] = React.useState(1)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) setSlidesToShow(5) // 2xl
      else if (window.innerWidth >= 1280) setSlidesToShow(4) // xl
      else if (window.innerWidth >= 1024) setSlidesToShow(3) // lg
      else if (window.innerWidth >= 768) setSlidesToShow(2) // md
      else setSlidesToShow(1) // sm and default
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading || !object || !object.results) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: slidesToShow,
            skipSnaps: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {object.results.map((item, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 pl-4">
                <Card className="h-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image || '/herroimg.png'}
                        alt={item.name || "Image not found"}
                        className="w-full h-full object-fit"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
            <ChevronLeft className="h-6 w-6" />
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <ChevronRight className="h-6 w-6" />
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  )
}