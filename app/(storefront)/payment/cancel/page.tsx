import { XCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function CancelPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center">
          {/* Cancel Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-red-500 rounded-full p-4">
                <XCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment was cancelled. No charges have been made to your account. Your items are
            still in your cart and ready to checkout when you&apos;re ready.
          </p>

          {/* Info Box */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s Next?</h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Your cart items are saved and ready for checkout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>You can review your order and try again anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>No payment was processed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-6 text-base rounded-xl"
            >
              <Link href="/bag">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Cart
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 font-semibold px-8 py-6 text-base rounded-xl"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>

          {/* Additional Info */}
          <p className="mt-8 text-sm text-gray-500">
            If you experienced any issues during checkout, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
