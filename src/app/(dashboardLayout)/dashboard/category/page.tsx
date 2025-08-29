import { getProductCategory } from "@/services/ProductCategory"
import CategoryTable from "./CategoryTable";
import AddCategoryForm from "../../addforms/AddCategoryForm";


const Category = async () => {

  const category = await getProductCategory();

  return (
    <div>
      <div className='flex items-end justify-end px-5'>
        <AddCategoryForm />
      </div>
      
      <CategoryTable category={category} />
    </div>
  )
}

export default Category