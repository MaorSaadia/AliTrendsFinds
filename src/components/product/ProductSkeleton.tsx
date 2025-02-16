// ProductSkeleton Components - Individual item and grid layout with proper container styling
type ProductGridSkeletonProps = {
  count?: number;
};

const ProductSkeleton = () => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-neutral-600">
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-neutral-500 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title Skeleton */}
        <div className="mb-4 min-h-[2.5rem]">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-neutral-500 rounded animate-pulse mb-2"></div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto w-full">
          <div className="w-full h-10 rounded-lg bg-gray-200 dark:bg-neutral-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = ({ count = 12 }: ProductGridSkeletonProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};

export { ProductSkeleton, ProductGridSkeleton };
