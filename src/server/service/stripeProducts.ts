import { ProductInfo } from './products';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

async function createStripeProduct(productInfo: ProductInfo): Promise<string> {
  const product = await stripe.products.create({
    name: productInfo.name,
    description: productInfo.description,
    images: [productInfo.pictureURL],
    default_price_data: {
      currency: 'eur',
      unit_amount: productInfo.price * 100
    }
  });

  return [product.id, product.default_price].join(' ; ');
}

async function updateStripeProduct(stripeId: string, productInfo: ProductInfo): Promise<string> {
  const [productId, _] = stripeId.split(' ; ');
  const price = await stripe.prices.create({
    currency: 'eur',
    unit_amount: productInfo.price * 100,
    product: productId,
    nickname: 'Current price'
  });
  await stripe.products.update(productId, {
    name: productInfo.name,
    description: productInfo.description,
    images: [productInfo.pictureURL],
    default_price: price.id
  });

  return [productId, price.id].join(' ; ');
}

async function deleteStripeProduct(stripeId: string): Promise<void> {
  const [productId, _] = stripeId.split(' ; ');
  await stripe.products.del(productId);
}

export { createStripeProduct, updateStripeProduct, deleteStripeProduct };

