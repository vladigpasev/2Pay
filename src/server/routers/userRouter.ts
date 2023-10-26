import { z } from 'zod';
import { protectedProcedure, t } from '../trpc';
import db from '@/drizzle';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { createTokenForUser } from '../service/auth/token';

export const userRouter = t.router({
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db.update(users).set(input).where(eq(users.uuid, ctx.tokenData!.uuid!));
      const user = await db.select().from(users).where(eq(users.uuid, ctx.tokenData!.uuid!));
      return createTokenForUser(user![0]);
    })
});
