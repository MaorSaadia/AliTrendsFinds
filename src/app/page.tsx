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
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 group">
              <Sparkles className="h-6 w-6 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative">
                Trending Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </span>
            </h2>
            <p
              className="text-sm text-gray-500 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
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
