/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Search } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

import { searchProducts } from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";

type Props = {
  params: Promise<{}>;
  searchParams: Promise<{ query?: string }>;
};

// Generate dynamic metadata based on search query
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const sp = await searchParams;
  const query = sp.query || "";
  const decodedQuery = decodeURIComponent(query);
  const products = await searchProducts(decodedQuery);
  const productCount = products.length;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${decodedQuery || "Search Results"}`,
    description: `Browse ${productCount} ${decodedQuery} products from our marketplace. Best deals and prices for ${decodedQuery}.`,
    keywords: [
      `${decodedQuery}`,
      "online shopping",
      "AliExpress products",
      "trends products",
      "best deals",
    ],
    openGraph: {
      title: `${decodedQuery || "Search Results"}`,
      description: `Browse ${productCount} ${decodedQuery} products from our marketplace. Best deals and prices for ${decodedQuery}.`,
      type: "website",
      images: previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedQuery || "Search Results"}`,
      description: `Browse ${productCount} ${decodedQuery} products from our marketplace. Best deals and prices for ${decodedQuery}.`,
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = sp.query || "";
  const decodedQuery = decodeURIComponent(query);
  const products = await searchProducts(decodedQuery);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-800">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-lg text-gray-600 dark:text-gray-200">
              Search Results for &quot;{decodedQuery}&quot;
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                <span className="text-sm font-medium text-orange-600">
                  {products.length}
                </span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-100">
                Products Found
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex items-center justify-center py-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Search className="h-6 w-6 text-orange-500" />
              <p className="text-gray-500">
                No products found. Try different keywords.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
