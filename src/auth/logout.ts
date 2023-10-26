import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { useClearTokens } from './token';
import { trpc } from '@/trpc/client';
import { useCallback } from 'react';

export function useLogout() {
  const sendLogout = useAuthenticatedMutation(trpc.authentication.logout);
  const clearTokens = useClearTokens();

  return useCallback(async () => {
    try {
      await sendLogout();
    } catch (err) {}

    clearTokens();
  }, [clearTokens]);
}
