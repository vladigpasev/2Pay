'use client';

import { OAuthButtons } from './oauthButtons/OAuthButtons';
import { CustomForm, Field, Fields } from '../utils/Form';
import { useCallback, useState } from 'react';
import Link from 'next/link';

interface Props {
  titleHtml: string;
  fields: Fields;
  buttonText: string;
  redirect: {
    text: string;
    location: string;
  };
  onSubmit: (formData: any) => Promise<string | null>;
}

export default function AuthPage({ titleHtml, fields, buttonText, redirect, onSubmit }: Props) {
  const [error, setError] = useState(null as string | null);
  const [loading, setLoading] = useState(false);

  const onFormSubmit = useCallback((formData: any) => {
    setLoading(true);
    setError(null);

    onSubmit(formData)
      .then(setError)
      .catch(error => setError(error.message ?? 'Something went wrong!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='h-[calc(100vh-90px)] w-full flex justify-center items-center'>
      <div className='sm:shadow-xl px-8 pb-5 pt-12 sm:bg-base-200 rounded-xl space-y-12'>
        <h1 className='font-semibold text-3xl text-center' dangerouslySetInnerHTML={{ __html: titleHtml }}></h1>
        <CustomForm buttonText={buttonText} fields={fields} canSubmit={!loading} error={error} onSubmit={onFormSubmit}>
          <OAuthButtons />
          <Link href={redirect.location} className='text-center mt-5 text-lg underline'>
            {redirect.text}
          </Link>
        </CustomForm>
      </div>
    </div>
  );
}

