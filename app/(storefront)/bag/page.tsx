import { Cart } from '@/app/lib/interfaces';
import { redis } from '@/app/lib/radis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/app/components/storefront/QuantitySelector';
import { removeItem, createCheckoutSession } from '@/app/actions';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default async function BagRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  const subtotal =
    cart?.items.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {!cart || cart.items.length === 0 ? (
        // <div className="flex flex-col items-center justify-center min-h-[60vh]">
        //   <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        //     You dont have any products in your cart
        //   </h1>
        //   <p className="text-gray-500 text-sm sm:text-base">
        //     {/* Add items to your cart to start shopping */}
        //     your currently dont have products in your shopping cart. Please add some so <br />
        //     that you can see them right here
        //   </p>
        // </div>
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">You dont have any products in your Bag</h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please add some so that you
            can see them right here.
          </p>

          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Side - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
            <div className="space-y-4">
              {cart?.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-6"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.imageString}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 128px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                          {item.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-600 mb-4">
                          <span className="font-medium">${item.price} each</span>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <QuantitySelector
                            productId={item.id}
                            initialQuantity={Number(item.quantity)}
                          />
                          <p className="text-lg sm:text-xl font-bold text-gray-900">
                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </p>
                          <form action={removeItem.bind(null, item.id)}>
                            <button
                              type="submit"
                              className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Order Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
                {/* Order Summary */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-gray-900">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <form action={createCheckoutSession}>
                  <Button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 text-base rounded-xl"
                  >
                    Complete Order
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
