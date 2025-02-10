import ProductGrid from "@/components/product/ProductGrid";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import { LayoutGrid } from "lucide-react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);

  return (
    <div className="min-h-screen dark:bg-stone-800">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-lg text-gray-600 dark:text-gray-200 capitalize">
              {category?.title || slug.replace(/-/g, " ")}
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                <span className="text-sm font-medium text-orange-600">
                  {products.length}
                </span>
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-100">
                Products Founds
              </span>
            </div>
            {category?.description && (
              <p className="text-sm text-gray-500 max-w-2xl text-center">
                {category.description}
              </p>
            )}
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
  );
};

export default CategoryPage;
