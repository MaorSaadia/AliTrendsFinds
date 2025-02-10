import Link from "next/link";
import { ChevronDown, Layers } from "lucide-react";
import { getAllCategories } from "@/sanity/lib/client";

interface HeaderCategorySelectorProps {
  onMobileItemClick?: () => void;
}

const HeaderCategorySelector = async ({
  onMobileItemClick,
}: HeaderCategorySelectorProps) => {
  const categories = await getAllCategories();

  return (
    <>
      {/* Desktop dropdown */}
      <div className="relative hidden md:inline-block">
        <button className="peer group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-orange-500">
          <Layers className="h-4 w-4" />
          <span>Categories</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out group-hover:rotate-180" />
        </button>

        <div className="absolute left-0 top-full z-50 mt-1 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-200 ease-in-out">
          <div className="w-72 overflow-hidden rounded-xl border bg-white dark:bg-stone-800 p-1 shadow-lg">
            <div className="relative max-h-[70vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-b from-white to-white/90 dark:from-stone-800 dark:to-stone-800/90 px-3 py-2 backdrop-blur-sm">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                  Browse Categories
                </h3>
              </div>

              <div className="mt-1 space-y-0.5">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/category/${category.slug?.current}`}
                    prefetch
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 transition-colors dark:hover:text-orange-400 hover:text-orange-600"
                  >
                    <span className="flex-1">{category.title}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-1 border-t px-3 py-2">
              <Link
                href="/all-products"
                className="block text-center text-xs font-medium text-gray-500 dark:text-gray-100 dark:hover:text-orange-400 hover:text-orange-500"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile list */}
      <div className="md:hidden">
        <div className="mb-2">
          <h3 className="flex items-center gap-2 px-2 text-sm font-medium text-gray-900 dark:text-gray-200">
            <Layers className="h-4 w-4" />
            Categories
          </h3>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug?.current}`}
              prefetch
              onClick={onMobileItemClick}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-700 dark:text-gray-100 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-600"
            >
              <span className="flex-1">{category.title}</span>
              <span className="text-xs text-gray-400">→</span>
            </Link>
          ))}
          <Link
            href="/all-products"
            onClick={onMobileItemClick}
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-600"
          >
            View All Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderCategorySelector;
