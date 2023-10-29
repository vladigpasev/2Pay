import { protectedProcedure, publicProcedure, t } from '../trpc';
import {
  createCompany,
  deleteCompany,
  findCompanies,
  getCompaniesOfUser,
  getCompany,
  getCompanyRevenue,
  updateCompany
} from '../service/company';
import { z } from 'zod';
import db from '@/drizzle';
import { companies } from '../../../db/schema';

const companyInfoZod = z.object({
  name: z.string().min(1).max(128),
  contactEmail: z.string().email().min(5).max(256),
  description: z.string().min(5).max(2048),
  logoURL: z.string().url().min(5).max(256).nullable()
});

export const companyRouter = t.router({
  create: protectedProcedure.input(companyInfoZod).mutation(({ input, ctx }) => createCompany(ctx.tokenData!, input)),
  get: publicProcedure.input(z.object({ id: z.string().uuid() })).query(({ input }) => getCompany(input.id)),
  getRevenue: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => getCompanyRevenue(ctx.tokenData!, input.id)),
  update: protectedProcedure
    .input(
      companyInfoZod.extend({
        id: z.string().uuid()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const companyInfo = { ...input };
      // @ts-ignore
      delete companyInfo.id;
      return await updateCompany(ctx.tokenData!, input.id, companyInfo);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(({ input, ctx }) => deleteCompany(ctx.tokenData!, input.id)),
  getCompaniesOfUser: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(({ input }) => getCompaniesOfUser(input.uuid)),
  findCompanies: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ input }) => findCompanies(input.search)),
  trendingCompanyies: publicProcedure.query(async ({ ctx }) => {
    return (await db.select().from(companies).orderBy(companies.soldItems)).reverse();
  })
});
