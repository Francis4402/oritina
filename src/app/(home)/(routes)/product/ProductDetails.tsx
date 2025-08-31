'use client';


import { product } from '@/app/types/Types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaHeart, FaShare, FaShoppingBag, FaStar, FaRegStar, FaChevronRight } from 'react-icons/fa';

export const ProductDetails = ({ productData, relatedProducts }: { productData: product, relatedProducts: product[] }) => {
    const [selectedImage, setSelectedImage] = useState(productData.productImage[0]);
    
    const { addToCart } = useCartStore();
    
    const renderRating = (rating: string = "0") => {
        const numericRating = parseFloat(rating);
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= numericRating ? 
                <FaStar key={i} className="text-yellow-400 inline" size={16} /> : 
                <FaRegStar key={i} className="text-gray-300 inline" size={16} />
            );
        }
        return stars;
    };

    // Sample reviews data
    const reviews = [
        {
            id: 1,
            user: "John Doe",
            rating: "4",
            comment: "Great product! The quality exceeded my expectations.",
            date: "2023-10-15"
        },
        {
            id: 2,
            user: "Jane Smith",
            rating: "5",
            comment: "Absolutely love it! Would definitely buy again.",
            date: "2023-09-28"
        }
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
                                {renderRating(productData.totalRating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                ({productData.reviews || 0} reviews)
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
                                        className="w-8 h-8 rounded-full border cursor-pointer"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
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
                                    defaultValue="1" 
                                    min="1"
                                    className="w-20" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button onClick={() => (
                                addToCart({
                                    id: productData.id || '',
                                    name: productData.name,
                                    price: productData.price,
                                    productImage: productData.productImage,
                                    quantity: 1,
                                })
                            )} className="flex-1 py-6 text-lg gap-2">
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

                    {/* Product Details */}
                    <div className="pt-4 border-t">
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
                            Reviews {productData.reviews && `(${productData.reviews})`}
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
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold">Customer Reviews</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex">
                                                {renderRating(productData.totalRating)}
                                            </div>
                                            <span className="text-muted-foreground">
                                                Based on {productData.reviews || 0} reviews
                                            </span>
                                        </div>
                                    </div>
                                    <Button className="mt-4 md:mt-0">Write a Review</Button>
                                </div>
                                
                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold">{review.user}</h4>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex mb-3">
                                                {renderRating(review.rating)}
                                            </div>
                                            <p className="text-muted-foreground">{review.comment}</p>
                                        </div>
                                    ))}
                                    
                                    {reviews.length === 0 && (
                                        <div className="text-center py-8">
                                            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                                            <Button className="mt-4">Write a Review</Button>
                                        </div>
                                    )}
                                </div>
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
                                                {renderRating(product.totalRating)}
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
}