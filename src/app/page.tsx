import { Sparkles } from "lucide-react";

import { getAllProducts } from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";
import Hero from "@/components/layout/Hero";

const Home: React.FC = async () => {
  const products = await getAllProducts();

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      {/* Products Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500" />
              Trending Products
            </h2>
            <p className="text-sm text-gray-500">
              Updated daily with the hottest finds!
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
};

export default Home;
