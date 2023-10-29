import { z } from 'zod';
import { t, protectedProcedure } from '../trpc';
import { companies, products, users } from '../../../db/schema';
import Stripe from 'stripe';
import { TRPCError } from '@trpc/server';
import db from '@/drizzle';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export const stripeRouter = t.router({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        stripeId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { stripeId, successUrl, cancelUrl } = input;

      const [_, priceId] = stripeId.split(' ; ');

      const userEmail = ctx.tokenData?.email;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: userEmail, // set the user email
        metadata: { userId: ctx.tokenData!.uuid, stripeId }
      });

      return session.id;
    }),

  createPaymentIntent: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        currency: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { amount, currency } = input;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency
      });

      return paymentIntent.client_secret;
    }),

  createCustomer: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        paymentMethodId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, name, paymentMethodId } = input;

      const customer = await stripe.customers.create({
        email,
        name,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });

      return customer.id;
    }),

  createSubscription: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
        priceId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { customerId, priceId } = input;

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent']
      });

      if (subscription.status === 'active') {
        return subscription.id;
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create subscription'
        });
      }
    }),
  createConnectedAccount: protectedProcedure.mutation(async () => {
    const account = await stripe.accounts.create({ type: 'express' });
    return account.id;
  }),
  createAccountLink: protectedProcedure
    .input(z.object({ accountId: z.string(), refreshUrl: z.string(), returnUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { accountId, refreshUrl, returnUrl } = input;
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: refreshUrl,
        return_url: returnUrl,
        type: 'account_onboarding'
      });

      await db.update(users).set({ stripeSellerId: input.accountId }).where(eq(users.uuid, ctx.tokenData!.uuid));

      return accountLink.url;
    }),
  checkOnboardingStatus: protectedProcedure
    .input(z.object({ accountId: z.string() }))
    .query(async ({ input }) => {
      const account = await stripe.accounts.retrieve(input.accountId);
      return account.payouts_enabled;
    }),
});
