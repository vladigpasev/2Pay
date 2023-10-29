// hooks/useStripeConnect.ts
import { useSetTokens } from '@/auth/token';
import { useAuthenticatedMutation } from './useAuthenticatedMutation';
import { trpc } from '@/trpc/client';

export function useStripeConnect() {
  const [_, createConnectedAccount] = useAuthenticatedMutation(trpc.stripe.createConnectedAccount);
  const [__, createAccountLink] = useAuthenticatedMutation(trpc.stripe.createAccountLink);

  const [___, refreshTokenAsyncMutation] = useAuthenticatedMutation(trpc.user.updateToken);   
  const setTokens = useSetTokens();

  const checkOnboardingStatus = trpc.stripe.checkOnboardingStatus.useQuery;

  return {
    handleOnboarding: async () => {
      try {
        const accountId = await createConnectedAccount();
        console.log('Account ID:', accountId);
        const accountLinkUrl = await createAccountLink({
          accountId,
          refreshUrl: `${window.location.origin}/reauth`,
          returnUrl: `${window.location.origin}/user/profile`,
        });
        console.log('Account Link URL:', accountLinkUrl);
        setTokens(await refreshTokenAsyncMutation());
        window.location.href = accountLinkUrl;
      } catch (err) {
        console.error("Failed to handle onboarding:", err);
      }
    },
    checkOnboardingStatus,
  };
}
