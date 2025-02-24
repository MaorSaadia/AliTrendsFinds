import { Metadata } from "next";
import { LayoutGrid } from "lucide-react";

import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

type CategoryPageProps = { params: Promise<{ slug: string }> };

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const categoryName = category?.title || slug.replace(/-/g, " ");
  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return {
    title: `${formattedCategoryName} Products`,
    description: `Discover trending ${formattedCategoryName} products from AliExpress at the best prices. Curated selection of top-rated items with exclusive deals.`,
    openGraph: {
      title: `${formattedCategoryName} - Trending AliExpress Products`,
      description: `Shop the best ${formattedCategoryName} from AliExpress with verified reviews and fast shipping.`,
      type: "website",
    },
    keywords: [
      categoryName,
      `${categoryName} products`,
      `${categoryName} AliExpress`,
      "trending products",
      "discount shopping",
      "AliExpress deals",
    ].filter(Boolean),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://alitrendsfinds.com/category/${slug}`,
    },
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  // Use Promise.all with the cached data fetching
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category?.title || slug.replace(/-/g, " ")} Products`,
          description: `Discover trending ${category?.title || slug.replace(/-/g, " ")} products from AliExpress at the best prices.`,
          url: `https://alitrendsfinds.com/category/${slug}`,
          numberOfItems: products.length,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: product.title,
              },
            })),
          },
        }}
      />
      <div className="min-h-screen dark:bg-stone-800">
        {/* Add Breadcrumbs */}
        <div className="container mx-auto px-3 p-3">
          <Breadcrumbs
            items={[
              {
                label: category?.title || slug.replace(/-/g, " "),
                href: "#",
                current: true,
              },
            ]}
          />
        </div>
        {/* Category Header */}
        <div className="bg-gradient-to-l from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">
                {category?.title || slug.replace(/-/g, " ")} Products
              </h1>
              <div className="flex items-center gap-2 mt-2">
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

        {/* Products Section */}
        <section className="container mx-auto px-4 py-6">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="flex items-center justify-center py-8 text-center">
              <div className="flex flex-col items-center space-y-2">
                <LayoutGrid className="h-6 w-6 text-orange-500" />
                <p className="text-gray-500">
                  No products available in this category yet.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default CategoryPage;
