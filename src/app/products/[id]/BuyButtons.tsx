'use client';

import { useCoinbaseCharge } from '@/hooks/useCoinbaseCharge';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { PublicProduct } from '@/server/service/products';
import { useMemo } from 'react';

export function BuyButtons({ enabled, product }: { enabled: boolean; product: PublicProduct }) {
  const [productId, priceId] = useMemo(() => product.stripeId.split(' ; '), []);
  const coinbaseCharge = useCoinbaseCharge();
  const stripeCheckout = useStripeCheckout();

  return (
    <div className='flex flex-row gap-3'>
      <p
        className={`text-2xl bg-accent w-fit text-white px-10 pt-1 pb-2 rounded-lg select-none ${
          enabled ? 'cursor-pointer hover:brightness-90' : 'opacity-75'
        }`}
        onClick={() => enabled && stripeCheckout(priceId, productId)}
      >
        Buy EUR
      </p>
      <p
        className={`text-2xl bg-yellow-500 w-fit text-white px-10 pt-1 pb-2 rounded-lg select-none ${
          enabled ? 'cursor-pointer hover:brightness-90' : 'opacity-75'
        }`}
        onClick={() => enabled && coinbaseCharge(product.uuid)}
      >
        Buy ETH
      </p>
    </div>
  );
}
