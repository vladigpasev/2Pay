import db from '@/drizzle';
import { protectedProcedure, t } from '../trpc';
import { eq } from 'drizzle-orm';
import { transactions } from '../../../db/schema';

export const transactionRouter = t.router({
  userBuyings: protectedProcedure.query(async ({ ctx }) => {
    await db
      .select()
      .from(transactions)
      .where(eq(transactions.uuid, ctx.tokenData?.uuid || ''))
      .orderBy(transactions.date);
  })
});
