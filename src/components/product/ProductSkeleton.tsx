// components/product/ProductSkeleton.tsx
const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square w-full bg-gray-200 dark:bg-stone-800" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 dark:bg-stone-800 rounded w-3/4" />

        {/* Price */}
        <div className="h-6 bg-gray-200 dark:bg-stone-800 rounded w-1/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-stone-800 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-stone-800 rounded w-5/6" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 dark:bg-stone-800 rounded w-full mt-4" />
      </div>
    </div>
  );
};

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
