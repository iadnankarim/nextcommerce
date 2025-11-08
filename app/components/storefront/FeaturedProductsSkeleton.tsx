export function FeaturedProductsSkeleton() {
  return (
    <div className="w-full">
      {/* Title Skeleton */}
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>

      {/* Products Grid Skeleton */}
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="rounded-lg space-y-2">
            {/* Image Skeleton */}
            <div className="relative h-[330px] w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>

            {/* Product Name and Price Skeleton */}
            <div className="flex justify-between items-center mt-2">
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Description Skeleton */}
            <div className="mt-1 space-y-2">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Button Skeleton */}
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mt-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
