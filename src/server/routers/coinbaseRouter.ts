import { createProductCharge } from '../service/coinbase';
import { protectedProcedure, t } from '../trpc';
import { z } from 'zod';

export const coinbaseRouter = t.router({
  createProductCharge: protectedProcedure
    .input(z.object({ productId: z.string().uuid() }))
    .mutation(({ ctx, input }) => createProductCharge(ctx.tokenData!, input.productId))
});
