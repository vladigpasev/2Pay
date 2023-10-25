'use client';

import { useRedirectPath } from '@/hooks/useRedirectPath';
import { isValidEmail } from '@/utils/isValidEmail';
import AuthPage from '@/components/auth/AuthPage';
import { useRegister } from '@/auth/register';
import { Field } from '@/components/utils/Form';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOpenModal } from '@/components/utils/Modal';
import EmailVerificationModal from '@/components/modals/EmailVerificationModal';
import { AuthProvider } from '@/auth/provider';

const REGISTER_FIELDS: Field<string>[] = [
  {
    id: 'username',
    name: 'Username',
    type: 'text',
    placeholder: 'Username',
    validate: value => (value.trim().length >= 5 ? null : 'Username is too short!')
  },
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

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const redirectUrl = useRedirectPath() ?? '/';
  const openModal = useOpenModal();
  const register = useRegister();
  const router = useRouter();

  const onRegister = useCallback(
    async (formData: RegisterFormData) => {
      const error = await register(
        {
          provider: AuthProvider.Email,
          data: formData
        },
        redirectUrl
      );

      if (error != null) return error;

      openModal(<EmailVerificationModal email={formData.email} />, () => router.push(redirectUrl));

      return null;
    },
    [redirectUrl, openModal, register, router]
  );

  return (
    <AuthPage
      titleHtml='<strong>Create</strong> an Account'
      fields={REGISTER_FIELDS}
      buttonText='Sign Up'
      redirect={{ text: 'Already have an account?', location: '/auth/signin' }}
      onSubmit={onRegister}
    />
  );
}
