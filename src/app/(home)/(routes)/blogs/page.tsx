import React from 'react'
import BlogPage from './BlogPage'
import { Metadata } from 'next'
import { getBlogs } from '@/services/Blog'

export const metadata: Metadata = {
  title: 'BLOG',
  description: 'Blog Page'
}

const Blogs = async () => {

  const blogs = await getBlogs();

  return (
    <div>
      <BlogPage blogs={blogs} />
    </div>
  )
}

export default Blogs