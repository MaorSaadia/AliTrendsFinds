import { Sparkles } from "lucide-react";

import { getAllProducts } from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";
import Hero from "@/components/layout/Hero";

const Home: React.FC = async () => {
  const allProducts = await getAllProducts();
  // Sort products by _createdAt date in descending order and take first 10
  const recentProducts = [...allProducts]
    .sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    )
    .slice(0, 10);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-700 dark:to-red-700">
        <div className="container mx-auto px-4 py-8 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-orange-200 dark:bg-orange-400 rounded-full opacity-10 animate-pulse" />
            <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-red-200 dark:bg-red-400 rounded-full opacity-10 animate-pulse" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto space-y-6">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-300 tracking-tight">
                Discover Trending Products
                <span className="text-orange-500 dark:text-orange-300">
                  {" "}
                  at Direct Prices
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-200 md:text-2xl ">
                We curate viral products and amazing deals, connecting you
                directly to the best AliExpress sellers.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <div className="order-2 sm:order-1">
        <Hero />
      </div>
      {/* Products Section */}
      <section className="dark:bg-stone-800 order-1 sm:order-2">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold flex items-center gap-2 group">
              <Sparkles className="h-8 w-8 sm:h-6 sm:w-6 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative text-gray-800 dark:text-gray-200 animate-in">
                Latest Finds
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </span>
            </h2>
            <p
              className="text-md text-orange-500 dark:text-orange-200 animate-pulse"
              style={{ animationDelay: "200ms" }}
            >
              Updated daily with the hottest finds!
            </p>
          </div>
          <ProductGrid products={recentProducts} />
          {/* Show All Products Button */}
          <div className="flex justify-center mt-12">
            <a
              href="/all-products"
              className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-orange-500 dark:bg-orange-600 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 dark:hover:bg-orange-700"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                Show All Finds
                <Sparkles className="w-5 h-5 animate-pulse" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
