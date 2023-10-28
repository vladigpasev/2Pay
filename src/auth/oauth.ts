import { useRedirectPath } from '@/hooks/useRedirectPath';
import { AuthProvider } from './provider';
import { useCallback } from 'react';

function getGoogleOAuthURL(redirectPath: string) {
  const query = new URLSearchParams();

  query.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_ID as string);
  query.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}auth/oauth`);
  query.set('response_type', 'code');
  query.set('scope', 'email profile');
  query.set('state', redirectPath);

  return `https://accounts.google.com/o/oauth2/v2/auth?${query.toString()}`;
}

function getFacebookOAuthURL(redirectPath: string) {
  const query = new URLSearchParams();

  query.set('client_id', process.env.NEXT_PUBLIC_FACEBOOK_ID as string);
  query.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}auth/oauth`);
  query.set('response_type', 'code');
  query.set('scope', 'email,public_profile');
  query.set('state', redirectPath);
  query.set('auth_type', 'rerequest');
  query.set('display', 'popup');

  return `https://www.facebook.com/v18.0/dialog/oauth?${query.toString()}`;
}

export function useOAuth() {
  const redirectPath = useRedirectPath() ?? '/';

  return useCallback(
    (provider: Exclude<AuthProvider, AuthProvider.Email>) => {
      window.location.href =
        provider === AuthProvider.Google ? getGoogleOAuthURL(redirectPath) : getFacebookOAuthURL(redirectPath);
    },
    [redirectPath]
  );
}

