"use client"


import { product } from '@/app/types/Types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';

const ProductShow = ({cloths}: {cloths: product[]}) => {

  const [activeTab, setActiveTab] = useState("newarrivals");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(
    () => cloths.filter((c) => c.producttype === activeTab),
    [cloths, activeTab]
  );

  const visibleProducts = filtered.slice(0, visibleCount);
  
  const projectGrid = () => {
    if (visibleProducts.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((c: product, index: number) => (
            <Link href={`/product/${c.id}`} key={index}>
            <div
              className="flex flex-col relative gap-3 items-center justify-center group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
            >
              <div className="relative overflow-hidden rounded-lg w-full aspect-square">
                <Image
                  src={c.productImage[0]}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Action buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-4">
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    <button className="p-2 md:p-3 bg-white rounded-full text-gray-500 shadow-md hover:bg-black hover:text-white transition-colors duration-200">
                      <FaShoppingBag size={16} className="md:w-5" />
                    </button>
                  </div>
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    <button onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }} className="p-2 md:p-3 bg-white rounded-full text-gray-500 shadow-md hover:bg-black hover:text-white transition-colors duration-200">
                      <FaHeart size={16} className="md:w-5" />
                    </button>
                  </div>
                </div>
              </div>

              
                <div className="w-full text-center p-2">
                  <p className="text-xs md:text-sm font-semibold line-clamp-2">
                    {c.name}
                  </p>
                  <p className="text-xs md:text-sm font-bold text-orange-600 mt-1">
                    ${c.price}
                  </p>
                </div>
              
              </div>
            </Link>
          ))}
        </div>
        
      );
    }
    return <p className="text-center text-gray-500">No products available</p>;
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 poppins items-center justify-center py-8 md:py-12 lg:py-16 px-4">
      <h1 className="uppercase scroll-m-20 text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
        Our Products
      </h1>
      <p className="text-xs md:text-sm text-gray-500 text-center">
        HAND-PICKED FROM THE BEST DESIGNER
      </p>

      <Tabs
        defaultValue="newarrivals"
        className="w-full max-w-6xl"
        onValueChange={(value) => {
          setActiveTab(value);
          setVisibleCount(6);
        }}
      >
        <div className="flex justify-center mb-6 md:mb-8">
          <TabsList className="p-1 rounded-md flex flex-wrap justify-center">
            <TabsTrigger value="newarrivals">New Arrivals</TabsTrigger>
            <TabsTrigger value="bestsellers">Best Seller</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="newarrivals">{projectGrid()}</TabsContent>
        <TabsContent value="bestsellers">{projectGrid()}</TabsContent>
        <TabsContent value="featured">{projectGrid()}</TabsContent>
      </Tabs>

      {visibleCount < filtered.length && (
        <Button
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className="mt-6 md:mt-8 bg-black hover:bg-gray-800 px-6 py-4 md:px-8 md:py-6 text-sm md:text-base"
        >
          LOAD MORE PRODUCTS
        </Button>
      )}
    </div>
  );
};

export default ProductShow;
