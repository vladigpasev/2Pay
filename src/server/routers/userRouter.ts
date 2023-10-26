import { z } from 'zod';
import { protectedProcedure, t } from '../trpc';
import db from '@/drizzle';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { createTokenForUser } from '../service/auth/token';
import { verifyPassword } from '../service/auth/emailAuthentication';
import { TRPCError } from '@trpc/server';
import { id } from '@/utils/id';

export const userRouter = t.router({
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        username: z.string().max(50).min(5),
        email: z.string().email().max(70).min(5),
        password: z.string().min(5).max(50)
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.tokenData!.provider == 'email' && !verifyPassword(ctx.tokenData!.uuid, input.password))
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid Password! Try again!'
        });
      await db
        .update(users)
        .set(
          ctx.tokenData!.provider == 'email' && ctx.tokenData?.email !== input.email
            ? {
                ...input,
                verified: false,
                verificationToken: id()
              }
            : input
        )
        .where(eq(users.uuid, ctx.tokenData!.uuid!));
      return createTokenForUser({ ...ctx.tokenData!, ...input });
    })
});
