import { z } from 'zod';
import { protectedProcedure, t } from '../trpc';
import db from '@/drizzle';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { createTokenForUser, queryAndCreateUserData } from '../service/auth/token';
import { hashPassword, template_VerificationEmailBody, verifyPassword } from '../service/auth/emailAuthentication';
import { TRPCError } from '@trpc/server';
import { id } from '@/utils/id';
import { sendMail } from '../lib/sendMail';

export const userRouter = t.router({
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().max(50).min(5),
        email: z.string().email().max(70).min(5),
        password: z.string().min(5).max(50)
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.tokenData!.authProvider === 'email' && !(await verifyPassword(ctx.tokenData!.uuid, input.password))) {
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
                name: input.name,
                verified: false,
                verificationToken: verificationToken
              }
            : {
                email: input.email,
                name: input.name
              }
        )
        .where(eq(users.uuid, ctx.tokenData!.uuid!));
      if (ctx.tokenData!.authProvider === 'email' && ctx.tokenData?.email !== input.email) {
        sendMail({
          subject: 'Verify your N2D2T account',
          body: template_VerificationEmailBody({ name: input.name, verificationToken: verificationToken }),
          to: input.email
        });
      }
      return createTokenForUser({ ...ctx.tokenData!, ...input });
    }),
  updatePassword: protectedProcedure
    .input(
      z.object({
        newPassword: z.string().min(5).max(50),
        password: z.string().min(5).max(50)
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!(await verifyPassword(ctx.tokenData!.uuid, input.password))) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid Password! Try again!'
        });
      }
      await db
        .update(users)
        .set({ password: await hashPassword(input.newPassword) })
        .where(eq(users.uuid, ctx.tokenData!.uuid!));
      return createTokenForUser({ ...ctx.tokenData!, ...input });
    }),
  updateToken: protectedProcedure.mutation(async ({ ctx, input }) => {
    return await queryAndCreateUserData(ctx.tokenData?.uuid!);
  })
});

