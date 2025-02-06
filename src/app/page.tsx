import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/sanity/lib/client";
import { Search, Sparkles, DollarSign, ThumbsUp } from "lucide-react";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Discover Trending Products at Direct Prices
            </h1>
            <p className="text-gray-600">
              We curate viral products and amazing deals, connecting you
              directly to the best AliExpress sellers.
            </p>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-orange-50 rounded-lg p-6 text-center space-y-3">
              <div className="flex justify-center">
                <DollarSign className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Real Prices, No Markup
              </h3>
              <p className="text-sm text-gray-600">
                We&apos;re not a dropshipping store – we just help you find the
                best prices so you can shop smarter!
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-orange-50 rounded-lg p-6 text-center space-y-3">
              <div className="flex justify-center">
                <Search className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Direct from Source
              </h3>
              <p className="text-sm text-gray-600">
                No Middlemen, No Hidden Fees – Just the best real prices
                directly from trusted AliExpress sellers!
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-orange-50 rounded-lg p-6 text-center space-y-3">
              <div className="flex justify-center">
                <ThumbsUp className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Curated Quality</h3>
              <p className="text-sm text-gray-600">
                We carefully select and verify products, ensuring you get the
                best quality at the lowest possible prices.
              </p>
            </div>
          </div>
        </div>
      </section>

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
