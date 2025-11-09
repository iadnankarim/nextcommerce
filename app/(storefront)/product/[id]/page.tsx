import { Suspense } from 'react';
import { FeaturedProducts } from '@/app/components/storefront/FeaturedProducts';
import { FeaturedProductsSkeleton } from '@/app/components/storefront/FeaturedProductsSkeleton';
import { ImageSlider } from '@/app/components/storefront/ImageSlider';
import prisma from '@/app/lib/db';
import { StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { addItem } from '@/app/actions';
import { ShoppingBagButton } from '@/app/components/SubmitButtons';

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const addProducttoShoppingCart = addItem.bind(null, id);
  const data = await getData(id);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start py-6 px-4 sm:px-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
        {/* LEFT SIDE - IMAGE SLIDER */}
        <div className="w-full">
          <ImageSlider images={data.images} />
        </div>

        {/* RIGHT SIDE - PRODUCT DETAILS */}
        <div className="space-y-4 lg:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">${data.price}</p>

          <div className="flex items-center gap-1">
            <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
            <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
            <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
            <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
            <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-yellow-400" />
          </div>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {data.description}
          </p>

          <form action={addProducttoShoppingCart} className="w-full pt-4">
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className="mt-12 lg:mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </>
  );
}
