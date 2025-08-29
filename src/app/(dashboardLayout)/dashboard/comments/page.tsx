import { getComments } from '@/services/Comment'
import React from 'react'
import CommentTable from './CommentTable';

const Comments = async () => {

  const comments = await getComments();

  return (
    <div>
      <CommentTable comment={comments} />
    </div>
  )
}

export default Comments