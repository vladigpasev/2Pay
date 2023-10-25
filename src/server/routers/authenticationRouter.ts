import { registerUserByEmail } from '../service/auth/emailAuthentication';
import { protectedProcedure, publicProcedure, t } from '../trpc';
import { isVerified } from '../service/auth/verification';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authenticationRouter = t.router({
  registerByEmail: publicProcedure
    .input(
      z.object({
        username: z.string().max(50).min(5),
        email: z.string().email().max(70).min(5),
        password: z.string().max(50).min(8)
      })
    )
    .mutation(async ({ input }) => {
      const tokens = await registerUserByEmail(input);

      if (tokens.error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: tokens.error
        });

      return tokens.value;
    }),
  isVerified: protectedProcedure.query(async ({ ctx }) => {
    return await isVerified(ctx.tokenData!.uuid);
  })
});
