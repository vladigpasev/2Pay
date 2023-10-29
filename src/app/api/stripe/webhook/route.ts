import Stripe from 'stripe';
import { headers } from 'next/headers';
import { buyProduct } from '@/server/service/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();

  const headersList = headers();
  const sig = headersList.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload as string, sig, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400
    });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const webhookData = event.data.object;
      const metadata = webhookData.metadata as { stripeId: string; userId: string };
      const transactionInfo = await buyProduct(metadata.userId, metadata.stripeId, 'card');

      if (transactionInfo && transactionInfo.price && transactionInfo.stripeSellerId) {
        try {
          const transfer = await stripe.transfers.create({
            amount: transactionInfo.price*90,
            currency: 'eur',
            destination: transactionInfo.stripeSellerId,
          });
          console.log('Transfer created:', transfer);
        } catch (err: any) {
          console.error('Error creating transfer:', err);
        }
        
      } else {
        console.error('Transaction info or its properties are undefined or null');
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('Received', {
    status: 201
  });
}
