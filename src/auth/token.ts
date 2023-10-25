import jsonwebtoken from 'jsonwebtoken';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { getCookie } from '@/utils/getCookie';

interface Token {
  refreshToken: string;
  token: string;
  tokenData: {
    uuid: string;
    username: string;
    email: string;
  };
}

export const tokenAtom = atom(null as Token | null);

export function useLoadTokens() {
  const [_, setToken] = useAtom(tokenAtom);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const token = getCookie('token');

    if (token == null || refreshToken == null) {
      setToken(null);
      return;
    }

    setToken({
      refreshToken,
      token,
      tokenData: jsonwebtoken.decode(token) as any
    });
  }, []);
}

export function useSetTokens() {
  const [_, setToken] = useAtom(tokenAtom);

  return useCallback(
    (tokens: { token: string; refreshToken: string }) => {
      localStorage.setItem('refreshToken', tokens.refreshToken);
      document.cookie = `token=${tokens.token}`;

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
