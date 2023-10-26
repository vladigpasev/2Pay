'use client';

import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import { useRedirectPath } from '@/hooks/useRedirectPath';
import { isValidEmail } from '@/utils/isValidEmail';
import AuthPage from '@/components/auth/AuthPage';
import { Field } from '@/components/utils/Form';
import { AuthProvider } from '@/auth/provider';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/auth/login';
import { useCallback } from 'react';

const LOGIN_FIELDS: Field<string>[] = [
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    placeholder: 'you@email.com',
    validate: value => (isValidEmail(value) ? null : 'Email is invalid!')
  },
  {
    id: 'password',
    name: 'Password',
    type: 'password',
    placeholder: 'Password',
    validate: value => (value.trim().length >= 8 ? null : 'Password is too short!')
  }
];

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatchNotification = useDispatchNotification();
  const redirectUrl = useRedirectPath() ?? '/';
  const router = useRouter();
  const login = useLogin();

  const onLogin = useCallback(async (formData: LoginFormData) => {
    const error = await login({
      provider: AuthProvider.Email,
      data: formData
    });

    if (error != null) {
      dispatchNotification({
        type: NotificationType.Error,
        message: error
      });

      return null;
    }

    router.push(redirectUrl);
    return null;
  }, []);

  return (
    <AuthPage
      titleHtml='<strong>Sign In</strong> to Account'
      fields={LOGIN_FIELDS}
      buttonText='Sign In'
      redirect={{ text: "Don't have an account?", location: `/auth/signup?redirectPath=${redirectUrl}` }}
      onSubmit={onLogin}
    />
  );
}
