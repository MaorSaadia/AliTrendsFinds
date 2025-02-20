import Link from "next/link";
import { ChevronDown, Layers } from "lucide-react";
import { getAllCategories } from "@/sanity/lib/client";
import MobileCategoryMenu from "./MobileCategoryMenu";

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
          <div className="flex">
            <div className="w-72 bg-white dark:bg-stone-800 border rounded-lg shadow-lg">
              <div className="p-4 border-b dark:border-stone-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                  Browse Categories
                </h3>
              </div>

              <div className="py-2">
                {categories.map((category) => (
                  <div key={category._id} className="relative group/category">
                    <Link
                      href={`/category/${category.slug?.current}`}
                      prefetch
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-stone-700 transition-colors"
                    >
                      <span>{category.title}</span>
                      {category.subcategories?.length > 0 && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Link>

                    {category.subcategories?.length > 0 && (
                      <div className="absolute left-full top-0 ml-0.5 invisible opacity-0 group-hover/category:visible group-hover/category:opacity-100 transition-all duration-200">
                        <div className="w-72 bg-white dark:bg-stone-800 border rounded-lg shadow-lg">
                          <div className="p-4 border-b dark:border-stone-700">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                              {category.title}
                            </h3>
                          </div>
                          <div className="py-2">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory._id}
                                href={`/category/${category.slug?.current}/${subcategory.slug?.current}`}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-stone-700 transition-colors"
                              >
                                {subcategory.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t dark:border-stone-700">
                <Link
                  href="/all-products"
                  className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileCategoryMenu
        categories={categories}
        onMobileItemClick={onMobileItemClick}
      />
    </>
  );
};

export default HeaderCategorySelector;
