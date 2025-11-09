import prisma from '@/app/lib/db';
import { redis } from '@/app/lib/radis';
import { stripe } from '@/app/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  console.log('🔔 Webhook received');
  try {
    console.log('📥 Reading request body...');
    const body = await req.text();
    console.log('📋 Getting headers...');
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');
    console.log('✅ Headers retrieved, signature:', signature ? 'present' : 'missing');

    if (!signature) {
      console.error('❌ Missing stripe signature');
      return new Response('Missing stripe signature', { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('❌ Missing STRIPE_WEBHOOK_SECRET');
      return new Response('Webhook secret not configured', { status: 500 });
    }

    console.log('🔐 Verifying webhook signature...');
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
      console.log('✅ Webhook verified, event type:', event.type);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown webhook error';
      console.error('❌ Webhook signature verification failed:', errorMessage);
      console.error('❌ Error details:', err);
      return new Response(`Webhook error: ${errorMessage}`, { status: 400 });
    }

    // ✅ Handle specific event types
    console.log('🔄 Processing event type:', event.type);
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('💳 Processing checkout.session.completed...');
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('📦 Session ID:', session.id);
        console.log('👤 Session metadata:', session.metadata);

        if (!session.metadata?.userId) {
          console.error('❌ Missing userId in session metadata', session.id);
          return new Response('Missing userId in metadata', { status: 400 });
        }

        try {
          // Map Stripe payment_status to order status
          const orderStatus = session.payment_status === 'paid' ? 'paid' : 'pending';
          console.log('💰 Amount:', session.amount_total);
          console.log('📊 Payment status:', session.payment_status);
          console.log('📝 Order status:', orderStatus);

          // Create order in database
          console.log('💾 Creating order in database...');
          await prisma.order.create({
            data: {
              amount: session.amount_total || 0,
              status: orderStatus,
              userId: session.metadata.userId,
            },
          });
          console.log('✅ Order created successfully');

          // Clear cart from Redis
          console.log('🛒 Clearing cart from Redis...');
          await redis.del(`cart-${session.metadata.userId}`);
          console.log('✅ Cart cleared successfully');

          console.log('✅ Payment completed! Order created for userId:', session.metadata.userId);
          console.log('✅ Cart cleared for userId:', session.metadata.userId);
        } catch (dbError) {
          console.error('❌ Database/Redis error:', dbError);
          console.error('❌ Error stack:', dbError instanceof Error ? dbError.stack : 'No stack');
          return new Response(
            `Database error: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`,
            { status: 500 }
          );
        }
        break;
      }
      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    console.log('✅ Webhook processed successfully');
    return new Response('ok', { status: 200 });
  } catch (error) {
    console.error('❌ Unexpected error in webhook handler:', error);
    console.error('❌ Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('❌ Error message:', error instanceof Error ? error.message : String(error));
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack');
    return new Response(
      `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
}
