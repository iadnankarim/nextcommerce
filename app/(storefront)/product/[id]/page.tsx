import { Suspense } from 'react';
import { FeaturedProducts } from '@/app/components/storefront/FeaturedProducts';
import { FeaturedProductsSkeleton } from '@/app/components/storefront/FeaturedProductsSkeleton';
import { ImageSlider } from '@/app/components/storefront/ImageSlider';
import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import { ShoppingBag, StarIcon } from 'lucide-react';
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start py-4 px-4 lg:px-0 lg:py-6">
        {/* LEFT SIDE - IMAGE SLIDER */}
        <div className="flex justify-center lg:justify-start w-full">
          <ImageSlider images={data.images} />
        </div>

        {/* RIGHT SIDE - PRODUCT DETAILS */}
        <div className="space-y-3 lg:space-y-4">
          <h1 className="text-2xl lg:text-3xl font-semibold">{data.name}</h1>
          <p className="text-xl lg:text-2xl font-bold">${data.price}</p>

          <div className="mt-2 lg:mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          </div>

          <p className="text-gray-600 text-sm lg:text-base">{data.description}</p>

          <form action={addProducttoShoppingCart}>
            {/* <Button className="w-full mt-4 lg:mt-5">
              <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
            </Button> */}
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className="mt-8 lg:mt-16 px-4 lg:px-0">
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </>
  );
}
