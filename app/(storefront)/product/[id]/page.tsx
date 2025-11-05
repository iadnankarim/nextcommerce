import { FeaturedProducts } from '@/app/components/storefront/FeaturedProducts';
import { ImageSlider } from '@/app/components/storefront/ImageSlider';
import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import { ShoppingBag, StarIcon } from 'lucide-react';
import { notFound } from 'next/navigation';

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
  const data = await getData(id);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-6">
        {/* LEFT SIDE - IMAGE SLIDER */}
        <div className="flex justify-start">
          <ImageSlider images={data.images} />
        </div>

        {/* RIGHT SIDE - PRODUCT DETAILS */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <p className="text-2xl font-bold">${data.price}</p>

          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
            <StarIcon className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          </div>
          <p className="text-gray-600">{data.description}</p>

          <Button className="w-full  mt-5">
            <ShoppingBag className="h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
