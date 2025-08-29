
import { getProduct, getProducts } from "@/services/Product";
import { ProductDetails } from "../ProductDetails";
import { product } from "@/app/types/Types";




const ProductDetailsPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const product = await getProduct(id);
  const productData: product = product.data[0];
  
  // Fetch related products
  const products = await getProducts();
  const relatedProducts = products.filter((product: product) => 
      product.category === productData.category && product.id !== productData.id
  ).slice(0, 4);

  return <ProductDetails productData={productData} relatedProducts={relatedProducts} />;
}

export default ProductDetailsPage;