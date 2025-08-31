"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Star, Filter, Grid3X3, List } from 'lucide-react'
import Image from 'next/image'
import { product } from '@/app/types/Types'
import Link from 'next/link'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { IMeta } from '@/app/types/meta'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useCartStore } from '@/lib/store'

const ShopPage = ({ products, pagination }: { products: product[], pagination: IMeta }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { addToCart } = useCartStore();

  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 200
  ])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("producttype") || 'all')
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || 'id')

  const [viewMode, setViewMode] = useState(searchParams.get("view") || 'grid')
  const [minRating, setMinRating] = useState(Number(searchParams.get("totalRating")) || 0)
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)

  
  const getSortParams = (option: string) => {
    const sortMappings: Record<string, { sort: string; order: string }> = {
      'featured': { sort: 'id', order: 'asc' },
      'newarrivals': { sort: 'createdAt', order: 'desc' },
      'price-low': { sort: 'price', order: 'asc' },
      'price-high': { sort: 'price', order: 'desc' },
      'rating-high': { sort: 'totalRating', order: 'desc' },
      'rating-low': { sort: 'totalRating', order: 'asc' }
    }
    return sortMappings[option] || { sort: 'id', order: 'asc' }
  }

  useEffect(() => {
    const params = new URLSearchParams()
    const { sort, order } = getSortParams(sortOption)

    if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]))
    if (priceRange[1] < 200) params.set("maxPrice", String(priceRange[1]))
    if (selectedCategory !== "all") params.set("producttype", selectedCategory)
    if (sort !== "id") params.set("sort", sort)
    if (order !== "asc") params.set("order", order)
    if (viewMode !== "grid") params.set("view", viewMode)
    if (minRating > 0) params.set("totalRating", String(minRating))
    if (page > 1) params.set("page", String(page))

    router.replace(`?${params.toString()}`)
  }, [priceRange, selectedCategory, sortOption, viewMode, minRating, page, router])

  const handleSortChange = (value: string) => {
    setSortOption(value)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  
  const renderPagination = () => {
    const currentPage = pagination.page
    const totalPages = pagination.totalPages
    const pages = []

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

    if (totalPages > 0) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            className={`cursor-pointer ${currentPage === 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Show ellipsis if there's a gap
    if (currentPage > (isMobile ? 2 : 3)) {
      pages.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - (isMobile ? 0 : 1))
    const end = Math.min(totalPages - 1, currentPage + (isMobile ? 0 : 1))

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages && i >= 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={`cursor-pointer ${currentPage === i ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }

    // Show ellipsis if there's a gap
    if (currentPage < totalPages - (isMobile ? 1 : 2)) {
      pages.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={`cursor-pointer ${currentPage === totalPages ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return (
      <Pagination className="w-full">
        <PaginationContent className="flex items-center justify-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-muted"}`}
            />
          </PaginationItem>
          
          {pages}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={`cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-muted"}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  const renderRating = (rating: string = "0") => {
    const numericRating = parseFloat(rating)
    return Array.from({ length: 5 }, (_, i) =>
      i + 1 <= numericRating ? (
        <FaStar key={i} className="text-yellow-400 inline" size={16} />
      ) : (
        <FaRegStar key={i} className="text-gray-300 inline" size={16} />
      )
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
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={() => {
                setPriceRange([0, 200])
                setSelectedCategory('all')
                setSortOption('featured')
                setMinRating(0)
                setPage(1)
                setViewMode("grid")
              }}
            >
              Clear All
            </Button>
          </div>

          {/* Price Range */}
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

          {/* Product Type */}
          <div className="space-y-3">
            <h3 className="font-medium">Product Type</h3>
            <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer">All Products</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newarrivals" id="newarrivals" />
                <Label htmlFor="newarrivals" className="cursor-pointer">NewArrivals</Label>
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

          {/* Rating */}
          <div className="space-y-3">
            <h3 className="font-medium">Customer Rating</h3>
            <RadioGroup value={String(minRating)} onValueChange={(value) => setMinRating(Number(value))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="rating-all" />
                <Label htmlFor="rating-all" className="cursor-pointer">All Ratings</Label>
              </div>
              {[5, 4, 3, 2, 1].map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(r)} id={`rating-${r}`} />
                  <Label htmlFor={`rating-${r}`} className="cursor-pointer flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{r}+ Stars</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">T-Shirts Collection</h1>
              <p className="text-gray-600">
                Showing {((pagination.page - 1) * pagination.Size) + 1} to{' '}
                {Math.min(pagination.page * pagination.Size, parseInt(pagination.total))} of{' '}
                {pagination.total} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newarrivals">Newest First</SelectItem>
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

          {/* Products */}
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'
            : 'space-y-6 mb-8'}>
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent>
                  <Link href={`/product/${product.id}`}>
                    <div className={`relative ${viewMode === 'list' ? 'flex' : ''}`}>
                      <div className={`bg-blue-100`}>
                        <Image src={product.productImage[0]} alt="T-shirt" width={500} height={500} />

                        {/* Badges */}
                        <div className="absolute top-2 left-2">
                          {product.producttype === 'newarrivals' && (
                            <Badge className="bg-green-500 hover:bg-green-600 mr-2">New</Badge>
                          )}
                          {product.producttype === 'featured' && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                          {product.producttype === 'bestsellers' && (
                            <Badge variant="destructive">Best Sellers</Badge>
                          )}
                        </div>
                      </div>

                      <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        {renderRating(product.totalRating)}
                        <p className="text-gray-600 text-sm items-center mt-1">{product.reviews} reviews</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-lg">${product.price}</span>
                          <Button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            addToCart({
                              id: product.id || '',
                              name: product.name,
                              price: product.price,
                              productImage: product.productImage,
                              quantity: 1,
                            })
                          }} size="sm">Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8 w-full">
              <div className="bg-white border rounded-lg p-2 shadow-sm">
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopPage