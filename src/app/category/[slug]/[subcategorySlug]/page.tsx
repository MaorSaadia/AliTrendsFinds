import { Metadata } from "next";
import { LayoutGrid } from "lucide-react";

import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";

type PageProps = {
  params: Promise<{
    slug: string;
    subcategorySlug: string;
  }>;
};

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, subcategorySlug } = await params;

  // Get both category and subcategory data
  const [category, subcategory] = await Promise.all([
    getCategoryBySlug(slug),
    getSubcategoryBySlug(slug, subcategorySlug),
  ]);

  const title =
    `${category?.title} - ${subcategory?.title}` ||
    subcategorySlug.replace(/-/g, " ");

  return {
    title,
    openGraph: {
      title,
      type: "website",
    },
    keywords: [
      category?.title || "",
      subcategory?.title || "",
      "products",
      "shop",
      "category",
    ].filter(Boolean),
    robots: {
      index: true,
      follow: true,
    },
  };
}

const SubcategoryPage = async ({ params }: PageProps) => {
  // Await the params before destructuring
  const { slug, subcategorySlug } = await params;

  // Use Promise.all to fetch all required data concurrently
  const [category, subcategory, products] = await Promise.all([
    getCategoryBySlug(slug),
    getSubcategoryBySlug(slug, subcategorySlug),
    getProductsByCategorySlug(slug, subcategorySlug),
  ]);

  if (!category || !subcategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Category or subcategory not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-stone-800">
      {/* Subcategory Header */}
      <div className="bg-gradient-to-l from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-2 text-lg text-gray-500 dark:text-gray-300">
              <span>{category.title}</span>
              <span>/</span>
              <span className="text-gray-700 dark:text-gray-100">
                {subcategory.title}
              </span>
            </div>
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

      {/* Products Section */}
      <section className="container mx-auto px-4 py-6">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex items-center justify-center py-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <LayoutGrid className="h-6 w-6 text-orange-500" />
              <p className="text-gray-500">
                No products available in this subcategory yet.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SubcategoryPage;
