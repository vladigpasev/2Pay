import { ProductInfo } from './products';

async function createStripeProduct(productInfo: ProductInfo): Promise<string> {
  throw new Error('Not Implemented!');
}

async function updateStripeProduct(stripeId: string, productInfo: ProductInfo): Promise<string> {
  throw new Error('Not Implemented!');
}

async function deleteStripeProduct(stripeId: string): Promise<void> {
  throw new Error('Not Implemented!');
}

export { createStripeProduct, updateStripeProduct, deleteStripeProduct };

