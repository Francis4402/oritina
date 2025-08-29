import React from 'react'
import ShopPage from './ShopPage'
import { Metadata } from 'next'
import { getProducts } from '@/services/Product'

export const metadata: Metadata = {
  title: 'SHOP',
  description: 'Shop Page'
}

const Shop = async () => {

  const products = await getProducts();

  return (
    <div>
      <ShopPage products={products} />
    </div>
  )
}

export default Shop