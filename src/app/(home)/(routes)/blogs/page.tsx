import React from 'react'
import BlogPage from './BlogPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BLOG',
  description: 'Blog Page'
}

const Blogs = () => {
  return (
    <div>
      <BlogPage />
    </div>
  )
}

export default Blogs