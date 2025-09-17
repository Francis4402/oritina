"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { CalendarDays, Search, MessageCircle, Share, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { blog } from "@/app/types/Types"
import { format, parseISO } from 'date-fns'
import { LikeButton } from "@/components/LikeButton"
import CommentButton from "@/components/CommentButton"


const BlogPage = ({ blogs }: {blogs: blog[]}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'trends', name: 'Trends' },
    { id: 'sustainability', name: 'Sustainability' },
  ]


  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Recent"
    
    try {
      return format(parseISO(dateString), 'MMMM dd, yyyy')
    } catch (error) {
      console.error('Error formatting date:', error)
      return "Recent"
    }
  }

  
  const featuredPost = blogs.length > 0 ? blogs[0] : null

  const filteredPosts = blogs.filter(post => {
    
    if (post.id === featuredPost?.id) return false
    
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Style Journal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the latest fashion trends, styling tips, and industry insights from our experts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            type="text" 
            placeholder="Search articles..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full px-4 py-2 text-sm md:px-6 md:text-base"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </header>

      {/* Featured Post - Only show if there are posts */}
      {featuredPost && (
        <section className="container mx-auto px-4 mb-16">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative h-80 md:h-auto">
                <Image
                  src={featuredPost.blogImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <Badge variant="secondary" className="mb-4 w-fit capitalize">{featuredPost.category}</Badge>
                <CardTitle className="text-2xl md:text-3xl mb-4">{featuredPost.title}</CardTitle>
                <CardDescription className="text-base md:text-lg mb-6 line-clamp-3">
                  {featuredPost.description}
                </CardDescription>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{formatDate(featuredPost.createdAt)}</span>
                  </div>
                  {featuredPost.readTime && (
                    <span className="text-sm text-muted-foreground">
                      {featuredPost.readTime} min read
                    </span>
                  )}
                </div>
                
                <Button className="w-fit">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden h-full flex flex-col transition-all hover:shadow-xl">
                <div className="relative h-48">
                  <Image
                    src={post.blogImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3 capitalize">
                    {post.category}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    {post.readTime && (
                      <span>{post.readTime} min read</span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-3">
                  <div className="flex items-center gap-2">
                      <LikeButton 
                        blogId={post.id!} 
                      />
                    <CommentButton blogId={post.id!} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No articles found. Try a different search or category.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default BlogPage