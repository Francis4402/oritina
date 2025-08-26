"use client"

import Image from 'next/image'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Logos = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.scrollWidth / 2;
        
        gsap.to(containerRef.current, {
            x: -width,
            duration: 30,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % width)
            }
        });
    });

    const logos = [
        {
            logo: "/clothimage/logo1.jpg"
        },
        {
            logo: "/clothimage/logo2.jpg"
        },
        {
            logo: "/clothimage/logo3.jpg"
        },
        {
            logo: "/clothimage/logo4.jpg"
        },
        {
            logo: "/clothimage/logo5.jpg"
        },
        {
            logo: "/clothimage/logo6.jpg"
        },
        {
            logo: "/clothimage/logo7.jpg"
        },
        {
            logo: "/clothimage/logo8.jpg"
        },
        {
            logo: "/clothimage/logo10.jpg"
        }
    ]

    
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className="relative w-full overflow-hidden py-8">
            <div 
                ref={containerRef}
                className="flex gap-8 md:gap-12 whitespace-nowrap"
            >
                {duplicatedLogos.map((l, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 relative"
                    >
                        <Image 
                            src={l.logo} 
                            alt={`Logo ${index + 1}`}
                            fill
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Logos