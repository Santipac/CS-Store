import { type NextPage } from "next";
import { Hero } from "@/components";
import ProductList from "@/components/ui/products/ProductList";
import { ShopLayout } from "@/components/layouts/ShopLayout";
const Home: NextPage = () => {
  return (
    <ShopLayout
      title="CS Store - Argentina"
      description="Best Skins of CSGO in one place."
    >
      <Hero />
      <ProductList />
    </ShopLayout>
  );
};

export default Home;
