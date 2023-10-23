import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useRedirectPath } from '@/hooks/useRedirectPath';
import { AuthProvider } from '@/auth/provider';
import { useLogin } from '@/auth/login';
import { useCallback } from 'react';

export function FacebookButton() {
  const redirectUrl = useRedirectPath() ?? '/';
  const login = useLogin();

  const loginCallback = useCallback(() => {
    login({ provider: AuthProvider.Facebook }, redirectUrl);
  }, [login, redirectUrl]);

  return (
    <button type='button' className='btn bg-blue-600 hover:bg-blue-500 glass mt-2 text-white' onClick={loginCallback}>
      <FontAwesomeIcon className='absolute left-3' size='lg' icon={faFacebook} />
      Facebook
    </button>
  );
}
