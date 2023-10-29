'use client';

import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { PublicProduct } from '@/server/service/products';
import { useMemo } from 'react';

export function BuyButton({ enabled, product }: { enabled: boolean; product: PublicProduct }) {
  const [productId, priceId] = useMemo(() => product.stripeId.split(' ; '), []);
  const stripeCheckout = useStripeCheckout();

  return (
    <p
      className={`text-2xl bg-accent w-fit text-white px-10 pt-1 pb-2 rounded-lg select-none ${
        enabled ? 'cursor-pointer hover:brightness-90' : 'opacity-75'
      }`}
      onClick={() => enabled && stripeCheckout(priceId, productId)}
    >
      Buy
    </p>
  );
}
