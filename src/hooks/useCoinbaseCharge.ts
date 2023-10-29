import { useAuthenticatedMutation } from './useAuthenticatedMutation';
import { trpc } from '@/trpc/client';

export function useCoinbaseCharge() {
  const [_, createCharge] = useAuthenticatedMutation(trpc.coinbase.createProductCharge);

  return async (productId: string) => {
    const redirectURL = await createCharge({ productId });
    if (redirectURL == null) return;
    window.location.href = redirectURL;
  };
}
