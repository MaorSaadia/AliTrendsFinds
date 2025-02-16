/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useEffect } from "react";
import { Package, Loader2, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/sanity.types";

import ProductGrid from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "./ProductSkeleton";

const ITEMS_PER_PAGE = 12;

type ProductGridProps = { products: Product[] };

const AllProducts = ({ products }: ProductGridProps) => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const currentProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMore = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, products.length));
    setIsLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-stone-800">
      {/* Header Section */}
      <div className="bg-white border-b bg-gradient-to-l from-orange-50 to-red-50 dark:from-orange-800 dark:to-red-900">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-orange-500 animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              All Products
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our curated collection of products. Each item has been
              carefully selected for its quality and value.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {initialLoading ? (
            <ProductGridSkeleton />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <ProductGrid products={currentProducts} />
            </motion.div>
          )}
          {/* Load More Button */}
          {!initialLoading && hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More Products</span>
                )}
              </button>
            </div>
          )}

          {/* Products Counter */}
          {!initialLoading && (
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Showing {currentProducts.length} out of {products.length} products
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            //@ts-expect-error
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProducts;
