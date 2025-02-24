import { MetadataRoute } from "next";
import { getAllCategories } from "@/sanity/lib/client";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://alitrendsfinds.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/all-products`,
      lastModified: new Date(),
    },
  ];

  try {
    // Get categories for category pages
    const categories = await getAllCategories();

    // Regular category routes
    const categoryRoutes = categories
      .filter(
        (category) =>
          category.slug &&
          typeof category.slug === "object" &&
          category.slug.current
      )
      .map((category) => ({
        url: `${baseUrl}/category/${category.slug?.current}`,
        lastModified: new Date(),
      }));

    // Subcategory routes
    const subcategoryRoutes: MetadataRoute.Sitemap = [];

    // Process each category to get its subcategories
    categories.forEach((category) => {
      if (category.slug?.current && category.subcategories) {
        category.subcategories
          .filter(
            (subcategory) =>
              subcategory.slug &&
              typeof subcategory.slug === "object" &&
              subcategory.slug.current
          )
          .forEach((subcategory) => {
            subcategoryRoutes.push({
              url: `${baseUrl}/category/${category.slug?.current}/${subcategory.slug?.current}`,
              lastModified: new Date(),
            });
          });
      }
    });

    return [...routes, ...categoryRoutes, ...subcategoryRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes; // Return at least the base routes if there's an error
  }
}
