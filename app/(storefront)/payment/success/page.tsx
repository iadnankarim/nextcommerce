import { CheckCircle2, Package, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { redis } from '@/app/lib/radis';
import { stripe } from '@/app/lib/stripe';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const { session_id } = await searchParams;

  if (!session_id) {
    return redirect('/');
  }

  // Verify the session with Stripe
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch (error) {
    console.error('Error retrieving session:', error);
    return redirect('/');
  }

  // Clear the cart after successful payment
  if (session.payment_status === 'paid') {
    await redis.del(`cart-${user.id}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-green-500 rounded-full p-4">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be processed
            shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900">{session_id.slice(0, 20)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-gray-900">
                  ${((session.amount_total || 0) / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {session.payment_status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-6 text-base rounded-xl"
            >
              <Link href="/">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 font-semibold px-8 py-6 text-base rounded-xl"
            >
              <Link href="/bag">
                View Orders
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <p className="mt-8 text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
}
