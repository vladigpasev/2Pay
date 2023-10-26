import { UseTRPCMutationResult } from '@trpc/react-query/shared';
import { useRefreshTokens } from '@/auth/token';
import { useCallback } from 'react';

export function useAuthenticatedMutation<TData, TError, TVariables, TContext>(mutation: {
  useMutation: () => UseTRPCMutationResult<TData, TError, TVariables, TContext>;
}) {
  const mutationReq = mutation.useMutation();
  const refreshTokens = useRefreshTokens();

  return useCallback(
    async (input: TVariables) => {
      try {
        return await mutationReq.mutateAsync(input);
      } catch (error: any) {
        if (error.message !== 'UNAUTHORIZED') throw error;

        await refreshTokens();
        return await mutationReq.mutateAsync(input);
      }
    },
    [refreshTokens]
  );
}
