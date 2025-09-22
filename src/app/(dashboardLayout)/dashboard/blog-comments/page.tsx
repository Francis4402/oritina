import { getAllBlogComments } from '@/services/BlogComment';
import React from 'react'
import CommentTable from '../components/CommentTable';


const BlogComments = async () => {

    const comments = await getAllBlogComments();

  return (
    <div>
        <CommentTable comment={comments} />
    </div>
  )
}

export default BlogComments