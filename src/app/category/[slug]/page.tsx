import ProductGrid from "@/components/product/ProductGrid";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import React from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);

  return (
    <div>
      {/* <SalesCampaignBanner /> */}

      <section className="container mx-auto py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            🎉 {products.length} Amazing Finds Founds!
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default CategoryPage;
