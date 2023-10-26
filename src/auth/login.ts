import { trpc } from '@/trpc/client';
import { AuthProvider } from './provider';
import { useCallback } from 'react';
import { useSetTokens } from './token';

interface OAuthProviderLoginOptions {
  provider: AuthProvider.Google | AuthProvider.Facebook;
}

interface EmailProviderLoginOptions {
  provider: AuthProvider.Email;
  data: {
    email: string;
    password: string;
  };
}

type ProviderLoginOptions = OAuthProviderLoginOptions | EmailProviderLoginOptions;

export function useLogin() {
  const loginByEmailReq = trpc.authentication.loginByEmail.useMutation();
  const setTokens = useSetTokens();

  return useCallback(async (options: ProviderLoginOptions): Promise<string | null> => {
    if (options.provider !== AuthProvider.Email) return 'Not supported yet!';

    try {
      const tokens = await loginByEmailReq.mutateAsync(options.data);
      if (tokens == null) return 'Something went wrong!';

      setTokens(tokens);

      return null;
    } catch (error: any) {
      return error.message ?? 'Something went wrong!';
    }
  }, []);
}
