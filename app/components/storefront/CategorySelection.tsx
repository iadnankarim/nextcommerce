// import Link from 'next/link';

// import all from '@/public/all.jpeg';
// import Image from 'next/image';

// export function CategorySelectio() {
//   return (
//     <div className="py-24 sm:py-32">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-extrabold tracking-tight">Shop by Category</h2>
//         <Link
//           className="text-sm font-semibold text-purple-300 hover:text-primary/80"
//           href="/products/all"
//         >
//           Brower all Product &rarr;
//         </Link>
//       </div>

//       <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-8 lg:gap-8 ">
//         <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2 relative ">
//           <Image src={all} alt="all product" className="object-cover object-center " />
//           <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/55 pointer-events-none" />
//           <div className="p-6 flex items-end">
//             <Link href="/products/all">
//               <h3 className=" font-semibold">All Product</h3>
//               <p className="mt-1 text-sm">Shop Now</p>
//             </Link>
//           </div>
//         </div>

//         <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
//           <Image
//             src={all}
//             alt="all product"
//             className="object-center object-cover sm:absolute sm:inset-0 sm:h-full sm:w-full"
//           />
//           <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/55 pointer-events-none" />

//           <div className="absolute inset-0 flex items-end p-8 text-white">
//             <Link href="/products/all">
//               <h3 className="font-semibold">All Product</h3>
//               <p className="mt-1 text-sm">Shop Now</p>
//             </Link>
//           </div>
//         </div>

//         <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
//           <Image
//             src={all}
//             alt="all product"
//             className="object-center  object-cover sm:absolute sm:inset-0 sm:h-full sm:w-full"
//           />
//           <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/55 pointer-events-none " />

//           <div className="absolute inset-0 flex items-end p-8 text-white">
//             <Link href="/products/all">
//               <h3 className="font-semibold">All Product</h3>
//               <p className="mt-1 text-sm">Shop Now</p>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from 'next/link';
import Image from 'next/image';
import all from '@/public/all.jpeg';

export function CategorySelectio() {
  return (
    <section className="py-24 sm:py-32">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center sm:text-left">
          Shop by Category
        </h2>
        <Link
          href="/products/all"
          className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition"
        >
          Browse all Products &rarr;
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-6 lg:gap-8">
        {/* Large Left Image */}
        <div className="relative sm:row-span-2 rounded-xl overflow-hidden group">
          <Image
            src={all}
            alt="All Products"
            className="w-full h-72 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Link href="/products/all">
              <h3 className="text-xl font-semibold">All Products</h3>
              <p className="text-sm text-gray-200">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Top Right Image */}
        <div className="relative rounded-xl overflow-hidden group">
          <Image
            src={all}
            alt="Men’s Collection"
            className="w-full h-56 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Link href="/products/men">
              <h3 className="text-xl font-semibold">Men’s Collection</h3>
              <p className="text-sm text-gray-200">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Bottom Right Image */}
        <div className="relative rounded-xl overflow-hidden group">
          <Image
            src={all}
            alt="Women’s Collection"
            className="w-full h-56 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Link href="/products/women">
              <h3 className="text-xl font-semibold">Women’s Collection</h3>
              <p className="text-sm text-gray-200">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
