'use client';
import { useUser } from '@/hooks/useUser';
import { faClipboardCheck, faBomb, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IUser from '@/types/User';
import { tokenAtom } from '@/auth/token';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export default async function VerificationSent() {
  const user = useUser();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <main className='flex justify-center w-full min-h-screen'>
      <div className='flex flex-col justify-center h-fit my-auto max-w-md p-10 rounded-2xl border bg-neutral'>
        <FontAwesomeIcon icon={faEnvelope} size='10x' />
        <hgroup className='text-center flex flex-col gap-2'>
          <h1 className='font-semibold text-3xl'>Check your inbox!</h1>
          <p>
            You have recieved an email with a verification link at <strong>{isClient ? user?.email : ''}</strong>. By
            clicking the link your account will get active!
          </p>
        </hgroup>
      </div>
    </main>
  );
}
