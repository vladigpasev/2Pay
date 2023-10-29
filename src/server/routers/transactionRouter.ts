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
        product: true
      }
    });
    return transactionsRes.map(transaction => transaction.product);
  }),
  userSellings: protectedProcedure.query(async ({ ctx }) => {
    const myCompanies = await db.query.companies.findMany({
      where: eq(companies.creatorUuid, ctx.tokenData?.uuid || ''),
      with: {
        products: true
      }
    });

    let products: ProductInfo[] = [];

    myCompanies.map(company => {
      products.push(...company.products);
    });

    return products;
  })
});
