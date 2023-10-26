import { useRedirectPath } from '@/hooks/useRedirectPath';
import { AuthProvider } from './provider';
import { useCallback } from 'react';

function getGoogleOAuthURL() {
  const query = new URLSearchParams();
  return `https://accounts.google.com/o/oauth2/v2/auth`;
}

export function useOAuth() {
  const redirectPath = useRedirectPath();

  return useCallback((provider: Exclude<AuthProvider, AuthProvider.Email>) => {
    if (provider === AuthProvider.Facebook) console.log('Facebook is not supported!');

    window.location.href = 'https://google.com';
  }, []);
}
