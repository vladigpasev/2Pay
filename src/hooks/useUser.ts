import { tokenAtom, useToken } from '@/auth/token';
import { getCookie } from 'cookies-next';
import jsonwebtoken from 'jsonwebtoken';
import IUser from '@/types/User';
import { useAtom } from 'jotai';
import { useCookies } from 'next-client-cookies';

export function useUser() {
  const [tokenDataFromClient] = useAtom(tokenAtom);
  const cookies = useCookies();

  if (typeof window !== 'undefined') return tokenDataFromClient?.tokenData;

  const token = cookies.get('token');
  if (token == null) return null;

  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return null;
  }
}

