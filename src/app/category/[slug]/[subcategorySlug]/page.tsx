import { Metadata } from "next";
import { LayoutGrid } from "lucide-react";

import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import ProductGrid from "@/components/product/ProductGrid";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

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

  const [category, subcategory] = await Promise.all([
    getCategoryBySlug(slug),
    getSubcategoryBySlug(slug, subcategorySlug),
  ]);

  const categoryName = category?.title || slug.replace(/-/g, " ");
  const subcategoryName =
    subcategory?.title || subcategorySlug.replace(/-/g, " ");

  // Format names for better display
  const formattedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  const formattedSubcategoryName =
    subcategoryName.charAt(0).toUpperCase() + subcategoryName.slice(1);

  const title = `${formattedSubcategoryName} ${formattedCategoryName}`;
  const description = `Shop trending ${formattedSubcategoryName} ${formattedCategoryName} from top AliExpress sellers. Curated selection with verified reviews and competitive prices.`;

  return {
    title,
    description,
    openGraph: {
      title: `${formattedSubcategoryName} ${formattedCategoryName} - AliExpress Deals`,
      description,
      type: "website",
    },
    keywords: [
      formattedCategoryName,
      formattedSubcategoryName,
      `${formattedSubcategoryName} ${formattedCategoryName}`,
      `${formattedSubcategoryName} AliExpress`,
      "AliExpress deals",
      "trending products",
    ].filter(Boolean),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://alitrendsfinds.com/category/${slug}/${subcategorySlug}`,
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
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${subcategory.title} ${category.title} Products`,
          description: `Shop trending ${subcategory.title} ${category.title} from top AliExpress sellers.`,
          url: `https://alitrendsfinds.com/category/${slug}/${subcategorySlug}`,
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
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://alitrendsfinds.com",
                  name: "Home",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": "https://alitrendsfinds.com/categories",
                  name: "Categories",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@id": `https://alitrendsfinds.com/category/${slug}`,
                  name: category.title,
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@id": `https://alitrendsfinds.com/category/${slug}/${subcategorySlug}`,
                  name: subcategory.title,
                },
              },
            ],
          },
        }}
      />
      <div className="min-h-screen dark:bg-stone-800">
        <div className="container mx-auto px-3 p-3">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: category.title || "", href: `/category/${slug}` },
              { label: subcategory.title || "", href: "#", current: true },
            ]}
          />
        </div>
        {/* Subcategory Header */}
        <div className="bg-gradient-to-l from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center gap-2 text-3xl text-gray-500 dark:text-gray-300">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">
                  {subcategory.title}
                </h1>
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
    </>
  );
};

export default SubcategoryPage;
