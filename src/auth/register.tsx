'use client';

import { trpc } from '@/trpc/client';
import { AuthProvider } from './provider';
import { useCallback, useState } from 'react';
import { alertAtom } from '@/components/Alert';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { NotificationType, notifications } from '@/components/Notifyers';
import { id } from '@/utils/id';
import { useRouter } from 'next/navigation';

interface OAuthProviderRegisterOptions {
  provider: AuthProvider.Google | AuthProvider.Facebook;
}

interface EmailProviderRegisterOptions {
  provider: AuthProvider.Email;
  data: {
    username: string;
    email: string;
    password: string;
  };
}

type ProviderRegisterOptions = OAuthProviderRegisterOptions | EmailProviderRegisterOptions;

export function useRegister() {
  const req = trpc.authentication.registerUser.useMutation();
  const router = useRouter();
  const [userMial, setUserMail] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [alert, setAlert] = useAtom(alertAtom);
  const [notifyies, dispatchNotifications] = useAtom(notifications);

  useEffect(() => {
    if (req.error) {
      dispatchNotifications({
        type: 'insert',
        value: {
          message: req.error.message,
          type: NotificationType.Error,
          key: id()
        }
      });
    }

    if (req.isSuccess) {
      setAlert({
        opened: true,
        content: (
          <div className='flex flex-col gap-3 p-5 w-fit'>
            <FontAwesomeIcon icon={faEnvelope} className='w-32 h-32' size='2x' />
            <h1 className='font-bold text-3xl text-center'>Check Yor Email!</h1>
            <p className='text-center'>
              An verification E-Mail has been sent to {userMial}. Click on the link in there and your account will be
              ready to go!
            </p>
            <button
              onClick={() => router.push(callbackUrl || '/')}
              className='btn btn-accent font-bold text-xl w-full btn-lg flex'
            >
              <span className='flex flex-grow'>Continue</span>
              <FontAwesomeIcon icon={faChevronRight} className='h-8 -mr-1' />
            </button>
          </div>
        )
      });
    }
  }, [req.isLoading]);

  return useCallback((registerOptions: EmailProviderRegisterOptions, redirectUrl: string) => {
    console.log('registering user');
    console.log(registerOptions);
    req.mutate({ ...registerOptions.data, authProvider: 'email' });
    setUserMail(registerOptions.data.email);
    setCallbackUrl(redirectUrl);
  }, []);
}
