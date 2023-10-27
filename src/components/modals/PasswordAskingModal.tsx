import { faEnvelope, faChevronRight, faFloppyDisk, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import email from 'next-auth/providers/email';
import { useCloseModal } from '../utils/Modal';
import { useCallback, useState } from 'react';

export default function PasswordAskingModal({ onSubmit }: { onSubmit: (password: string) => Promise<any> }) {
  const closeModal = useCloseModal();
  const [password, serPassword] = useState('');
  const [error, setError] = useState('');

  const finalizeSubmit = async () => {
    await onSubmit(password);
    closeModal();
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

  return (
    <div className='flex flex-col gap-3 p-5 w-fit items-center mx-auto'>
      <FontAwesomeIcon icon={faLock} className='w-32 h-32' size='2x' />
      <h1 className='font-bold text-3xl text-center'>Let's verify its you!</h1>
      <input
        type='password'
        placeholder='Enter your password'
        className='input input-bordered w-full max-w-xs'
        value={password}
        onChange={e => serPassword(e.target.value)}
      />
      {error && <p className='text-red-500'>{error}</p>}
      <button onClick={() => localSubmit()} className='btn btn-accent font-bold text-xl w-full btn-lg flex mt-3'>
        <span className='flex flex-grow'>Update</span>
        <FontAwesomeIcon icon={faFloppyDisk} className='h-8 -mr-1' />
      </button>
    </div>
  );
}
