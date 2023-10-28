import { useCookies } from 'next-client-cookies';
import jsonwebtoken from 'jsonwebtoken';
import { cookies } from 'next/headers';
import IUser from '@/types/User';
import { Context } from '@/server/trpc';

export function useUserTRPCServerContext(): Context {
  const requestCookies = cookies();

  const token = requestCookies.get('token')?.value;
  if (token == null)
    return {
      rawToken: null,
      tokenData: null
    };

  try {
    const tokenData = jsonwebtoken.verify(token, process.env.JWT_SECRET!, { ignoreExpiration: true }) as any;
    return {
      rawToken: token,
      tokenData
    };
  } catch (error: any) {
    return {
      rawToken: null,
      tokenData: null
    };
  }
}

export function useUserServerBuilder(options: jsonwebtoken.VerifyOptions): IUser | null {
  const requestCookies = cookies();

  const token = requestCookies.get('token')?.value;
  if (token == null) return null;

  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET!, options) as any;
  } catch (error: any) {
    return null;
  }
}

export function useUserServerNoExpiration(): IUser | null {
  return useUserServerBuilder({ ignoreExpiration: true });
}

export function useUserServer(): IUser | null {
  return useUserServerBuilder({});
}
