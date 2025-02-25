import { MetadataRoute } from "next";

import { getAllCategories, getAllProducts } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://alitrendsfinds.com";

// Function to extract relevant search terms from product titles
function extractSearchTerms(products: Product[]): string[] {
  const searchTerms = new Set<string>();

  products.forEach((product: Product) => {
    if (!product.title) return;

    const title: string = product.title;
    const words: string[] = title.split(" ").filter((word) => word.length > 2);

    // Add full product title
    searchTerms.add(title);

    // Add first word (brand name or primary identifier)
    if (words[0]) {
      searchTerms.add(words[0]);
    }

    // Process word combinations of different lengths
    for (let i = 2; i <= Math.min(4, words.length); i++) {
      // Add combinations starting from the beginning (e.g., "Retroid Pocket")
      if (words.length >= i) {
        searchTerms.add(words.slice(0, i).join(" "));
      }

      // Add combinations from the middle/end (e.g., "Handheld Game", "Game Console")
      if (words.length > i) {
        for (let j = 1; j <= words.length - i; j++) {
          const combination = words.slice(j, j + i).join(" ");
          if (combination.length > 5) {
            // Only add meaningful combinations
            searchTerms.add(combination);
          }
        }
      }
    }

    // Add model numbers or identifiers (words with digits)
    const modelNumbers: string[] = title
      .split(" ")
      .filter((word) => /\d/.test(word));
    modelNumbers.forEach((model: string) => {
      if (model.length > 1) {
        searchTerms.add(model);
      }
    });
  });

  return Array.from(searchTerms);
}

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
      changeFrequency: "daily",
    },
  ];

  try {
    // Get categories for category pages
    const categories = await getAllCategories();

    // Get all products to extract search terms
    const products = await getAllProducts();

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
        priority: 0.8, // Higher priority for category pages
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
              priority: 0.7, // Medium-high priority for subcategory pages
            });
          });
      }
    });

    // Extract search terms from products
    const searchTerms: string[] = extractSearchTerms(products);

    // Create search query routes with a lower priority
    const searchRoutes: MetadataRoute.Sitemap = searchTerms.map(
      (term: string) => ({
        url: `${baseUrl}/search?query=${encodeURIComponent(term)}`,
        lastModified: new Date(),
        priority: 0.8,
        changefreq: "weekly" as const,
      })
    );

    // Limit the number of search routes to prevent extremely large sitemaps
    // Google has a 50MB limit (~50,000 URLs). Adjust the limit as needed.
    const maxSearchRoutes = 5000;
    const limitedSearchRoutes = searchRoutes.slice(0, maxSearchRoutes);

    return [
      ...routes,
      ...categoryRoutes,
      ...subcategoryRoutes,
      ...limitedSearchRoutes,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes; // Return at least the base routes if there's an error
  }
}
