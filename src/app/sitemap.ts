import { MetadataRoute } from "next";

import { getAllCategories, getAllProducts } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://alitrendsfinds.com";

// Known important URLs that should always be included (fallback mechanism)
const IMPORTANT_URLS = [
  "/all-products",
  "/category/anime-and-collectibles",
  "/category/electronics",
  "/category/toys-and-games",
  "/category/home-and-garden",
  "/category/anime-and-collectibles/studio-ghibli",
  "/category/anime-and-collectibles/model-cars-and-accessories",
  "/category/electronics/projectors-and-accessories",
  "/category/toys-and-games/electronic-toys",
  "/category/toys-and-games/kids-toys",
  "/category/toys-and-games/rc-toys",
  "/category/toys-and-games/games-console",
  "/category/home-and-garden/security-and-locks",
  "/category/home-and-garden/kitchen-gadgets",
  "/category/home-and-garden/home-and-office-decor",
  "/category/home-and-garden/home-furniture",
  "/category/home-and-garden/smart-devices-and-robots",
  "/category/collectibles",
  "/category/collectibles/model-cars-and-accessories",
];

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

// Helper function to safely extract slug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSlug(item: any): string | null {
  if (!item) return null;

  // Handle string slugs
  if (typeof item.slug === "string") {
    return item.slug;
  }

  // Handle object slugs
  if (item.slug && typeof item.slug === "object" && item.slug.current) {
    return item.slug.current;
  }

  // Handle raw slug structure
  if (item.slug?.current) {
    return item.slug.current;
  }

  return null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("Starting sitemap generation...");

  // Base pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/all-products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Add the important URLs as a fallback
  const fallbackRoutes: MetadataRoute.Sitemap = IMPORTANT_URLS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  try {
    // Get categories for category pages
    console.log("Fetching categories...");
    const categories = await getAllCategories();
    console.log(`Fetched ${categories?.length || 0} categories`);

    // Get all products to extract search terms
    console.log("Fetching products...");
    const products = await getAllProducts();
    console.log(`Fetched ${products?.length || 0} products`);

    if (!categories || categories.length === 0) {
      console.warn(
        "No categories found or getAllCategories returned invalid data"
      );
      return [...routes, ...fallbackRoutes];
    }

    // Regular category routes with more lenient slug validation
    const categoryRoutes = categories
      .filter((category) => {
        const slug = getSlug(category);
        if (!slug) {
          console.warn(
            `Category missing valid slug: ${JSON.stringify(category)}`
          );
          return false;
        }
        return true;
      })
      .map((category) => {
        const slug = getSlug(category);
        return {
          url: `${baseUrl}/category/${slug}`,
          lastModified: new Date(),
          priority: 0.8,
          changeFrequency: "weekly" as const,
        };
      });

    // Subcategory routes
    const subcategoryRoutes: MetadataRoute.Sitemap = [];

    // Process each category to get its subcategories
    categories.forEach((category) => {
      const categorySlug = getSlug(category);

      if (!categorySlug) {
        console.warn(`Skipping subcategories for category with invalid slug`);
        return;
      }

      if (Array.isArray(category.subcategories)) {
        category.subcategories.forEach((subcategory) => {
          const subcategorySlug = getSlug(subcategory);

          if (subcategorySlug) {
            subcategoryRoutes.push({
              url: `${baseUrl}/category/${categorySlug}/${subcategorySlug}`,
              lastModified: new Date(),
              priority: 0.7,
              changeFrequency: "weekly" as const,
            });
          } else {
            console.warn(
              `Subcategory has invalid slug in category ${categorySlug}`
            );
          }
        });
      } else {
        console.warn(
          `Category ${categorySlug} has no subcategories or subcategories is not an array`
        );
      }
    });

    // Combine all routes
    let allRoutes = [...routes, ...categoryRoutes, ...subcategoryRoutes];

    // Create a Set of URLs to avoid duplicates
    const urlSet = new Set(allRoutes.map((route) => route.url));

    // Add fallback routes only if they're not already included
    fallbackRoutes.forEach((route) => {
      if (!urlSet.has(route.url)) {
        allRoutes.push(route);
        urlSet.add(route.url);
      }
    });

    // Extract search terms from products if we have products
    if (products && products.length > 0) {
      const searchTerms: string[] = extractSearchTerms(products);
      console.log(`Generated ${searchTerms.length} search terms`);

      // Create search query routes with a lower priority
      const searchRoutes: MetadataRoute.Sitemap = searchTerms.map(
        (term: string) => ({
          url: `${baseUrl}/search?query=${encodeURIComponent(term)}`,
          lastModified: new Date(),
          priority: 0.6,
          changeFrequency: "weekly" as const,
        })
      );

      // Limit the number of search routes to prevent extremely large sitemaps
      const maxSearchRoutes = 5000;
      const limitedSearchRoutes = searchRoutes.slice(0, maxSearchRoutes);

      allRoutes = [...allRoutes, ...limitedSearchRoutes];
    }

    console.log(`Generated sitemap with ${allRoutes.length} URLs`);
    return allRoutes;
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return base routes plus fallback routes in case of error
    return [...routes, ...fallbackRoutes];
  }
}
