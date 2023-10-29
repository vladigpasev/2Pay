import { protectedProcedure, publicProcedure, t } from '../trpc';
import {
  createProduct,
  deleteProduct,
  findProducts,
  getProduct,
  getProductRevenue,
  getProductsOfCompany,
  updateProduct
} from '../service/products';
import { z } from 'zod';
import db from '@/drizzle';
import { products, users } from '../../../db/schema';
import { eq } from 'drizzle-orm';

const productInfoZod = z.object({
  name: z.string().min(1).max(128),
  price: z.number().finite(),
  description: z.string().min(1).max(256),
  pictureURL: z.string().url().min(5).max(256),
  galleryJSON: z.array(z.string().url().min(5).max(256))
});

export const productRouter = t.router({
  create: protectedProcedure
    .input(
      productInfoZod.extend({
        companyUuid: z.string().uuid()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const productInfo = { ...input };
      // @ts-ignore
      delete productInfo.companyUuid;
      return await createProduct(ctx.tokenData!, input.companyUuid, productInfo);
    }),
  get: publicProcedure.input(z.object({ id: z.string().uuid() })).query(({ input }) => getProduct(input.id)),
  getRevenue: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => getProductRevenue(ctx.tokenData!, input.id)),
  update: protectedProcedure
    .input(
      productInfoZod.extend({
        id: z.string().uuid()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const productInfo = { ...input };
      // @ts-ignore
      delete productInfo.id;
      return await updateProduct(ctx.tokenData!, input.id, productInfo);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ input, ctx }) => deleteProduct(ctx.tokenData!, input.id)),
  getProductsOfCompany: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(({ input }) => getProductsOfCompany(input.uuid)),
  findProducts: publicProcedure.input(z.object({ search: z.string() })).query(({ input }) => findProducts(input.search))
});
