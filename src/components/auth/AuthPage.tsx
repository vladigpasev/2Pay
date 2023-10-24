'use client';

import { OAuthButtons } from './oauthButtons/OAuthButtons';
import { CustomForm, Field } from '../Form';

interface Props {
  titleHtml: string;
  fields: Field<any>[];
  buttonText: string;
  onSubmit: (formData: any) => void;
}

export default function AuthPage({ titleHtml, fields, buttonText, onSubmit }: Props) {
  return (
    <div className='h-[calc(100vh-90px)] w-full flex justify-center items-center'>
      <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-base-200 rounded-xl space-y-12'>
        <h1 className='font-semibold text-3xl text-center' dangerouslySetInnerHTML={{ __html: titleHtml }}></h1>
        <CustomForm buttonText={buttonText} fields={fields} onSubmit={onSubmit}>
          <OAuthButtons />
        </CustomForm>
      </div>
    </div>
  );
}
