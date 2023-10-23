'use client';

import { CustomForm, Field } from '@/components/Form';
import { OAuthButtons } from '@/components/auth/oauthButtons/OAuthButtons';

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
      <OAuthButtons />
    </CustomForm>
  );
};
