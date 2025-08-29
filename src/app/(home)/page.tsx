import CarouselHome from "./homecomp/CarouselHome";
import Logos from "./homecomp/Logos";
import NewestProduct from "./homecomp/NewestProduct";
import ProductPage from "./homecomp/ProductPage";
import Services from "./homecomp/Services";


export default function Home() {
  return (
    <div>
      <CarouselHome />
      <Logos/>
      <NewestProduct/>
      <ProductPage />
      <Services />
    </div>
  );
}
