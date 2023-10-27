import { z } from 'zod';
import { protectedProcedure, t } from '../trpc';
import db from '@/drizzle';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { createTokenForUser } from '../service/auth/token';
import { template_VerificationEmailBody, verifyPassword } from '../service/auth/emailAuthentication';
import { TRPCError } from '@trpc/server';
import { id } from '@/utils/id';
import { sendMail } from '../lib/sendMail';

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
      if (ctx.tokenData!.authProvider === 'email' && !(await verifyPassword(ctx.tokenData!.uuid, input.password))) {
        console.log('Invalid pass');
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid Password! Try again!'
        });
      }
      const verificationToken = id();
      await db
        .update(users)
        .set(
          ctx.tokenData!.authProvider == 'email' && ctx.tokenData?.email !== input.email
            ? {
                email: ctx.tokenData!.authProvider == 'email' ? input.email : ctx.tokenData?.email,
                username: input.username,
                verified: false,
                verificationToken: verificationToken
              }
            : {
                email: input.email,
                username: input.username
              }
        )
        .where(eq(users.uuid, ctx.tokenData!.uuid!));
      sendMail({
        subject: 'Verify your N2D2T account',
        body: template_VerificationEmailBody({ username: input.username, verificationToken: verificationToken }),
        to: input.email
      });
      return createTokenForUser({ ...ctx.tokenData!, ...input });
    })
});
