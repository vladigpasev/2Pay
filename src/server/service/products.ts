import { InferInsertModel, InferSelectModel, and, eq, or, sql } from 'drizzle-orm';
import { companies, products, users } from '../../../db/schema';
import IUser from '@/types/User';
import * as uuid from 'uuid';
import db from '@/drizzle';
import { createStripeProduct, deleteStripeProduct, updateStripeProduct } from './stripeProducts';

export type Product = InferSelectModel<typeof products>;

export type PublicProduct = Omit<Product, 'revenue'>;

export type ListedProduct = Omit<PublicProduct, 'stripeId' | 'galleryJSON' | 'companyUuid'>;

export type ProductInfo = Omit<PublicProduct, 'uuid' | 'stripeId' | 'amountSold' | 'companyUuid'>;

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
    revenue: 0,
    companyUuid
  };

  await db.insert(products).values(product);

  return product;
}

async function getProduct(productId: string) {
  const records = await db.select().from(products).where(eq(products.uuid, productId)).limit(1);
  if (records.length == 0) return null;

  const product = records[0];

  // @ts-ignore
  delete product.revenue;

  return product as PublicProduct;
}

async function getProductRevenue(userInfo: IUser, productId: string) {
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

  return product.revenue;
}

async function updateProduct(userInfo: IUser, productId: string, newInfo: ProductInfo) {
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

  const stripeId = await updateStripeProduct(product.stripeId, newInfo);

  const updateOperation = await db
    .update(products)
    .set({
      ...newInfo,
      stripeId
    })
    .where(eq(products.uuid, productId));

  if (updateOperation.rowsAffected === 0) throw new Error('Something went wrong!');

  const newProduct = {
    ...product,
    ...newInfo,
    stripeId
  };

  // @ts-ignore
  delete newProduct.revenue;

  return newProduct as PublicProduct;
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

  try {
    await deleteStripeProduct(product.stripeId);
  } catch (err) {}

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

async function buyProduct(buyerId: string, id: string) {
  const records = await db
    .select({
      productAmountSold: products.amountSold,
      productRevenue: products.revenue,
      companyAmountSold: companies.soldItems,
      companyRevenue: companies.revenue,
      companyOwnerId: companies.creatorUuid,
      pictureURL: products.pictureURL,
      name: products.name,
      price: products.price
    })
    .from(products)
    .innerJoin(companies, eq(products.companyUuid, companies.uuid))
    .where(or(eq(products.uuid, id), eq(products.stripeId, id)));

  if (records.length == 0) return;

  const record = records[0];

  await Promise.all([
    db.update(products).set({
      amountSold: record.productAmountSold + 1,
      revenue: record.productRevenue + record.price
    }),
    db.update(companies).set({
      soldItems: record.companyAmountSold + 1,
      revenue: record.companyRevenue + record.price
    })
  ]);

  const neededUsers = await db
    .select({
      uuid: users.uuid,
      email: users.email
    })
    .from(users)
    .where(or(eq(users.uuid, record.companyOwnerId), eq(users.uuid, buyerId)));

  const sellerEmail = neededUsers.find(user => user.uuid === record.companyOwnerId)!.email;
  const buyerEmail = neededUsers.find(user => user.uuid === buyerId)!.email;

  // TODO: Send email to seller

  // TODO: Send email to buyer
}

export {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductRevenue,
  getProductsOfCompany,
  findProducts,
  buyProduct
};
