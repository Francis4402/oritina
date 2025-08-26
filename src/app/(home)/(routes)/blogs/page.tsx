"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { CalendarDays, Clock, Search, User, Heart, MessageCircle, Share, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'trends', name: 'Trends' },
    { id: 'sustainability', name: 'Sustainability' },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Sustainable Fashion",
      excerpt: "How eco-friendly materials are transforming the fashion industry and what it means for consumers.",
      category: "sustainability",
      author: "Emma Johnson",
      date: "May 15, 2023",
      readTime: "6 min read",
      image: "/clothimage/blog5.webp",
      avatar: "https://github.com/shadcn.png",
      likes: 42,
      comments: 8
    },
    {
      id: 2,
      title: "Summer 2023 Trends: What to Wear",
      excerpt: "Discover the must-have pieces and styling tips for the hottest season of the year.",
      category: "trends",
      author: "Alex Martinez",
      date: "April 28, 2023",
      readTime: "4 min read",
      image: "/clothimage/blog2.webp",
      avatar: "https://github.com/shadcn.png",
      likes: 37,
      comments: 12
    },
    {
      id: 3,
      title: "Minimalist Wardrobe: Less is More",
      excerpt: "How to build a capsule wardrobe that works for every occasion and simplifies your life.",
      category: "lifestyle",
      author: "Sarah Chen",
      date: "April 15, 2023",
      readTime: "8 min read",
      image: "/clothimage/blog3.webp",
      avatar: "https://github.com/shadcn.png",
      likes: 29,
      comments: 5
    },
    {
      id: 4,
      title: "The Art of Layering for Fall",
      excerpt: "Master the technique of layering to create stylish and functional outfits for cooler weather.",
      category: "fashion",
      author: "Michael Brooks",
      date: "March 30, 2023",
      readTime: "5 min read",
      image: "/clothimage/blog4.webp",
      avatar: "https://github.com/shadcn.png",
      likes: 51,
      comments: 15
    },
  ]

  const featuredPost = blogPosts[0]

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
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
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full px-6"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </header>

      {/* Featured Post */}
      <section className="container mx-auto px-4 mb-16">
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative h-80 md:h-auto">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8">
              <Badge variant="secondary" className="mb-4 w-fit">{featuredPost.category}</Badge>
              <CardTitle className="text-3xl mb-4">{featuredPost.title}</CardTitle>
              <CardDescription className="text-lg mb-6">{featuredPost.excerpt}</CardDescription>
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src={featuredPost.avatar} />
                  <AvatarFallback>{featuredPost.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{featuredPost.author}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-fit">
                Read Article <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <Badge variant="secondary" className="absolute top-4 left-4">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mb-16">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 text-center py-12">
          <CardHeader>
            <CardTitle className="text-3xl">Stay Updated</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Subscribe to our newsletter for the latest articles and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-background text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  )
}

export default Blogs