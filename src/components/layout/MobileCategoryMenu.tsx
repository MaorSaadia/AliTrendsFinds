/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Layers } from "lucide-react";

interface MobileCategoryMenuProps {
  categories: any[];
  onMobileItemClick?: () => void;
}

const MobileCategoryMenu = ({
  categories,
  onMobileItemClick,
}: MobileCategoryMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <div className="mb-2">
        <h3 className="flex items-center gap-2 px-2 text-sm font-medium text-gray-900 dark:text-gray-200">
          <Layers className="h-4 w-4" />
          Categories
        </h3>
      </div>
      <div className="space-y-1">
        {categories.map((category) => (
          <div key={category._id}>
            <div className="group flex items-center rounded-lg text-sm text-gray-700 dark:text-gray-100">
              {/* Category Link */}
              <Link
                href={`/category/${category.slug?.current}`}
                prefetch
                onClick={onMobileItemClick}
                className="flex-1 px-2 py-2 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-600 rounded-l-lg transition-colors"
              >
                {category.title}
              </Link>

              {/* Expand Button - Removed onMobileItemClick */}
              {category.subcategories?.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCategory(
                      expandedCategory === category._id ? null : category._id
                    );
                  }}
                  className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-r-lg transition-colors"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      expandedCategory === category._id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Subcategories */}
            {expandedCategory === category._id &&
              category.subcategories?.length > 0 && (
                <div className="ml-4 mt-1 space-y-1 bg-gray-50 dark:bg-stone-700/50 rounded-lg py-2">
                  {category.subcategories.map((subcategory: any) => (
                    <Link
                      key={subcategory._id}
                      href={`/category/${category.slug?.current}/${subcategory.slug?.current}`}
                      onClick={onMobileItemClick} // Keep this to close menu on navigation
                      className="block px-6 py-1.5 text-sm text-gray-600 dark:text-gray-300 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-600"
                    >
                      {subcategory.title}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
        <Link
          href="/all-products"
          onClick={onMobileItemClick}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-600"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default MobileCategoryMenu;
