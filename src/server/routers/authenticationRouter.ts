import { loginUserByEmail, registerUserByEmail } from '../service/auth/emailAuthentication';
import { protectedProcedure, protectedProcedureIgnoreExpired, publicProcedure, t } from '../trpc';
import { isVerified } from '../service/auth/verification';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { deleteToken, refreshToken } from '../service/auth/token';

export const authenticationRouter = t.router({
  registerByEmail: publicProcedure
    .input(
      z.object({
        username: z.string().max(50).min(5),
        email: z.string().email().max(70).min(5),
        password: z.string().max(50).min(5)
      })
    )
    .mutation(async ({ input }) => {
      const tokens = await registerUserByEmail(input);

      if (tokens.error != null)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: tokens.error
        });

      return tokens.value;
    }),
  loginByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email().max(70).min(5),
        password: z.string().max(50).min(8)
      })
    )
    .mutation(async ({ input }) => {
      const tokens = await loginUserByEmail(input);

      if (tokens.error != null)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: tokens.error
        });

      return tokens.value;
    }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    await deleteToken(ctx.tokenData!.uuid);
  }),
  refreshToken: protectedProcedureIgnoreExpired
    .input(z.object({ refreshToken: z.string().length(256), updateUserData: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const tokens = await refreshToken(ctx.tokenData!, input.refreshToken, input.updateUserData);

      if (tokens.error != null)
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
