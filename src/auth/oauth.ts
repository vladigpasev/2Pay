import { useRedirectPath } from '@/hooks/useRedirectPath';
import { AuthProvider } from './provider';
import { useCallback } from 'react';

function getGoogleOAuthURL(redirectPath: string) {
  const query = new URLSearchParams();

  query.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_ID as string);
  query.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}auth/oauth`);
  query.set('response_type', 'code');
  query.append('scope', 'email profile');
  query.set('state', redirectPath);

  return `https://accounts.google.com/o/oauth2/v2/auth?${query.toString()}`;
}

export function useOAuth() {
  const redirectPath = useRedirectPath() ?? '/';

  return useCallback(
    (provider: Exclude<AuthProvider, AuthProvider.Email>) => {
      if (provider === AuthProvider.Facebook) console.log('Facebook is not supported!');

      window.location.href = getGoogleOAuthURL(redirectPath);
    },
    [redirectPath]
  );
}
