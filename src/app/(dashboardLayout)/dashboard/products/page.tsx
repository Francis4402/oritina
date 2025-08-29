import { getProducts } from '@/services/Product'
import ProductTable from './ProductTable';
import AddProductForm from '../../addforms/AddProductForm';



const Products = async () => {

  const product = await getProducts();


  return (
    <div>
      <div className='flex items-end justify-end px-5'>
        <AddProductForm />
      </div>
      <ProductTable product={product} />
    </div>
  )
}

export default Products