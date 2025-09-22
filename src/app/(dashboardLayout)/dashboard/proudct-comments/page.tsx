import { getAllProductComments } from '@/services/ProductComments'
import React from 'react'
import CommentTable from '../components/CommentTable';

const ProductComments = async () => {

    const comments = await getAllProductComments();

  return (
    <div>
        <CommentTable comment={comments} />
    </div>
  )
}

export default ProductComments