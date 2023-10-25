'use client';

import { faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCloseModal } from '../utils/Modal';

export default function EmailVerificationModal({ email }: { email: string }) {
  const closeModal = useCloseModal();

  return (
    <div className='flex flex-col gap-3 p-5 w-fit items-center'>
      <FontAwesomeIcon icon={faEnvelope} className='w-32 h-32' size='2x' />
      <h1 className='font-bold text-3xl text-center'>Check Your Email!</h1>
      <p className='text-center'>
        A verification E-Mail has been sent to <span className='text-accent'>{email}</span>. Click on the link in there
        and your account will be ready to go!
      </p>
      <button onClick={() => closeModal()} className='btn btn-accent font-bold text-xl w-full btn-lg flex mt-3'>
        <span className='flex flex-grow'>Continue</span>
        <FontAwesomeIcon icon={faChevronRight} className='h-8 -mr-1' />
      </button>
    </div>
  );
}
