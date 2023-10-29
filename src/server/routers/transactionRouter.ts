import db from '@/drizzle';
import { protectedProcedure, t } from '../trpc';
import { eq } from 'drizzle-orm';
import { companies, products, transactions } from '../../../db/schema';
import { ProductInfo } from '../service/products';

export const transactionRouter = t.router({
  userBuyings: protectedProcedure.query(async ({ ctx }) => {
    const transactionsRes = await db.query.transactions.findMany({
      where: eq(transactions.buyerUuid, ctx.tokenData?.uuid || ''),
      orderBy: transactions.date,
      with: {
        buyer: true
      }
    });
    return transactionsRes;
  }),
  userSellings: protectedProcedure.query(async ({ ctx }) => {
    const products = await db.query.transactions.findMany({
      where: eq(transactions.sellerUuid, ctx.tokenData?.uuid || '')
    });

    return products;
  })
});
