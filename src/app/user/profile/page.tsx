'use client';

import { useUser } from '@/hooks/useUser';
import { faBan, faCamera, faEdit, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomForm, Field } from '@/components/utils/Form';
import Image from 'next/image';
import { isValidEmail } from '@/utils/isValidEmail';
import { useCallback, useMemo, useState } from 'react';
import loading from '@/app/loading';
import error from 'next/error';
import { motion } from 'framer-motion';
import { trpc } from '@/trpc/client';
import { NotificationType } from '@/components/utils/Notifyers';
import { useSetTokens } from '@/auth/token';

export default function UserProfile() {
  const user = useUser();

  const PROFILE_UPDATE_FIELDS: Field<string>[] = useMemo(
    () => [
      {
        id: 'username',
        name: 'Username',
        type: 'text',
        placeholder: 'Username',
        value: user.username,
        validate: value => (value.trim().length >= 5 ? null : 'Username is too short!')
      },
      {
        id: 'email',
        name: 'Email',
        type: 'email',
        placeholder: 'you@email.com',
        value: user.email,
        validate: value => (isValidEmail(value) ? null : 'Email is invalid!')
      }
    ],
    [user]
  );

  interface IUpdateUser {
    username: string;
    email: string;
    password: string;
  }

  const [isEditingUser, setIsEditingUser] = useState(false);

  const [error, setError] = useState(null as string | null);

  const updateMutation = trpc.user.updateUserProfile.useMutation();
  const setTokens = useSetTokens();

  const onSubmit = useCallback(async (formData: IUpdateUser) => {
    try {
      const res = await updateMutation.mutateAsync(formData);
      setTokens(res);
    } catch (error) {
      dispatchNotification({
        type: NotificationType.Error,
        message: error
      });

      return null;
    }
  }, []);

  const onFormSubmit = useCallback((formData: any) => {
    setError(null);

    onSubmit(formData)
      .then(() => console.log('User profile updated'))
      .catch(error => setError(error.message ?? 'Something went wrong!'));
  }, []);

  return (
    <main className='w-full min-h-screen flex justify-center text-neutral-content py-10 max-sm:py-0'>
      <div className='flex flex-col my-auto rounded-xl border border-neutral bg-neutral py-10 gap-10 px-8 w-fit min-w-[450px] max-md:min-w-min max-w-full max-sm:w-full max-sm:min-h-screen max-sm:rounded-none max-sm:py-16'>
        <h1 className='text-2xl text-center font-bold'>Your Profile:</h1>
        <div className='flex flex-col'>
          <Image
            src={user.profilePictureURL || '/images/pngs/user-profile.png'}
            width={350}
            height={350}
            alt='user proifle'
            className='mx-auto'
          />
          <a className='flex mx-auto link cursor-pointer font-semibold gap-2'>
            Upload Photo <FontAwesomeIcon icon={faCamera} className='my-auto' />
          </a>
        </div>
        <div className='flex flex-col w-full border-4 border-[hsl(var(--b1)/0.2)] p-2 rounded-xl'>
          {!isEditingUser ? (
            <>
              <div className='flex justify-between -mb-2'>
                <p className='text-lg flex'>Username:</p>
                <p className='text-lg font-semibold flex'>{user.username}</p>
              </div>
              <div className='divider'></div>
              <div className='flex justify-between -mt-2'>
                <p className='text-lg flex'>E-Mail:</p>
                <p className='text-lg font-semibold flex'>{user.email}</p>
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -45 }}>
              <CustomForm
                icon={faFloppyDisk}
                buttonText='Save Data'
                fields={PROFILE_UPDATE_FIELDS}
                canSubmit={!updateMutation.isLoading}
                error={error}
                onSubmit={onFormSubmit}
              />
            </motion.div>
          )}
          {!isEditingUser ? (
            <button className='mt-10 btn w-full btn-primary rounded-xl flex' onClick={() => setIsEditingUser(true)}>
              <FontAwesomeIcon className='my-auto' icon={faEdit} />
              <span className='flex flex-grow justify-center'>Edit Profile</span>
            </button>
          ) : (
            <button className='mt-2 btn w-full btn-error rounded flex' onClick={() => setIsEditingUser(false)}>
              <FontAwesomeIcon className='my-auto' icon={faBan} />
              <span className='flex flex-grow justify-center'>Cancel Editing</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
function dispatchNotification(arg0: { type: any; message: unknown }) {
  throw new Error('Function not implemented.');
}
