import Link from 'next/link';
// import men from '@/public/men.jpg';
// import women from '@/public/women.jpg';
import all from '@/public/all.jpeg';
import Image from 'next/image';

export function CategorySelectio() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">Shop by Category</h2>
        <Link
          className="text-sm font-semibold text-purple-300 hover:text-primary/80"
          href="/product/all"
        >
          Brower all Product &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-8 lg:gap-8 ">
        <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2 relative ">
          <Image src={all} alt="all product" className="object-cover object-center " />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/55 pointer-events-none" />
          <div className="p-6 flex items-end">
            <Link href="/products/all">
              <h3 className=" font-semibold">All Product</h3>
              <p className="mt-1 text-sm">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={all}
            alt="all product"
            className="object-center object-cover sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/55 pointer-events-none" />

          <div className="absolute inset-0 flex items-end p-8 text-white">
            <Link href="/products/all">
              <h3 className="font-semibold">All Product</h3>
              <p className="mt-1 text-sm">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
          <Image
            src={all}
            alt="all product"
            className="object-center  object-cover sm:absolute sm:inset-0 sm:h-full sm:w-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/55 pointer-events-none " />

          <div className="absolute inset-0 flex items-end p-8 text-white">
            <Link href="/products/all">
              <h3 className="font-semibold">All Product</h3>
              <p className="mt-1 text-sm">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
