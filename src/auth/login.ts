import { AuthProvider } from './provider';
import { useCallback } from 'react';

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
  return useCallback((loginOptions: ProviderLoginOptions, redirectUrl: string) => {
    console.log(loginOptions, redirectUrl);
  }, []);
}
