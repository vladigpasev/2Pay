'use client';

import { useRedirectPath } from '@/hooks/useRedirectPath';
import AuthPage from '@/components/auth/AuthPage';
import { AuthProvider } from '@/auth/provider';
import { Field } from '@/components/Form';
import { useLogin } from '@/auth/login';
import { useCallback } from 'react';

const LOGIN_FIELDS: Field<string>[] = [
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    placeholder: 'you@email.com',
    validate: value => (value.trim().length > 5 ? null : 'Email is too short!')
  },
  {
    id: 'password',
    name: 'Password',
    type: 'password',
    placeholder: 'Password',
    validate: value => (value.trim().length > 5 ? null : 'Password is too short!')
  }
];

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const redirectUrl = useRedirectPath() ?? '/';
  const login = useLogin();

  const onLogin = useCallback((formData: LoginFormData) => {
    login(
      {
        provider: AuthProvider.Email,
        data: formData
      },
      redirectUrl
    );
  }, []);

  return (
    <AuthPage
      titleHtml='<strong>Sign In</strong> to Account'
      fields={LOGIN_FIELDS}
      buttonText='Sign In'
      onSubmit={onLogin}
    />
  );
}
