"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Star, Filter, Grid3X3, List } from 'lucide-react'
import Image from 'next/image'

const ProductListingPage = () => {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOption, setSortOption] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [minRating, setMinRating] = useState(0)

  const products = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      rating: 4.5,
      reviewCount: 128,
      image: "/clothimage/imgitems1.png",
      isNew: true,
      isFeatured: false
    },
    {
      id: 2,
      name: "Premium Polo Shirt",
      price: 49.99,
      rating: 4.8,
      reviewCount: 92,
      image: "/clothimage/imgitems2.png",
      isNew: false,
      isFeatured: true
    },
    {
      id: 3,
      name: "Graphic Print Tee",
      price: 35.99,
      rating: 4.2,
      reviewCount: 64,
      image: "/clothimage/imgitems3.png",
      isNew: true,
      isFeatured: false
    },
    {
      id: 4,
      name: "V-Neck Casual T-Shirt",
      price: 27.99,
      rating: 4.0,
      reviewCount: 43,
      image: "/clothimage/imgitems4.png",
      isNew: false,
      isFeatured: false
    },
    {
      id: 5,
      name: "Long Sleeve Comfort Fit",
      price: 39.99,
      rating: 4.7,
      reviewCount: 87,
      image: "/clothimage/imgitems5.png",
      isNew: false,
      isFeatured: true
    },
    {
      id: 6,
      name: "Oversized Streetwear Tee",
      price: 45.99,
      rating: 4.3,
      reviewCount: 56,
      image: "/clothimage/imgitems6.png",
      isNew: true,
      isFeatured: false
    },
    {
      id: 7,
      name: "Performance Athletic Shirt",
      price: 59.99,
      rating: 4.9,
      reviewCount: 121,
      image: "/clothimage/imgitems7.png",
      isNew: false,
      isFeatured: true
    },
    {
      id: 8,
      name: "Basic Crew Neck Pack",
      price: 79.99,
      rating: 4.1,
      reviewCount: 78,
      image: "/clothimage/imgitems8.png",
      isNew: false,
      isFeatured: false
    }
  ]

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <Filter className="mr-2 h-5 w-5" /> Filters
            </h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Clear All
            </Button>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-4">
            <h3 className="font-medium">Price Range</h3>
            <Slider
              defaultValue={[0, 200]}
              max={200}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Product Type Filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Product Type</h3>
            <RadioGroup defaultValue="all" onValueChange={setSelectedCategory}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer">All Products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new" className="cursor-pointer">New Arrivals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="featured" id="featured" />
                <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bestsellers" id="bestsellers" />
                <Label htmlFor="bestsellers" className="cursor-pointer">Bestsellers</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Customer Rating</h3>
            <RadioGroup defaultValue="0" onValueChange={(value) => setMinRating(Number(value))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="rating-all" />
                <Label htmlFor="rating-all" className="cursor-pointer">All Ratings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="rating-4" />
                <Label htmlFor="rating-4" className="cursor-pointer flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>4+ Stars</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="rating-3" />
                <Label htmlFor="rating-3" className="cursor-pointer flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>3+ Stars</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Header with sorting and view options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">T-Shirts Collection</h1>
              <p className="text-gray-600">Showing {products.length} products</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating-high">Rating: High to Low</SelectItem>
                  <SelectItem value="rating-low">Rating: Low to High</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-10 w-10"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-10 w-10"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'
          }>
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className={`relative ${viewMode === 'list' ? 'flex' : ''}`}>
                    {/* Product Image */}
                    <div className={`bg-blue-100`}>
                      {/* Placeholder for image */}
                      <Image src={product.image} alt="T-shirt" width={500} height={500} />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2">
                        {product.isNew && (
                          <Badge className="bg-green-500 hover:bg-green-600 mr-2">New</Badge>
                        )}
                        {product.isFeatured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      {renderStars(product.rating)}
                      <p className="text-gray-600 text-sm mt-1">{product.reviewCount} reviews</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-lg">${product.price}</span>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListingPage