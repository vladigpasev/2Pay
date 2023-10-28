'use client';

import { useSetTokens } from '@/auth/token';
import { CustomForm, Field } from '@/components/utils/Form';
import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import { UploadButton } from '@/components/utils/Uoloader';
import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { trpc } from '@/trpc/client';
import { isValidEmail } from '@/utils/isValidEmail';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { UploadFileResponse } from 'uploadthing/client';
import { useRouter } from 'next/navigation';

interface CreateCompanyFormData {
  name: string;
  contactEmail: string;
  description: string;
}

export interface ICompany extends CreateCompanyFormData {
  logoURL: string;
  id: string;
}

export default function CompanyForm({ type, company }: { type: 'create' | 'update'; company?: ICompany }) {
  const CREATE_COMPANY_FIELDS: Field<string>[] = [
    {
      id: 'name',
      name: 'Company Name',
      type: 'text',
      placeholder: 'Company Name',
      defaultValue: type === 'update' ? company?.name : undefined,
      validate: value => (value.trim().length >= 1 ? null : 'Company name is too short!')
    },
    {
      id: 'contactEmail',
      name: 'Contact Email',
      type: 'email',
      placeholder: 'contact@company.com',
      defaultValue: type === 'update' ? company?.contactEmail : undefined,
      validate: value => (isValidEmail(value) ? null : 'Contact email is invalid!')
    },
    {
      id: 'description',
      name: 'Description',
      type: 'longText',
      placeholder: 'A few words about your business',
      defaultValue: type === 'update' ? company?.description : undefined,
      validate: value => (value.trim().length >= 5 ? null : 'Company description is too short!')
    }
  ];

  const dispatchNotification = useDispatchNotification();

  const [_, createConpanyAsyncMutation] = useAuthenticatedMutation(trpc.company.create);
  const [__, updateConpanyAsyncMutation] = useAuthenticatedMutation(trpc.company.update);
  const [___, deleteConpanyAsyncMutation] = useAuthenticatedMutation(trpc.company.delete);

  const [logoURL, setLogoURL] = useState('');

  const router = useRouter();

  const onSubmit = async (data: CreateCompanyFormData) => {
    try {
      let res = null;
      if (type === 'create') {
        res = await createConpanyAsyncMutation({
          name: data.name,
          contactEmail: data.contactEmail,
          description: data.description,
          logoURL: logoURL || null
        });
      } else {
        res = await updateConpanyAsyncMutation({
          name: data.name,
          contactEmail: data.contactEmail,
          description: data.description,
          logoURL: logoURL || null,
          id: company?.id!
        });
      }
      router.push('/user/profile');
    } catch (error: any) {
      console.error(error);
      dispatchNotification({
        type: NotificationType.Error,
        message: error.message
      });

      return null;
    }
  };

  useEffect(() => {
    if (type === 'update') {
      setLogoURL(company?.logoURL || '');
    }
  }, []);

  return (
    <div className='min-h-[calc(100vh-90px)] w-full flex justify-center items-center'>
      <div className='sm:shadow-xl px-12 py-12 bg-base-200 rounded-xl'>
        <h1 className='font-semibold text-3xl text-start mb-4'>
          {type === 'create' ? 'Create' : 'Update'} a <strong>Company</strong>
        </h1>
        <div className='flex gap-5 flex-row max-md:flex-col'>
          <div className='flex flex-col'>
            <img
              src={logoURL || '/images/pngs/company.jpg'}
              alt='user proifle'
              className='mx-auto rounded-md w-full max-w-[350px] aspect-square bg-cover'
            />
            <UploadButton
              endpoint='imageUpload'
              className='mt-2'
              onClientUploadComplete={async res => {
                const file = res![0];
                setLogoURL(file.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                dispatchNotification({
                  type: NotificationType.Error,
                  message: error.message || 'Upload Failed'
                });
              }}
              content={{
                button: (
                  <a className='flex mx-auto link cursor-pointer font-semibold gap-2'>
                    Change Image <FontAwesomeIcon icon={faCamera} className='my-auto' />
                  </a>
                )
              }}
              appearance={{
                button: {
                  width: '100%',
                  maxWidth: '350px'
                }
              }}
            />
          </div>
          <div className='flex flex-col'>
            <CustomForm
              buttonText={type === 'create' ? 'Create Company' : 'Update Company'}
              fields={CREATE_COMPANY_FIELDS}
              canSubmit={true}
              error={null}
              onSubmit={onSubmit}
            />
            {type === 'update' && (
              <button
                className='btn btn-error font-semibold mt-2 rounded-sm'
                onClick={async () => {
                  try {
                    await deleteConpanyAsyncMutation({ id: company?.id! });
                    router.push('/user/profile');
                  } catch (error: any) {
                    console.error(error);
                    dispatchNotification({
                      type: NotificationType.Error,
                      message: error.message
                    });

                    return null;
                  }
                }}
              >
                Delete Company
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
