import { useCookies } from 'next-client-cookies';
import { tokenAtom } from '@/auth/token';
import jsonwebtoken from 'jsonwebtoken';
import IUser from '@/types/User';
import { useAtom } from 'jotai';

export function useUser(): IUser | null {
  const [tokenDataFromClient] = useAtom(tokenAtom);
  const cookies = useCookies();

  if (typeof window !== 'undefined') return tokenDataFromClient?.tokenData ?? null;

  const token = cookies.get('token');
  if (token == null) return null;

  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET!, { ignoreExpiration: true }) as any;
  } catch (error: any) {
    return null;
  }
}
