import { Client, resources } from 'coinbase-commerce-node';
import { products } from '../../../db/schema';
import { v2 as cloudinary } from 'cloudinary';
import IUser from '@/types/User';
import { eq } from 'drizzle-orm';
import db from '@/drizzle';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

Client.init(process.env.COINBASE_API!);

async function createProductCharge(userData: IUser, productId: string) {
  const product = (await db.select().from(products).where(eq(products.uuid, productId)).limit(1))[0];
  if (product == null) return null;

  const uploadedImage = await cloudinary.uploader.upload(product.pictureURL);

  const charge = await resources.Charge.create({
    // @ts-ignore
    logo_url: uploadedImage.secure_url,
    name: product.name,
    description: product.description,
    pricing_type: 'fixed_price',
    local_price: {
      amount: product.price.toFixed(2),
      currency: 'EUR'
    },
    redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}payment/error`,
    metadata: {
      productId,
      userId: userData.uuid
    }
  });

  return charge.hosted_url;
}

export { createProductCharge };
