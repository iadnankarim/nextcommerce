import { Cart } from '@/app/lib/interfaces';
import { redis } from '@/app/lib/radis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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
      {cart?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Add items to your cart to get started
          </p>
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
                          <span className="font-medium">Quantity: {item.quantity}</span>
                          <span className="text-gray-400">•</span>
                          <span className="font-medium">${item.price} each</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-lg sm:text-xl font-bold text-gray-900">
                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </p>
                          <button className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-red-50">
                            Remove
                          </button>
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

                {/* Payment Details */}
                <div className="border-t border-gray-200 pt-6 space-y-6">
                  <h3 className="text-lg font-bold text-gray-900">Payment Details</h3>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full"
                    />
                  </div>

                  {/* Card Holder Name */}
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">
                      Card Holder Name
                    </Label>
                    <Input id="cardName" type="text" placeholder="John Doe" className="w-full" />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                      Billing Address
                    </Label>
                    <Input id="address" type="text" placeholder="123 Main St" className="w-full" />
                  </div>

                  {/* City & Zip */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Input id="city" type="text" placeholder="New York" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                        ZIP Code
                      </Label>
                      <Input
                        id="zip"
                        type="text"
                        placeholder="10001"
                        maxLength={10}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 text-base rounded-xl">
                  Complete Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
