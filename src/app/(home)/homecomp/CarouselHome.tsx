"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { useRef } from 'react'

const CarouselHome = () => {

    const plugin = useRef(
        Autoplay({ delay: 3000 })
    )

    const images = [
        {
            image: "/clothimage/imgcarouselim1.png"
        },
        {
            image: "/clothimage/imgcarouselim2.png"
        },
        {
            image: "/clothimage/imgcarouselim3.png"
        },
    ];
    

  return (
     <div className="relative w-full mx-auto group">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-screen">
                    <Image
                        src={item.image}
                        alt={`Carousel image ${index + 1}`}
                        fill
                        className=""
                        priority={index === 0}
                    />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom positioned arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <CarouselPrevious className="static -translate-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 z-10 h-12 w-12 bg-white/80 hover:bg-white" />
          <CarouselNext className="static -translate-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4 z-10 h-12 w-12 bg-white/80 hover:bg-white" />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselHome