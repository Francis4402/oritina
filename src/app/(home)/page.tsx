import CarouselHome from "./homecomp/CarouselHome";
import Logos from "./homecomp/Logos";
import ProductPage from "./homecomp/ProductPage";
import Services from "./homecomp/Services";


export default function Home() {
  return (
    <div>
      <CarouselHome />
      <Logos/>
      <ProductPage />
      <Services />
    </div>
  );
}
