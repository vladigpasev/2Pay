'use client';
import React, { useEffect } from 'react';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

interface Props {
  priceId: string;
  productId: string;
}

const StripeCheckoutButton: React.FC<Props> = ({ priceId, productId }) => {
  const startCheckout = useStripeCheckout();

  return <button onClick={() => startCheckout(priceId, productId)}>Checkout</button>;
};

export default StripeCheckoutButton;
