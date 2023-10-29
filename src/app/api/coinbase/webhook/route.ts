import { buyProduct } from '@/server/service/products';
import { ChargeResource, Client, Webhook } from 'coinbase-commerce-node';

Client.init(process.env.COINBASE_API!);

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const signature = String(req.headers.get('x-cc-webhook-signature'));
    const event = Webhook.verifyEventBody(JSON.stringify(rawBody), signature, process.env.COINBASE_SECRET!);

    if (event.type === 'charge:confirmed')
      return new Response('success', {
        status: 200
      });

    const charge = event.data as ChargeResource;

    await buyProduct(charge.metadata.userId, charge.metadata.productId, 'crypto');
  } catch (e: any) {
    return new Response(e.message, {
      status: 500
    });
  }

  return new Response('success', {
    status: 200
  });
}
