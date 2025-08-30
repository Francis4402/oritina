import { getProducts } from '@/services/Product';
import ProductShow from './ProductShow';


const ProductPage = async () => {

    const {data: cloths} = await getProducts();

  return (
    <ProductShow cloths={cloths} />
  )
}

export default ProductPage