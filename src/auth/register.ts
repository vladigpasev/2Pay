'use client';

import { trpc } from '@/trpc/client';
import { AuthProvider } from './provider';
import { useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { NotificationType, notifications } from '@/components/utils/Notifyers';
import { id } from '@/utils/id';
import { useRouter } from 'next/navigation';
import { useSetTokens } from './token';

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
  const registerByEmailReq = trpc.authentication.registerByEmail.useMutation();
  const setTokens = useSetTokens();

  return useCallback(async (options: ProviderRegisterOptions): Promise<string | null> => {
    if (options.provider !== AuthProvider.Email) return 'Not supported yet!';

    try {
      const tokens = await registerByEmailReq.mutateAsync(options.data);
      if (tokens == null) return 'Something went wrong!';

      setTokens(tokens);

      return null;
    } catch (error: any) {
      return error.message ?? 'Something went wrong!';
    }
  }, []);
}
