
import { getProduct, getProducts } from "@/services/Product";
import { product } from "@/app/types/Types";
import { getProductComment } from "@/services/ProductComments";
import { ProductDetails } from "../ProductDetails";


export async function generateMetadata({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const product = await getProduct(id);
  const productData: product = product.data[0];

  return {
    title: productData.name,
    description: productData.description,
  };
}


const ProductDetailsPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const product = await getProduct(id);
  const productData: product = product.data[0];
  
  
  const commentList = await getProductComment(id);
  
  const products = await getProducts();
  const relatedProducts = products.data.filter((product: product) => 
      product.category === productData.category && product.id !== productData.id
  ).slice(0, 4);

  return <ProductDetails productData={productData} relatedProducts={relatedProducts} commentList={commentList} id={id} />;
}

export default ProductDetailsPage;