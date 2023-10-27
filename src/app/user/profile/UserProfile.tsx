'use client';

import { useUser } from '@/hooks/useUser';
import {
  faBan,
  faCamera,
  faCancel,
  faEdit,
  faFloppyDisk,
  faKey,
  faLock,
  faUserLargeSlash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomForm, Field } from '@/components/utils/Form';
import Image from 'next/image';
import { isValidEmail } from '@/utils/isValidEmail';
import { useCallback, useEffect, useMemo, useState } from 'react';
import loading from '@/app/loading';
import error from 'next/error';
import { motion } from 'framer-motion';
import { trpc } from '@/trpc/client';
import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import { useSetTokens } from '@/auth/token';
import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { useOpenModal } from '@/components/utils/Modal';
import PasswordAskingModal from '@/components/modals/PasswordAskingModal';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useLogout } from '@/auth/logout';
import { useRouter } from 'next/navigation';
import UserProfilePictureUploader from '@/components/UserProfilePictureUploader';

export function PasswordInputUpdate({ onSubmit }: { onSubmit: (password: string) => Promise<any> }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const finalizeSubmit = async () => {
    await onSubmit(password);
    setIsEditing(false);
  };

  const localSubmit = useCallback(async () => {
    if (password.length < 5) {
      setError('Password must be at least 5 characters long');
      return;
    }
    if (password.length > 60) {
      setError('Password must be at most 60 characters long');
      return;
    }

    finalizeSubmit();
  }, [password]);

  useEffect(() => {
    setPassword('');
  }, [isEditing]);

  return (
    <div className='flex flex-col gap-3 p-1.5 items-center mx-auto w-full'>
      {isEditing ? (
        <>
          <p className='-mb-3 text-left w-full'>New Password: </p>
          <input
            type='password'
            placeholder='Enter your new password:'
            className='input input-bordered w-full text-neutral'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500'>{error}</p>}
          <button onClick={() => localSubmit()} className='btn btn-accent font-bold text-xl w-full flex -mt-1.5'>
            <span className='flex flex-grow'>Update Password</span>
            <FontAwesomeIcon icon={faFloppyDisk} className='h-8 -mr-1' />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className='btn btn-sm btn-error font-bold text-xl w-full flex -mt-1.5'
          >
            <span className='flex flex-grow'>Cancel Changes</span>
            <FontAwesomeIcon icon={faCancel} className='h-4 -mr-1' />
          </button>
        </>
      ) : (
        <>
          <div className='flex w-full justify-between '>
            <h3 className='flex text-lg font-semibold my-auto'>
              <FontAwesomeIcon icon={faKey} className='mr-4 my-auto' /> Password:{' '}
            </h3>
            <span className='flex my-auto gap-2'>
              <p className='flex text-lg my-auto'>**********</p>
              <button onClick={() => setIsEditing(true)} className='btn w-fit my-auto px-1.5 h-fit btn-sm btn-primary'>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default function UserProfile() {
  const user = useUser();
  const logout = useLogout();
  const router = useRouter();

  const PROFILE_UPDATE_FIELDS: Field<string>[] = useMemo(
    () => [
      {
        id: 'username',
        name: 'Username',
        type: 'text',
        placeholder: 'Username',
        defaultValue: user?.username,
        validate: value => (value.trim().length >= 5 ? null : 'Username is too short!')
      },
      {
        id: 'email',
        name: 'Email',
        type: 'email',
        placeholder: 'you@email.com',
        defaultValue: user?.email,
        isDisabled: user?.authProvider !== 'email',
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
  const openModal = useOpenModal();

  const dispatchNotification = useDispatchNotification();

  const [error, setError] = useState(null as string | null);

  const [updateMutation, updateUserAsyncMutation] = useAuthenticatedMutation(trpc.user.updateUserProfile);
  const [updatePasswordMutation, updatePasswordAsyncMutation] = useAuthenticatedMutation(trpc.user.updatePassword);
  const setTokens = useSetTokens();

  const errorContainsToErrorMapper = new Map([['AlreadyExists', 'This E-Mail is already in use!']]);

  const onSubmit = useCallback(
    async (
      formData: IUpdateUser | { newPassword: string },
      password: string,
      data: Promise<{ refreshToken: string; token: string }>
    ) => {
      try {
        const res = await data;
        setTokens(res);
        setIsEditingUser(false);
      } catch (error: any) {
        Array.from(errorContainsToErrorMapper.keys()).map((k: string) => {
          if (error.message.includes(k)) error.message = errorContainsToErrorMapper.get(k);
        });
        dispatchNotification({
          type: NotificationType.Error,
          message: error.message
        });

        return null;
      }
    },
    []
  );

  const onPasswordInputSend = (formData: any, mutation: (input: any) => Promise<any>) => {
    return async (password: string) => {
      try {
        console.log('like kokos');
        const ret = await onSubmit(formData, password, mutation({ ...formData, password }));
      } catch (error: any) {
        console.log('like noss');
        setError(error.message ?? 'Something went wrong!');
      }
    };
  };

  const onPasswordFormSubmit = async (password: string) => {
    openModal(
      <PasswordAskingModal onSubmit={onPasswordInputSend({ newPassword: password }, updatePasswordAsyncMutation)} />,
      () => {}
    );
  };

  const onFormSubmit = useCallback((formData: any) => {
    setError(null);

    if (user!.authProvider === 'email')
      openModal(<PasswordAskingModal onSubmit={onPasswordInputSend(formData, updateUserAsyncMutation)} />, () => {});
    else onPasswordInputSend(formData, updateUserAsyncMutation)('not_important');
  }, []);

  if (!user) return <>Loading shit!</>;

  return (
    <section className='flex flex-col my-auto rounded-xl mx-auto border border-neutral bg-neutral py-10 gap-10 px-8 w-fit min-w-[450px] max-md:min-w-min max-w-full max-sm:w-full max-sm:min-h-screen max-sm:rounded-none max-sm:py-16'>
      <h1 className='text-2xl text-center font-bold'>Your Profile:</h1>
      <UserProfilePictureUploader />
      <div className='flex flex-col gap-2'>
        {user!.authProvider === 'email' && <PasswordInputUpdate onSubmit={onPasswordFormSubmit} />}
        <div className='flex flex-col w-full border-4 border-[hsl(var(--b1)/0.2)] p-2 rounded-xl'>
          {!isEditingUser ? (
            <>
              <div className='flex justify-between -mb-2'>
                <p className='text-lg flex'>Username:</p>
                <p className='text-lg font-semibold flex'>{user!.username}</p>
              </div>
              <div className='divider'></div>
              <div className='flex justify-between -mt-2'>
                <p className='text-lg flex'>
                  {user!.authProvider === 'email' ? (
                    'E-Mail '
                  ) : (
                    <FontAwesomeIcon
                      icon={user!.authProvider === 'facebook' ? faFacebook : faGoogle}
                      className='my-auto mr-2'
                    />
                  )}
                  :
                </p>
                <p className='text-lg font-semibold flex'>{user!.email}</p>
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
        <button
          onClick={async () => {
            await logout();
            router.push('/');
          }}
          className='mt-2 btn w-full btn-error rounded flex'
        >
          <FontAwesomeIcon className='my-auto' icon={faUserLargeSlash} />
          <span className='flex flex-grow justify-center font-bold'>Log Out</span>
        </button>
      </div>
    </section>
  );
}
