"use client"
import React, { useEffect } from 'react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

interface Props {
  priceId: string;
}

declare global {
  interface Window {
    Stripe: any;
  }
}

const StripeCheckoutButton: React.FC<Props> = ({ priceId }) => {
  useEffect(() => {
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  const startCheckout = useStripeCheckout();

  return (
    <button onClick={() => startCheckout(priceId)}>
      Checkout
    </button>
  );
};

export default StripeCheckoutButton;