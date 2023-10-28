import jsonwebtoken from 'jsonwebtoken';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import IUser from '@/types/User';
import { trpc } from '@/trpc/client';
import { useImmediateOnMount } from '@/hooks/useImmediateOnMount';

interface Token {
  refreshToken: string;
  token: string;
  tokenData: IUser;
}

export const tokenAtom = atom(null as Token | null);

export function useLoadTokens() {
  const [_, setToken] = useAtom(tokenAtom);
  const refreshTokens = useRefreshTokens();
  const cookies = useCookies();
  const router = useRouter();

  useImmediateOnMount(() => {
    if (typeof window === 'undefined') return;

    let refreshToken = localStorage.getItem('refreshToken');

    const search = new URLSearchParams(window.location.search);
    if (search.has('refreshToken')) {
      refreshToken = search.get('refreshToken');
      localStorage.setItem('refreshToken', refreshToken!);
      router.push(window.location.pathname);

      setTimeout(() => refreshTokens(false, refreshToken!), 0);
    }

    const token = cookies.get('token');

    if (token == null) {
      setToken(null);
      return;
    }

    setToken({
      refreshToken: refreshToken ?? '',
      token,
      tokenData: jsonwebtoken.decode(token) as any
    });
  });
}

export function useSetTokens() {
  const [_, setToken] = useAtom(tokenAtom);
  const cookies = useCookies();

  return useCallback(
    (tokens: { token: string; refreshToken: string }) => {
      localStorage.setItem('refreshToken', tokens.refreshToken);

      cookies.set('token', tokens.token);

      setToken({
        refreshToken: tokens.refreshToken,
        token: tokens.token,
        tokenData: jsonwebtoken.decode(tokens.token) as any
      });
    },
    [setToken]
  );
}

export const useToken = () => useAtom(tokenAtom)[0];

export function useClearTokens() {
  const [_, setToken] = useAtom(tokenAtom);
  const cookies = useCookies();

  return useCallback(() => {
    localStorage.removeItem('refreshToken');
    cookies.remove('token');
    setToken(null);
  }, [setToken]);
}

export function useRefreshTokens() {
  const refreshTokenReq = trpc.authentication.refreshToken.useMutation();
  const setTokens = useSetTokens();

  return useCallback(
    async (updateUserData: boolean = false, refreshToken?: string) => {
      refreshToken = refreshToken ?? localStorage.getItem('refreshToken') ?? '';
      if (refreshToken == null) throw new Error('Not logged in!');

      const tokens = await refreshTokenReq.mutateAsync({
        refreshToken,
        updateUserData
      });
      setTokens(tokens);
    },
    [refreshTokenReq, setTokens]
  );
}
