import CarouselHome from "./homecomp/CarouselHome";
import Logos from "./homecomp/Logos";
import NewestProduct from "./homecomp/NewestProduct";
import ProductShow from "./homecomp/ProductShow";
import Services from "./homecomp/Services";


export default function Home() {
  return (
    <div>
      <CarouselHome />
      <Logos/>
      <NewestProduct/>
      <ProductShow/>
      <Services />
    </div>
  );
}
