import Banner from "@/components/Banner";
import FeatureProducts from "@/components/Feature";
import Hero from "@/components/Hero";
import ProductsExplorer from "@/components/ProductsExplorer";

import Testimonials from "@/components/Testimonials";
import { getProducts } from "@/lib/products";

const HOME_PRODUCTS_LIMIT = 10;

export default function Home() {
  const products = getProducts().slice(0, HOME_PRODUCTS_LIMIT);

  return (
    <div>
      <Hero />
       <FeatureProducts />
       <ProductsExplorer products={products} />
       <Banner />
      <Testimonials />
      
      
    </div>
  );
}
