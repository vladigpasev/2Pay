import { UseTRPCMutationResult, UseTRPCQueryResult } from '@trpc/react-query/shared';
import { useRefreshTokens } from '@/auth/token';
import { trpc } from '@/trpc/client';

export function useAuthenticatedQuery<TData, TError, TVariables>(
  query: {
    useQuery: () => UseTRPCQueryResult<TData, TError>;
  },
  input: TVariables
) {
  // @ts-ignore
  const queryReq = query.useQuery(input, {
    retry: false,
    onError: async (error: any) => {
      if (error.message !== 'UNAUTHORIZED') return;

      try {
        await refreshTokens();
        queryReq.refetch();
      } catch (error) {}
    }
  });

  const refreshTokens = useRefreshTokens();

  return queryReq;
}
