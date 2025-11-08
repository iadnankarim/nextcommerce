export default function Loading() {
  return (
    <section>
      {/* Title Skeleton */}
      <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse mb-5"></div>

      {/* Products Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg">
            {/* Image Skeleton */}
            <div className="relative h-[330px] bg-gray-200 rounded-lg animate-pulse"></div>

            {/* Product Name and Price Skeleton */}
            <div className="flex justify-between items-center mt-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Description Skeleton */}
            <div className="mt-1 space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Button Skeleton */}
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-3"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
