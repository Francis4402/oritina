"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Link from 'next/link'

const CarouselHome = () => {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))
    const [isPlaying, setIsPlaying] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [api, setApi] = useState<any>()

    const images = [
        {
            image: "/clothimage/imgcarouselim1.png",
            title: "Summer Collection",
            subtitle: "Discover our latest fashion trends"
        },
        {
            image: "/clothimage/imgcarouselim2.png", 
            title: "Autumn Vibes",
            subtitle: "Cozy styles for the season"
        },
        {
            image: "/clothimage/imgcarouselim3.png",
            title: "Winter Essentials",
            subtitle: "Stay warm with premium quality"
        },
    ];

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrentSlide(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap())
        })
    }, [api])

    const togglePlayPause = () => {
        if (isPlaying) {
            plugin.current.stop()
        } else {
            plugin.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const goToSlide = (index: number) => {
        if (api) {
            api.scrollTo(index)
        }
    }

    return (
        <div className="relative w-full mx-auto overflow-hidden group">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                setApi={setApi}
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => isPlaying && plugin.current.play()}
                opts={{
                    loop: true,
                    align: "center",
                }}
            >
                <CarouselContent className="-ml-0">
                    {images.map((item, index) => (
                        <CarouselItem key={index} className="pl-0">
                            <div className="relative">
                                <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] xl:h-screen overflow-hidden">
                                    {/* Background Image with Parallax Effect */}
                                    <div className="absolute inset-0 transform scale-105 transition-transform duration-700 group-hover:scale-110">
                                        <Image
                                            src={item.image}
                                            alt={`${item.title} - ${item.subtitle}`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                            sizes="100vw"
                                        />
                                    </div>
                                    
                                    {/* Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    
                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="container mx-auto px-6 lg:px-12">
                                            <div className="max-w-2xl text-white">
                                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up">
                                                    {item.title}
                                                </h1>
                                                <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
                                                    {item.subtitle}
                                                </p>
                                                <div className="flex gap-4 animate-fade-in-up animation-delay-400">
                                                    <Link href={"/shop"} className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                                        Shop Now
                                                    </Link>
                                                    <Link href={"/aboutus"} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
                                                        Learn More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                {/* Custom Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between p-6 lg:p-12 pointer-events-none">
                    <CarouselPrevious className="pointer-events-auto static translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 h-14 w-14 bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-md text-white hover:text-white hover:scale-110 shadow-lg">
                        <ChevronLeft className="h-6 w-6" />
                    </CarouselPrevious>
                    <CarouselNext className="pointer-events-auto static translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 h-14 w-14 bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-md text-white hover:text-white hover:scale-110 shadow-lg">
                        <ChevronRight className="h-6 w-6" />
                    </CarouselNext>
                </div>
            </Carousel>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`transition-all duration-300 ${
                            currentSlide === index 
                                ? 'w-8 h-2 bg-white rounded-full' 
                                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/75'
                        }`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>

            {/* Play/Pause Control */}
            <div className="absolute bottom-8 right-8 z-20">
                <button
                    onClick={togglePlayPause}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/30"
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
            </div>
        </div>
    )
}

export default CarouselHome