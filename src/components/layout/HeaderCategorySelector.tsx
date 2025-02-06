import { getAllCategories } from "@/sanity/lib/client";
import Link from "next/link";
import React from "react";
import { ChevronDown, Layers } from "lucide-react";

const HeaderCategorySelector = async () => {
  const categories = await getAllCategories();

  return (
    <div className="relative inline-block">
      <button className="peer group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-orange-500">
        <Layers className="h-4 w-4" />
        <span>Categories</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:rotate-180" />
      </button>

      <div className="absolute left-0 top-full z-50 mt-1 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-200 ease-in-out">
        <div className="w-72 overflow-hidden rounded-xl border bg-white p-1 shadow-lg">
          <div className="relative max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-white to-white/90 px-3 py-2 backdrop-blur-sm">
              <h3 className="font-semibold text-gray-900">Browse Categories</h3>
            </div>

            {/* Categories List */}
            <div className="mt-1 space-y-0.5">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug?.current}`}
                  prefetch
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  {/* If you have category icons, you can add them here */}
                  <span className="flex-1">{category.title}</span>
                  <span className="text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-1 border-t px-3 py-2">
            <Link
              href="/categories"
              className="block text-center text-xs font-medium text-gray-500 hover:text-orange-500"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCategorySelector;
