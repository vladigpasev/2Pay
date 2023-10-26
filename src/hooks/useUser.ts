import { tokenAtom, useToken } from '@/auth/token';
import jsonwebtoken from 'jsonwebtoken';
import IUser from '@/types/User';
import { useAtom } from 'jotai';
import { useCookies } from 'next-client-cookies';

export function useUser() {
  const token = useAtom(tokenAtom)[0];
  console.log(token);
  return token?.tokenData || serverUser();
}

export function serverUser() {
  const cookies = useCookies();
  return jsonwebtoken.decode(cookies.get('token') || '') as IUser;
}
