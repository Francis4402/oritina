import React from 'react'
import CommentTable from './CommentTable';
import { getComments } from '@/services/Comment';
import { getBlogs } from '@/services/Blog';


const Comments = async () => {
  const blogs = await getBlogs();

  const blogId = blogs.id;

  const comments = await getComments(blogId);

  return (
    <div>
      
    </div>
  )
}

export default Comments