export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start py-4 px-4 lg:px-0 lg:py-6">
        {/* LEFT SIDE - IMAGE SLIDER SKELETON */}
        <div className="flex justify-center lg:justify-start w-full">
          <div className="grid gap-6 md:gap-3 items-start">
            {/* Main Image Skeleton */}
            <div className="relative overflow-hidden rounded-lg w-[600px] h-[600px] bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

            {/* Thumbnails Skeleton */}
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg w-[100px] h-[100px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - PRODUCT DETAILS SKELETON */}
        <div className="space-y-3 lg:space-y-4">
          {/* Product Name Skeleton */}
          <div className="h-9 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>

          {/* Price Skeleton */}
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>

          {/* Stars Skeleton */}
          <div className="mt-2 lg:mt-3 flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mt-4 lg:mt-5"></div>
        </div>
      </div>

      {/* Featured Products Section Skeleton */}
      <div className="mt-8 lg:mt-16 px-4 lg:px-0">
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
      </div>
    </>
  );
}
