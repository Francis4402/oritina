import { getAllProductComments } from '@/services/ProductComments'
import React from 'react'
import CommentTable from '../components/CommentTable';
import ProductCommentTable from '../components/ProductCommentTable';

const ProductComments = async () => {

    const comments = await getAllProductComments();

  return (
    <div>
        <ProductCommentTable comment={comments} />
    </div>
  )
}

export default ProductComments