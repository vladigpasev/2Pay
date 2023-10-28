'use client';

import { useRedirectPath } from '@/hooks/useRedirectPath';
import { isValidEmail } from '@/utils/isValidEmail';
import AuthPage from '@/components/auth/AuthPage';
import { useRegister } from '@/auth/register';
import { Field, Fields } from '@/components/utils/Form';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOpenModal } from '@/components/utils/Modal';
import EmailVerificationModal from '@/components/modals/EmailVerificationModal';
import { AuthProvider } from '@/auth/provider';
import { useAtom } from 'jotai';
import { NotificationType, notifications, useDispatchNotification } from '@/components/utils/Notifyers';
import { id } from '@/utils/id';

const REGISTER_FIELDS: Fields = [
  [
    {
      id: 'firstName',
      name: 'First Name',
      type: 'text',
      placeholder: 'First Name',
      validate: (value: string) => (value.trim().length >= 5 ? null : 'First name is too short!')
    },
    {
      id: 'lastName',
      name: 'Last Name',
      type: 'text',
      placeholder: 'Last Name',
      validate: (value: string) => (value.trim().length >= 5 ? null : 'Last name is too short!')
    }
  ],
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    placeholder: 'you@email.com',
    validate: (value: string) => (isValidEmail(value) ? null : 'Email is invalid!')
  },
  {
    id: 'password',
    name: 'Password',
    type: 'password',
    placeholder: 'Password',
    validate: (value: string) => (value.trim().length >= 5 ? null : 'Password is too short!')
  }
];

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const dispatchNotification = useDispatchNotification();
  const redirectUrl = useRedirectPath() ?? '/';
  const openModal = useOpenModal();
  const register = useRegister();
  const router = useRouter();

  const onRegister = useCallback(
    async (formData: RegisterFormData) => {
      const error = await register({
        provider: AuthProvider.Email,
        data: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password
        }
      });

      if (error != null) {
        dispatchNotification({
          type: NotificationType.Error,
          message: error
        });

        return null;
      }

      openModal(<EmailVerificationModal email={formData.email} />, () => router.push(redirectUrl));

      return null;
    },
    [redirectUrl, dispatchNotification, openModal, register, router]
  );

  return (
    <AuthPage
      titleHtml='<strong>Create</strong> an Account'
      fields={REGISTER_FIELDS}
      buttonText='Sign Up'
      redirect={{ text: 'Already have an account?', location: `/auth/signin?redirectPath=${redirectUrl}` }}
      onSubmit={onRegister}
    />
  );
}

