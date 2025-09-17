import React from 'react'
import CommentTable from './CommentTable';
import { getAllComments } from '@/services/Comment';



const Comments = async () => {

  const comments = await getAllComments();

  return (
    <div>
      <CommentTable comment={comments} />
    </div>
  )
}

export default Comments