import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useRedirectPath } from '@/hooks/useRedirectPath';
import { AuthProvider } from '@/auth/provider';
import { useLogin } from '@/auth/login';
import { useCallback } from 'react';

export function GoogleButton() {
  const redirectUrl = useRedirectPath() ?? '/';
  const login = useLogin();

  const loginCallback = useCallback(() => {
    login({ provider: AuthProvider.Google });
  }, [login, redirectUrl]);

  return (
    <button type='button' className='btn glass bg-[#CF2C1F] hover:bg-[#a62319] text-white' onClick={loginCallback}>
      <FontAwesomeIcon className='absolute left-3' size='lg' icon={faGoogle} />
      Google
    </button>
  );
}
