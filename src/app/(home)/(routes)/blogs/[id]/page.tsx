import { getBlogsbyId } from '@/services/Blog'
import { Calendar, Clock, MessageSquare, Heart, ArrowLeft, Share2, User, Bookmark, Eye, Star, Send, TrendingUp, Edit } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import CommentBlogPage from '@/components/CommentBlogPage'
import { getblogComments } from '@/services/BlogComment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/authOptions'
import { DetailLikeBtton } from '@/components/DetailLikeButton'


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogsbyId(id);
  const blogData = blog.data[0];

  return {
    title: blogData.title,
    description: blogData.description,
  }
}

const BlogsDetails = async ({ params } : { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogsbyId(id)
  const blogData = blog.data[0]

  const commentList = await getblogComments(id);
  
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        
        
        <div className="relative max-w-7xl mx-auto px-4 py-8 lg:py-16">
          {/* Back Button - Enhanced */}
          <div className="mb-8">
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="gap-2 hover:gap-3 transition-all duration-200 hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
            >
              <Link href="/blogs">
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          {/* Article Header - Enhanced */}
          <header className="space-y-6 text-center max-w-4xl mx-auto">
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 dark:border-blue-800/50 hover:scale-105 transition-transform"
              >
                {blogData.category}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent leading-tight">
              {blogData.title}
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {blogData.description}
            </p>

            {/* Enhanced Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-4">
              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <User className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Oritina Style Team</span>
              </div>

              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <Calendar className="h-4 w-4 text-green-500" />
                <span>{formatDate(blogData.createdAt)}</span>
              </div>

              {blogData.readTime && (
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>{blogData.readTime} min read</span>
                </div>
              )}

              {blogData.likes !== undefined && (
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{blogData.likes} likes</span>
                </div>
              )}

              {blogData.comments !== undefined && (
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                  <span>{blogData.comments} comments</span>
                </div>
              )}
            </div>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Featured Image - Enhanced */}
        {blogData.blogImage && (
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 mb-12 -mt-8 relative z-10">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full group">
                <Image
                  src={blogData.blogImage}
                  alt={blogData.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Article Content - Enhanced */}
        <div className="grid lg:grid-cols-12 xl:grid-cols-12 gap-8 xl:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8 xl:col-span-9">
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
              <CardContent className="p-8 lg:p-12 xl:p-16">
                <div className="prose prose-lg xl:prose-xl dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:not-italic">
                  <p className="text-xl leading-relaxed font-medium text-slate-700 dark:text-slate-300 border-l-4 border-blue-500 pl-6 mb-8 bg-blue-50/50 dark:bg-blue-950/20 py-4 rounded-r-lg">
                    At Oritina Cloth Store, we believe that fashion is more than just clothing—it's a form of
                    self-expression. In this article, we explore how to build a versatile wardrobe that reflects
                    your personal style while staying true to current trends.
                  </p>

                  <h2 className="text-2xl font-bold mt-12 mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Curating Your Signature Style
                  </h2>
                  <p className="mb-6">
                    Your wardrobe should tell your story without saying a word. Start with foundational pieces
                    that speak to your personality. For the minimalist, this might mean clean lines and neutral
                    tones. For the bold fashion enthusiast, vibrant patterns and statement pieces make the
                    perfect foundation.
                  </p>

                  <h2 className="text-2xl font-bold mt-12 mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Seasonal Trends Worth Embracing
                  </h2>
                  <p className="mb-6">
                    This season, we're seeing a return to elegance with sophisticated silhouettes and rich
                    textures. Earth tones continue to dominate, with burnt orange, olive green, and deep burgundy
                    making strong statements. Don't be afraid to layer these colors for a visually interesting
                    ensemble.
                  </p>

                  <blockquote className="my-8 p-6 rounded-lg">
                    <p className="text-lg font-medium italic mb-2">
                      "Fashion is the armor to survive the reality of everyday life."
                    </p>
                    <footer className="text-sm text-slate-500 dark:text-slate-400">— Bill Cunningham</footer>
                  </blockquote>

                  <h2 className="text-2xl font-bold mt-12 mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Sustainable Fashion Choices
                  </h2>
                  <p className="mb-6">
                    As conscious consumers, we're increasingly mindful of our fashion footprint. At Oritina,
                    we're committed to offering sustainable options that don't compromise on style.
                  </p>

                  <h2 className="text-2xl font-bold mt-12 mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Final Thoughts
                  </h2>
                  <p className="mb-6">
                    Fashion rules are meant to be broken. Wear what makes you feel confident and authentic—that's
                    the true essence of style.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tags - Enhanced */}
            <Card className="mt-8 shadow-lg border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {['Fashion Tips', 'Wardrobe Essentials', 'Seasonal Trends', 'Sustainable Fashion', 'Style Guide'].map(
                    (tag, index) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className={`text-xs px-4 py-2 hover:scale-105 transition-transform cursor-pointer bg-gradient-to-r ${
                          index % 5 === 0 ? 'from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800' :
                          index % 5 === 1 ? 'from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800' :
                          index % 5 === 2 ? 'from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800' :
                          index % 5 === 3 ? 'from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-orange-200 dark:border-orange-800' :
                          'from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50 border-pink-200 dark:border-pink-800'
                        }`}
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons - Enhanced */}
            <Card className="mt-8 shadow-lg border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <DetailLikeBtton blogId={id} />
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Author Card - Enhanced */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm sticky top-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-gradient-to-br from-blue-500 to-purple-500">
                    <AvatarImage src="/author.png" alt="Author" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-100">
                    Oritina Style Team
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3 font-medium">
                    Fashion Experts & Content Creators
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Our team of fashion enthusiasts is dedicated to bringing you the latest style insights,
                    trend reports, and wardrobe advice to help you look and feel your best.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reading Progress */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Topics
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h5 className="font-medium text-sm mb-1 text-blue-900 dark:text-blue-100">Winter Fashion 2025</h5>
                    <p className="text-xs text-blue-600 dark:text-blue-400">125 articles</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h5 className="font-medium text-sm mb-1 text-purple-900 dark:text-purple-100">Sustainable Style</h5>
                    <p className="text-xs text-purple-600 dark:text-purple-400">89 articles</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h5 className="font-medium text-sm mb-1 text-green-900 dark:text-green-100">Wardrobe Essentials</h5>
                    <p className="text-xs text-green-600 dark:text-green-400">67 articles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Comments and Rating Section */}
        <CommentBlogPage commentList={commentList} blogId={id} />
      </div>
    </div>
  )
}

export default BlogsDetails