import React from 'react'
import CommentTable from './CommentTable';
import { getAllBlogComments } from '@/services/BlogComment';



const Comments = async () => {

  const comments = await getAllBlogComments();

  return (
    <div>
      <CommentTable comment={comments} />
    </div>
  )
}

export default Comments