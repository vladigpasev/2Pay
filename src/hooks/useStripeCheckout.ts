// hooks/useStripeCheckout.ts
import { useAuthenticatedMutation } from './useAuthenticatedMutation';
import { loadStripe } from '@stripe/stripe-js';
import { trpc } from '@/trpc/client';

export function useStripeCheckout() {
  const [_, createCheckoutSession] = useAuthenticatedMutation(trpc.stripe.createCheckoutSession);
  console.log('The only console log showing');

  return async (priceId: string, productId: string) => {
    try {
      console.log('Creating checkout session...');
      const sessionId = await createCheckoutSession({
        stripeId: `${productId} ; ${priceId}`,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/error`
      });
      console.log('Checkout session created:', sessionId);

      const stripe = (await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!))!;
      console.log('Redirecting to checkout...');
      await stripe.redirectToCheckout({ sessionId });
      console.log('Redirected to checkout successfully!');
    } catch (err) {
      console.error('Failed to start checkout session:', err);
    }
  };
}
