import db from '@/drizzle';
import { protectedProcedure, t } from '../trpc';
import { eq } from 'drizzle-orm';
import { products, transactions } from '../../../db/schema';

export const transactionRouter = t.router({
  userBuyings: protectedProcedure.query(async ({ ctx }) => {
    const transactionsRes = await db.query.products.findMany({
      where: eq(transactions.uuid, ctx.tokenData?.uuid || ''),
      orderBy: transactions.date,
      with: {
        products: true
      }
    });
    return transactionsRes.map(transaction => transaction.products);
  })
});
