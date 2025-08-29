import { getBlogs } from '@/services/Blog'
import React from 'react'
import BlogTable from './BlogTable';
import AddBlogForm from '../../addforms/AddBlogForm';

const Blogs = async () => {

  const blogs = await getBlogs();

  
  return (
    <div>
      <div className='flex items-end justify-end px-5'>
        <AddBlogForm />
      </div>
      <BlogTable blog={blogs} />
    </div>
  )
}

export default Blogs