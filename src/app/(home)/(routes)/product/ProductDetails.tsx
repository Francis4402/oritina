'use client';

import { product, productCommentType, Rating, RatingResponse } from '@/app/types/Types';
import CommentRatingUtils from '@/components/CommentRatingUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/lib/store';
import { fetchRatings } from '@/services/Rating';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaHeart, FaShare, FaShoppingBag, FaStar, FaRegStar, FaChevronRight } from 'react-icons/fa';
import { toast } from 'sonner';


export const ProductDetails = ({ productData, relatedProducts, commentList, id }: { productData: product, relatedProducts: product[], commentList: productCommentType[], id: string }) => {
    const [selectedImage, setSelectedImage] = useState(productData.productImage[0]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [ratingData, setRatingData] = useState<RatingResponse>({
        ratings: [],
        averageRating: 0,
        totalRatings: 0,
        ratingDistribution: [0,0,0,0,0]
    });
    
    const { addToCart } = useCartStore();
    
    useEffect(() => {
        fetchRatings(id).then((data) => (
            setRatingData(data)
        ))
    }, [id]);


    const renderRating = (rating: number = 0) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? 
                <FaStar key={i} className="text-yellow-400 inline" size={16} /> : 
                <FaRegStar key={i} className="text-gray-300 inline" size={16} />
            );
        }
        return stars;
    };

    const handleAddToCart = () => {
        if (productData.size && productData.size.length > 0 && !selectedSize) {
            toast.error("Please select a size first");
            return;
        }
        
        if (productData.color && productData.color.length > 0 && !selectedColor) {
            toast.error("Please select a color first");
            return;
        }
        
        addToCart({
            id: productData.id || '',
            name: productData.name,
            price: productData.price,
            productImage: productData.productImage,
            category: productData.category,
            quantity: quantity,
            description: productData.description,
            selectedColor: selectedColor || undefined,
            selectedSize: selectedSize || undefined,
            availableColors: productData.color,
            availableSizes: productData.size
        });

        toast.success("Product added to cart!");
    };

    // Size chart data
    const sizeChart = [
        { size: 'XS', chest: 36, length: 26, sleeve: 7.5 },
        { size: 'S', chest: 37, length: 26, sleeve: 7.75 },
        { size: 'M', chest: 39, length: 27.5, sleeve: 8.5 },
        { size: 'L', chest: 40.5, length: 28, sleeve: 8.75 },
        { size: 'XL', chest: 43, length: 29, sleeve: 9 },
        { size: '2XL', chest: 45, length: 30, sleeve: 9.25 },
    ];

    return (
        <div className="container mx-auto px-4 py-8 poppins max-w-6xl">
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Images Section */}
                <div className="space-y-4">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative aspect-square w-full">
                                <Image 
                                    src={selectedImage} 
                                    alt={productData.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* Thumbnail Gallery */}
                    {productData.productImage.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto py-2">
                            {productData.productImage.map((img, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 cursor-pointer"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <Card className={`p-1 w-20 h-20 transition-all ${selectedImage === img ? 'border-2 border-primary' : 'hover:border-primary'}`}>
                                        <div className="relative w-full h-full">
                                            <Image 
                                                src={img} 
                                                alt={`${productData.name} view ${index + 1}`}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{productData.name}</h1>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex">
                                {renderRating(ratingData.averageRating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                ({ratingData.totalRatings} ratings)
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="text-3xl font-bold text-primary">
                        ${productData.price.toFixed(2)}
                    </div>

                    {/* Color Options */}
                    {productData.color && productData.color.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Color</h3>
                            <div className="flex gap-2">
                                {productData.color.map((color, index) => (
                                    <div 
                                        key={index}
                                        className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                        style={{ backgroundColor: color }}
                                        title={color}
                                        onClick={() => setSelectedColor(color)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Size Options */}
                    {productData.size && productData.size.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Size</h3>
                            <div className='flex gap-2 flex-wrap'>
                                {productData.size.map((s, index) => (
                                    <Button 
                                        key={index} 
                                        variant={selectedSize === s ? "default" : "outline"}
                                        onClick={() => setSelectedSize(s)}
                                    >
                                        {s}
                                    </Button>
                                ))}
                            </div>
                            
                            {/* Size Chart */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-3">Size Chart (in inches)</h3>
                                <div className="grid grid-cols-5 gap-2 p-4 border rounded-md bg-muted/30">
                                    {/* Header row */}
                                    <div className="font-semibold text-center">Size</div>
                                    <div className="font-semibold text-center">Chest (Round)</div>
                                    <div className="font-semibold text-center">Length</div>
                                    <div className="font-semibold text-center">Sleeve</div>
                                    <div className="font-semibold text-center">Select</div>
                                    
                                    {/* Size rows */}
                                    {sizeChart.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <div className="text-center font-medium">{item.size}</div>
                                            <div className="text-center">{item.chest}</div>
                                            <div className="text-center">{item.length}</div>
                                            <div className="text-center">{item.sleeve}</div>
                                            <div className="text-center">
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant={selectedSize === item.size ? "default" : "outline"}
                                                    onClick={() => setSelectedSize(item.size)}
                                                    disabled={!productData.size.includes(item.size)}
                                                >
                                                    {selectedSize === item.size ? "Selected" : "Select"}
                                                </Button>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Add to Cart Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Quantity:</span>
                                <Input 
                                    type="number" 
                                    value={quantity}
                                    min="1"
                                    className="w-20" 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button 
                                onClick={handleAddToCart}
                                className="flex-1 py-6 text-lg gap-2"
                            >
                                <FaShoppingBag />
                                Add to Cart
                            </Button>
                            
                            <Button variant="outline" size="icon" className="h-12 w-12">
                                <FaHeart className="text-lg" />
                            </Button>
                            
                            <Button variant="outline" size="icon" className="h-12 w-12">
                                <FaShare className="text-lg" />
                            </Button>
                        </div>
                    </div>
                        
                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-2">Detailed Specification</h3>
                        <div className="grid gap-2 text-sm">
                            {productData.spcefication.map((d, index) => (
                                <li key={index}>
                                    {d}
                                </li>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <h3 className="font-semibold mb-2">Product Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Category:</div>
                            <div className="font-medium">{productData.category}</div>
                            
                            <div className="text-muted-foreground">Type:</div>
                            <div className="font-medium">{productData.producttype}</div>
                            
                            {productData.createdAt && (
                                <>
                                    <div className="text-muted-foreground">Added:</div>
                                    <div>{new Date(productData.createdAt).toLocaleDateString()}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Description and Reviews Tabs */}
            <div className="mt-12">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="description" className="text-lg font-medium py-3">Description</TabsTrigger>
                        <TabsTrigger value="reviews" className="text-lg font-medium py-3">
                            Reviews ({ratingData.totalRatings})
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description">
                        <Card>
                            <CardContent className="p-6">
                                <div className="prose max-w-none">
                                    <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {productData.description}
                                    </p>
                                    
                                    <h4 className="text-lg font-semibold mt-6 mb-3">Features</h4>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>High-quality materials for durability and comfort</li>
                                        <li>Designed for everyday use and special occasions</li>
                                        <li>Available in multiple colors to match your style</li>
                                        <li>Easy to clean and maintain</li>
                                    </ul>
                                    
                                    <h4 className="text-lg font-semibold mt-6 mb-3">Specifications</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Material</span>
                                            <span className="font-medium">Premium Quality</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Dimensions</span>
                                            <span className="font-medium">10" x 8" x 3"</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Weight</span>
                                            <span className="font-medium">1.2 lbs</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Warranty</span>
                                            <span className="font-medium">1 Year</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="reviews">
                        <Card>
                            <CardContent className="p-6">
                                <CommentRatingUtils 
                                    commentList={commentList} 
                                    productId={id} 
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Related Products</h2>
                        <Link 
                            href={`/category/${productData.category}`}
                            className="text-primary hover:underline flex items-center gap-1"
                        >
                            View all <FaChevronRight size={14} />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product: product) => (
                            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                                <Link href={`/product/${product.id}`}>
                                    <div className="relative aspect-square">
                                        <Image 
                                            src={product.productImage[0]} 
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold truncate">{product.name}</h3>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                                            <div className="flex">
                                                
                                            </div>
                                        </div>
                                        <Button className="w-full mt-4" size="sm">
                                            <FaShoppingBag className="mr-2" /> Add to Cart
                                        </Button>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};