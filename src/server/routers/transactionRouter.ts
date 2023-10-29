import db from '@/drizzle';
import { protectedProcedure, t } from '../trpc';
import { eq } from 'drizzle-orm';
import { companies, products, transactions } from '../../../db/schema';
import { ProductInfo } from '../service/products';

export const transactionRouter = t.router({
  userBuyings: protectedProcedure.query(async ({ ctx }) => {
    const transactionsRes = await db.query.transactions.findMany({
      where: eq(transactions.buyerUuid, ctx.tokenData?.uuid || ''),
      orderBy: transactions.date
    });
    const ret = transactionsRes.map(trans => ({
      description: trans.productDescription,
      galleryJSON: [],
      name: trans.productName,
      pictureURL: trans.productImageUrl || '',
      price: trans.price
    })) satisfies ProductInfo[];
    return ret;
  }),
  userSellings: protectedProcedure.query(async ({ ctx }) => {
    const products = await db.query.transactions.findMany({
      where: eq(transactions.sellerUuid, ctx.tokenData?.uuid || ''),
      with: {
        buyer: true
      }
    });

    return products;
  })
});
