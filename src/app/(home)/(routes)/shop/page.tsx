import React from 'react'
import ShopPage from './ShopPage'
import { Metadata } from 'next'
import { getProducts } from '@/services/Product'
import { product } from '@/app/types/Types'

export const metadata: Metadata = {
  title: 'SHOP',
  description: 'Shop Page'
}

interface ProductResponse {
  data: product[];
  pagination: {
    page: number;
    Size: number;
    total: string;
    totalPages: number;
  };
}

const Shop = async (props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {

  const params = await props.searchParams;

  const response: ProductResponse = await getProducts(
    params.page?.toString() || '1',
    params.Size?.toString() || '10',
    {
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      producttype: params.producttype,
      sort: params.sort,
      totalRating: params.totalRating
    },
  );

  return (
    <div>
      <ShopPage products={response.data} 
          pagination={response.pagination} />
    </div>
  )
}

export default Shop