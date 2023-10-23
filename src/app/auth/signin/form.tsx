'use client';

import { notifications } from '@/components/Notifyers';
import { useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomForm, Field } from '@/components/Form';

interface LoginFormData {
  email: string;
  password: string;
}

const loginFields: Field<string>[] = [
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    validate: value => (value.trim().length > 5 ? null : 'Email too short!')
  },
  {
    id: 'password',
    name: 'Password',
    type: 'password',
    placeholder: 'Password',
    validate: value => (value.trim().length > 5 ? null : 'Password too short!')
  }
];

// TODO: Implement callback url
export const RegisterForm = () => {
  const onRegister = async (formData: LoginFormData) => {
    console.log(formData);
  };

  return (
    <CustomForm buttonText='Sign In' fields={loginFields} onSubmit={onRegister}>
      <div className='divider'>OR</div>
      <button
        type='button'
        onClick={() => signIn('google')}
        className='btn glass bg-[#CF2C1F] hover:bg-[#a62319] text-white'
      >
        <FontAwesomeIcon className='absolute left-3' size='lg' icon={faGoogle} />
        Google
      </button>
      <button
        type='button'
        onClick={() => signIn('facebook')}
        className='btn bg-blue-600 hover:bg-blue-500 glass mt-2 text-white'
      >
        <FontAwesomeIcon className='absolute left-3' size='lg' icon={faFacebook} />
        Facebook
      </button>
    </CustomForm>
  );
};
