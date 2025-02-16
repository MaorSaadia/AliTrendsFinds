import { getAllProducts } from "@/sanity/lib/client";
import AllProducts from "@/components/product/AllProducts";

export const metadata = {
  title: "All Products",
  description:
    "Browse our complete collection of trending products from AliExpress.",
};

const AllProductsPage = async () => {
  const products = await getAllProducts();

  return <AllProducts products={products} />;
};

export default AllProductsPage;
