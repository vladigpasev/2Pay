import { InferInsertModel, InferSelectModel, and, eq, sql } from 'drizzle-orm';
import { companies, products } from '../../../db/schema';
import IUser from '@/types/User';
import * as uuid from 'uuid';
import db from '@/drizzle';
import { createStripeProduct, deleteStripeProduct, updateStripeProduct } from './stripeProducts';

export type Product = InferSelectModel<typeof products>;

export type ListedProduct = Omit<Product, 'stripeId' | 'galleryJSON' | 'companyUuid'>;

export type ProductInfo = Omit<Product, 'uuid' | 'stripeId' | 'amountSold' | 'companyUuid'>;

const LISTED_PRODUCT_FIELDS_DB = {
  uuid: products.uuid,
  name: products.name,
  price: products.price,
  description: products.description,
  pictureURL: products.pictureURL,
  amountSold: products.amountSold
};

async function createProduct(userInfo: IUser, companyUuid: string, info: ProductInfo) {
  if (
    (
      await db
        .select({ uuid: companies.uuid })
        .from(companies)
        .where(and(eq(companies.uuid, companyUuid), eq(companies.creatorUuid, userInfo.uuid)))
        .limit(1)
    ).length == 0
  )
    throw new Error('This company is not yours!');

  const product: InferInsertModel<typeof products> = {
    uuid: uuid.v4(),
    stripeId: await createStripeProduct(info),
    ...info,
    amountSold: 0,
    companyUuid
  };

  await db.insert(products).values(product);

  return product;
}

async function getProduct(productId: string) {
  const records = await db.select().from(products).where(eq(products.uuid, productId)).limit(1);
  if (records.length == 0) return null;
  return records[0];
}

async function updateProduct(userInfo: IUser, productId: string, newInfo: ProductInfo): Promise<Product> {
  const product = (await db.select().from(products).where(eq(products.uuid, productId)).limit(1))[0];
  if (product == null) throw new Error('This product does not exist!');

  const company = (
    await db
      .select({ uuid: companies.uuid })
      .from(companies)
      .where(and(eq(companies.uuid, product.companyUuid), eq(companies.creatorUuid, userInfo.uuid)))
      .limit(1)
  )[0];

  if (company == null) throw new Error('You do not own this company!');

  const updateOperation = await db.update(products).set(newInfo).where(eq(products.uuid, productId));

  if (updateOperation.rowsAffected === 0) throw new Error('Something went wrong!');

  await updateStripeProduct(product.stripeId, newInfo);

  return {
    ...product,
    ...newInfo
  };
}

async function deleteProduct(userInfo: IUser, productId: string) {
  const product = (await db.select().from(products).where(eq(products.uuid, productId)).limit(1))[0];
  if (product == null) throw new Error('This product does not exist!');

  const company = (
    await db
      .select({ uuid: companies.uuid })
      .from(companies)
      .where(and(eq(companies.uuid, product.companyUuid), eq(companies.creatorUuid, userInfo.uuid)))
      .limit(1)
  )[0];

  if (company == null) throw new Error('You do not own this company!');

  const deleteOperation = await db.delete(products).where(eq(products.uuid, productId));

  await deleteStripeProduct(product.stripeId);

  return deleteOperation.rowsAffected > 0;
}

function getProductsOfCompany(companyUuid: string): Promise<ListedProduct[]> {
  return db.select(LISTED_PRODUCT_FIELDS_DB).from(products).where(eq(products.companyUuid, companyUuid));
}

async function findProducts(search: string) {
  // prettier-ignore
  return (
    await db.execute(sql`
    SELECT ${products.uuid}, ${products.name}, ${products.price}, ${products.description}, ${products.pictureURL}, ${products.amountSold} FROM ${products}
    WHERE
      LOWER(${products.name}) LIKE ${'%' + search.toLowerCase() + '%'} OR
      LOWER(${products.description}) LIKE ${'%' + search.toLowerCase() + '%'} OR
      MATCH (${products.name}, ${products.description})
      AGAINST (${search} IN NATURAL LANGUAGE MODE)
  `)
  ).rows as ListedProduct[];
}

export { createProduct, getProduct, updateProduct, deleteProduct, getProductsOfCompany, findProducts };
